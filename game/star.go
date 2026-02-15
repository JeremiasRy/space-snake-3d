package game

import "space-snake-3d/protos"

type Star struct {
	PositionAndRotation
	id         int32
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
	s.id = id
	return s
}

func (s *Star) toProto() *protos.Star {
	if s.protoCache == nil {
		s.protoCache = &protos.Star{}
	}

	s.protoCache.Active = s.active
	s.protoCache.Position = s.PositionAndRotation.toProto()
	s.protoCache.Id = s.id
	return s.protoCache
}
