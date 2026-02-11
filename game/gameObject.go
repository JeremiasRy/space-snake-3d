package game

import (
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
)

func (gObj *GameObject) toProto() *protos.GameObjectDefinition {
	if gObj.protoCache == nil {
		gObj.protoCache = &protos.GameObjectDefinition{
			Position: &protos.Vector3{},
			Rotation: &protos.Vector4{},
		}
		gObj.protoCache.Id = gObj.i
	}

	gObj.protoCache.Position.X = gObj.p.X()
	gObj.protoCache.Position.Y = gObj.p.Y()
	gObj.protoCache.Position.Z = gObj.p.Z()

	gObj.protoCache.Rotation.X = gObj.r.X()
	gObj.protoCache.Rotation.Y = gObj.r.Y()
	gObj.protoCache.Rotation.Z = gObj.r.Z()
	gObj.protoCache.Rotation.W = gObj.r.W
	return gObj.protoCache
}

type GameObject struct {
	i          int32
	p          mgl32.Vec3 // position of the object in 3d space
	r          mgl32.Quat
	protoCache *protos.GameObjectDefinition
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
