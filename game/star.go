package game

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
