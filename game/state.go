package game

import (
	"log"
	"math/rand/v2"
	"space-snake-3d/protos"
	"sync"
	"time"

	"github.com/go-gl/mathgl/mgl32"
)

const (
	WORLD_WIDTH  float32 = 50_000
	WORLD_HEIGHT float32 = 50_000
	WORLD_DEPTH  float32 = 50_000

	STAR_CAP    int = 2_000_000
	STAR_ACTIVE int = STAR_CAP / 2

	PLAYERS_MAX int = 100
)

var playerIdCount int32 = 1

type PlayerEventType int32

const (
	STAR_TOUCH PlayerEventType = iota
	SHOOT
)

type PlayerEvent interface {
	Type() PlayerEventType
}

type StarTouch struct {
	starId int32
}

func (*StarTouch) Type() PlayerEventType {
	return STAR_TOUCH
}

type Shoot struct {
	playerId int32
	power    int32
}

func (*Shoot) Type() PlayerEventType {
	return SHOOT
}

type State struct {
	stars      []*Star
	players    map[*Player]bool
	flashes    map[*FlashOfLight]struct{}
	flashMutex sync.RWMutex

	events     chan PlayerEvent
	join       chan *Player
	disconnect chan *Player

	tickCache *protos.Tick
}

func randomVec3() mgl32.Vec3 {
	return [3]float32{rand.Float32()*WORLD_WIDTH - (WORLD_WIDTH / 2), rand.Float32()*WORLD_HEIGHT - (WORLD_HEIGHT / 2), rand.Float32()*WORLD_DEPTH - (WORLD_DEPTH / 2)}
}

func RandomQuat() mgl32.Quat {
	x := rand.NormFloat64()
	y := rand.NormFloat64()
	z := rand.NormFloat64()
	w := rand.NormFloat64()

	q := mgl32.Quat{
		W: float32(w),
		V: mgl32.Vec3{float32(x), float32(y), float32(z)},
	}

	return q.Normalize()
}

func CreateState() *State {
	stars := make([]*Star, STAR_CAP, STAR_CAP)

	for idx := range STAR_CAP {
		s := NewStar(NewStarOpts{active: idx > STAR_ACTIVE, id: int32(idx)})
		RandomizePositionAndDirection(s)

		stars[idx] = s
	}

	s := &State{
		stars:   stars,
		players: map[*Player]bool{},
		flashes: map[*FlashOfLight]struct{}{},

		join:       make(chan *Player),
		disconnect: make(chan *Player),
		events:     make(chan PlayerEvent, 1024),

		tickCache: &protos.Tick{
			Payload: &protos.Tick_GameTick{
				GameTick: &protos.GameTick{
					Players: &protos.Players{
						Players: nil,
					},
					StarsUpdate: &protos.Stars{
						Stars: nil,
					},
					Flashes: &protos.Flashes{
						Flashes: nil,
					},
				},
			},
		},
	}

	return s
}

func (st *State) ListenPlayers() {
	log.Println("Listening player connections")
	for {
		select {
		case player := <-st.join:
			{
				st.addPlayer(player)
				log.Printf("Player joined %d", player.id)
				whoAmI := &protos.WhoAreYou{TargetId: player.id}

				tick := &protos.Tick{
					Payload: &protos.Tick_YouInit{
						YouInit: whoAmI,
					},
				}

				data, err := tick.MarshalVT()

				if err != nil {
					log.Printf("failed to create package to tell who the player is %s", err.Error())
					st.disconnect <- player
					continue
				}
				player.send <- data
				stars := make([]*protos.Star, 0, STAR_CAP)

				for _, s := range st.stars {
					stars = append(stars, s.toProto())
				}

				tick = &protos.Tick{
					Payload: &protos.Tick_StarsInit{
						StarsInit: &protos.Stars{Stars: stars},
					},
				}

				data, err = tick.MarshalVT()

				if err != nil {
					log.Printf("Failed to generate star initialization %s", err.Error())
					st.disconnect <- player
					continue
				}

				player.send <- data
			}
		case player := <-st.disconnect:
			{
				st.removePlayer(player)
				log.Printf("Player disconnected %d", player.id)
			}
		case playerEvent := <-st.events:
			{
				switch e := playerEvent.(type) {
				case *StarTouch:
					{
						s := st.stars[e.starId]
						s.active = false
						s.sendUpdate = true
						st.flashMutex.Lock()
						flash := NewFlashOfLight(s.p)
						st.flashes[flash] = struct{}{}
						st.flashMutex.Unlock()
					}
				}
			}
		}
	}
}

func (st *State) Tick() {
	ticker := time.NewTicker(time.Second / 60)
	defer ticker.Stop()

	stars := make([]*protos.Star, 0, STAR_ACTIVE)
	players := make([]*protos.Player, 0, len(st.players))
	flashes := make([]*protos.FlashOfLight, 0, 100)

	for range ticker.C {
		for _, s := range st.stars {
			if s.sendUpdate {
				stars = append(stars, s.toProto())
				s.sendUpdate = false
			}
		}

		for p := range st.players {
			p.applyInput()
			players = append(players, p.toProto())
		}

		st.flashMutex.Lock()
		for flash := range st.flashes {
			flash.tick()
			if flash.isDone() {
				delete(st.flashes, flash)
				continue
			}
			flashes = append(flashes, flash.toProto())
		}
		st.flashMutex.Unlock()

		st.tickCache.GetGameTick().GetPlayers().Players = players
		st.tickCache.GetGameTick().GetStarsUpdate().Stars = stars
		st.tickCache.GetGameTick().GetFlashes().Flashes = flashes

		data, err := st.tickCache.MarshalVT()

		if err != nil {
			log.Fatalf("Failed to marshal game state %s", err.Error())
		}

		for p := range st.players {
			p.send <- data
		}

		stars = stars[:0]
		players = players[:0]
		flashes = flashes[:0]
	}
}

func (st *State) addPlayer(p *Player) {
	p.id = int32(playerIdCount)
	playerIdCount++

	RandomizePositionAndDirection(p)

	st.players[p] = true
}

func (st *State) removePlayer(p *Player) {
	if _, ok := st.players[p]; ok {
		delete(st.players, p)
	}
	close(p.send)
}
