package game

import "github.com/go-gl/mathgl/mgl32"

type Star struct {
	id     float32
	pos    mgl32.Vec3
	rot    mgl32.Vec3
	active bool
}

func (p *Star) Position() mgl32.Vec3 {
	return p.pos
}

func (p *Star) Direction() mgl32.Vec3 {
	return p.rot
}

func (p *Star) Rotate(q mgl32.Quat) {
	p.rot = q.Rotate(p.rot)
}
