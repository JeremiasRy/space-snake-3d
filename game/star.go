package game

import "space-snake-3d/protos"

type Star struct {
	GameObject
	active     bool
	sendUpdate bool
	protoCache *protos.Star
}

type NewStarOpts struct {
	active bool
	id     int32
}

func NewStar(opts NewStarOpts) *Star {
	active, id := opts.active, opts.id
	s := &Star{
		active:     active,
		sendUpdate: false,
	}
	s.i = id
	return s
}

func (s *Star) toProto() *protos.Star {
	if s.protoCache == nil {
		s.protoCache = &protos.Star{}
	}

	s.protoCache.Active = s.active
	s.protoCache.State = s.GameObject.toProto()
	return s.protoCache
}
