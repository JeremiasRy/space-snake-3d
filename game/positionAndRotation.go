package game

import (
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
)

func (par *PositionAndRotation) toProto() *protos.PosAndRot {
	if par.protoCache == nil {
		par.protoCache = &protos.PosAndRot{}
	}

	par.protoCache.Position = toProtoVec3(par.p)
	par.protoCache.Rotation = toProtoVec4(par.r)

	return par.protoCache
}

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

type PositionAndRotation struct {
	p mgl32.Vec3
	r mgl32.Quat

	protoCache *protos.PosAndRot
}

type Positionable interface {
	SetPosition(position mgl32.Vec3)
	SetRotation(rotation mgl32.Quat)
}

func RandomizePositionAndDirection(target Positionable) {
	target.SetPosition(randomVec3())
	target.SetRotation(RandomQuat())
}

func (gObj *PositionAndRotation) SetPosition(position mgl32.Vec3) {
	gObj.p = position
}

func (gObj *PositionAndRotation) SetRotation(rotation mgl32.Quat) {
	gObj.r = rotation
}
