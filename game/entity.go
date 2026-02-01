package game

import (
	"github.com/go-gl/mathgl/mgl32"
)

type Positionable interface {
	Rotation() mgl32.Vec3
	Position() mgl32.Vec3
}

type Movable interface {
	Move(speed float32)
}
type Rotateable interface {
	Rotate(q mgl32.Quat)
}
