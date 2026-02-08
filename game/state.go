package game

import (
	"log"
	"math/rand/v2"
	"space-snake-3d/protos"
	"time"

	"github.com/go-gl/mathgl/mgl32"
	"google.golang.org/protobuf/proto"
)

const (
	WORLD_WIDTH  float32 = 100_000
	WORLD_HEIGHT float32 = 100_000
	WORLD_DEPTH  float32 = 100_000

	STAR_CAP    int = 20000
	STAR_ACTIVE int = 10000

	PLAYERS_MAX int = 100
)

var playerIdCount int32 = 1

type InputEvent struct {
	playerId int32
	input    int32
}

type State struct {
	stars   []*Star
	players map[*Player]bool

	events     chan InputEvent
	join       chan *Player
	disconnect chan *Player
	input      chan []byte
}

func randomVec3() mgl32.Vec3 {
	return [3]float32{rand.Float32()*WORLD_WIDTH - (WORLD_WIDTH / 2), rand.Float32()*WORLD_HEIGHT - (WORLD_HEIGHT / 2), rand.Float32()*WORLD_DEPTH - (WORLD_DEPTH / 2)}
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

		join:       make(chan *Player),
		disconnect: make(chan *Player),
		events:     make(chan InputEvent, 1024),
		input:      make(chan []byte),
	}

	return s
}

func (s *State) ListenPlayers() {
	log.Println("Listening player connections")
	for {
		select {
		case player := <-s.join:
			{
				s.addPlayer(player)
				log.Printf("Player joined %d", player.i)
				whoAmI := &protos.WhoAreYou{TargetId: player.i}

				tick := &protos.Tick{
					Payload: &protos.Tick_YouInit{
						YouInit: whoAmI,
					},
				}

				data, err := proto.Marshal(tick)

				if err != nil {
					log.Printf("failed to create package to tell who the player is %s", err.Error())
					s.disconnect <- player
					continue
				}
				player.send <- data
			}
		case player := <-s.disconnect:
			{
				s.removePlayer(player)
				log.Printf("Player disconnected %d", player.i)
			}
		case data := <-s.input:
			{
				input := protos.Input{}
				proto.Unmarshal(data, &input)

				select {
				case s.events <- InputEvent{playerId: input.TargetId, input: input.Input}:
				default:
					log.Println("Dropping input event; queue was full")
				}
			}
		}
	}
}

func (s *State) processEvents(events []InputEvent) {
	for _, e := range events {
		log.Printf("ID: %d, input: %d", e.playerId, e.input)
	}
}

func (s *State) Tick() {
	log.Print("Ticker started")
	ticker := time.NewTicker(time.Second / 60)
	defer ticker.Stop()

	events := make([]InputEvent, 0, 100)
	for range ticker.C {
	Drain:
		for {
			select {
			case input := <-s.events:
				{
					events = append(events, input)
				}
			default:
				break Drain
			}
		}

		s.processEvents(events)
		events = events[:0]
	}
}

func (s *State) addPlayer(p *Player) {
	p.i = int32(playerIdCount)
	playerIdCount++

	RandomizePositionAndDirection(p)

	s.players[p] = true
}

func (s *State) removePlayer(p *Player) {
	if _, ok := s.players[p]; ok {
		delete(s.players, p)
	}
	close(p.send)
}
