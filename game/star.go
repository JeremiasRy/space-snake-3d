package game

import "space-snake-3d/protos"

type Star struct {
	GameObject
	active bool
}

type NewStarOpts struct {
	active bool
	id     int32
}

func NewStar(opts NewStarOpts) *Star {
	active, id := opts.active, opts.id
	s := &Star{
		active: active,
	}
	s.i = id
	return s
}

func (s *Star) toProto() *protos.Star {
	return &protos.Star{
		State:  s.GameObject.toProto(),
		Active: s.active,
	}
}
