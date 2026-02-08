package game

import (
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
)

func toProtoVec3(v mgl32.Vec3) *protos.Vector3 {
	return &protos.Vector3{
		X: v.X(),
		Y: v.Y(),
		Z: v.Z(),
	}
}
func toProtoVec4(v mgl32.Quat) *protos.Vector4 {
	return &protos.Vector4{
		X: v.X(),
		Y: v.Y(),
		Z: v.Z(),
		W: v.W,
	}
}

func (gObj *GameObject) toProto() *protos.GameObjectDefinition {
	return &protos.GameObjectDefinition{
		Id:       gObj.i,
		Position: toProtoVec3(gObj.p),
		Rotation: toProtoVec4(gObj.r),
	}
}

type GameObject struct {
	i int32
	p mgl32.Vec3 // position of the object in 3d space
	r mgl32.Quat
}

type Positionable interface {
	SetPosition(position mgl32.Vec3)
	SetRotation(rotation mgl32.Quat)
}

func RandomizePositionAndDirection(target Positionable) {
	target.SetPosition(randomVec3())
	target.SetRotation(RandomQuat())
}

func (gObj *GameObject) SetPosition(position mgl32.Vec3) {
	gObj.p = position
}

func (gObj *GameObject) SetRotation(rotation mgl32.Quat) {
	gObj.r = rotation
}
