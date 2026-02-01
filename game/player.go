package game

import "github.com/go-gl/mathgl/mgl32"

type PlayerId float32
type Player struct {
	ID  PlayerId
	pos mgl32.Vec3
	rot mgl32.Vec3
}

func (p *Player) Position() mgl32.Vec3 {
	return p.pos
}

func (p *Player) Direction() mgl32.Vec3 {
	return p.rot
}

func (p *Player) Move(speed float32) {
	p.pos = p.pos.Add(p.rot.Mul(speed))
}

func (p *Player) Rotate(q mgl32.Quat) {
	p.rot = q.Rotate(p.rot)
}
