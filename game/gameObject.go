package game

import "github.com/go-gl/mathgl/mgl32"

type GameObject struct {
	i int32
	p mgl32.Vec3 // position of the object in 3d space
	r mgl32.Vec3 // normalized rotation 0..1
}

type Positionable interface {
	SetPosition(position mgl32.Vec3)
	SetRotation(rotation mgl32.Vec3)
}

func RandomizePositionAndDirection(target Positionable) {
	target.SetPosition(randomVec3())
	target.SetRotation(randomVec3().Normalize())
}

func (gObj *GameObject) SetPosition(position mgl32.Vec3) {
	gObj.p = position
}

func (gObj *GameObject) SetRotation(rotation mgl32.Vec3) {
	gObj.r = rotation
}
