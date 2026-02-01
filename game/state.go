package game

import (
	"math/rand/v2"

	"github.com/go-gl/mathgl/mgl32"
)

const (
	WORLD_WIDTH  float32 = 100_000
	WORLD_HEIGHT float32 = 100_000
	WORLD_DEPTH  float32 = 100_000

	STAR_CAP    int = 20000
	STAR_ACTIVE int = 10000
)

type State struct {
	stars   []*Star
	players map[PlayerId]*Player
}

func randomVec3() mgl32.Vec3 {
	return [3]float32{rand.Float32()*WORLD_WIDTH - (WORLD_WIDTH / 2), rand.Float32()*WORLD_HEIGHT - (WORLD_HEIGHT / 2), rand.Float32()*WORLD_DEPTH - (WORLD_DEPTH / 2)}
}

func CreateState() *State {
	stars := make([]*Star, STAR_CAP, STAR_CAP)

	for idx := range STAR_CAP {
		stars[idx] = &Star{
			id:     float32(idx),
			pos:    randomVec3(),
			rot:    randomVec3(),
			active: idx <= STAR_ACTIVE,
		}
	}
	players := map[PlayerId]*Player{}

	return &State{
		stars:   stars,
		players: players,
	}
}
