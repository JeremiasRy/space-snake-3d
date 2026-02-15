package game

import (
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
)

const (
	FLASH_MAX_INTENSITY int32 = 100
	FLASH_GROW          int32 = 15
	FLASH_DECAY         int32 = 5
)

var flashIdCount int32 = 0

type FlashOfLight struct {
	PositionAndRotation
	id         int32
	intensity  int32
	isDecaying bool

	protoCache *protos.FlashOfLight
}

func NewFlashOfLight(position mgl32.Vec3) *FlashOfLight {
	f := &FlashOfLight{
		intensity:  0,
		isDecaying: false,
	}

	f.p = position
	f.r = mgl32.Quat{}
	f.id = flashIdCount
	flashIdCount++
	return f
}

func (f *FlashOfLight) tick() {
	if f.isDecaying {
		f.intensity -= FLASH_DECAY
	} else {
		f.intensity += FLASH_GROW
	}

	if !f.isDecaying {
		f.isDecaying = f.intensity > FLASH_MAX_INTENSITY
	}
}

func (f *FlashOfLight) isDone() bool {
	return f.intensity < 0
}

func (f *FlashOfLight) toProto() *protos.FlashOfLight {
	if f.protoCache == nil {
		f.protoCache = &protos.FlashOfLight{}
	}

	f.protoCache.Position = f.PositionAndRotation.toProto()
	f.protoCache.Intensity = f.intensity
	f.protoCache.Id = f.id
	return f.protoCache
}
