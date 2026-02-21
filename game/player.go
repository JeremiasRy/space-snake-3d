package game

import (
	"container/list"
	"log"
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

const (
	BASE_ROT_SPEED          float32 = 0.0001
	BASE_ACCELERATION_SPEED float32 = 0.005
	JERK_FACTOR             float32 = 0.01
	ROT_JERK_FACTOR         float32 = 0.0001
	MAX_ROT_SPEED           float32 = 0.1
	MAX_SPEED               float32 = 200.0
	ROT_FRICTION            float32 = 0.9
	SCORE_LENGTH_FACTOR     int     = 5
)

type Input int32

const (
	FLAG_MOVE_UP    Input = 1
	FLAG_MOVE_DOWN  Input = 1 << 1
	FLAG_MOVE_LEFT  Input = 1 << 2
	FLAG_MOVE_RIGHT Input = 1 << 3
	FLAG_SPEED_UP   Input = 1 << 4
	FLAG_BRAKE      Input = 1 << 5
	FLAG_SHOOT_LOAD Input = 1 << 6
)

type Player struct {
	PositionAndRotation
	conn  *websocket.Conn
	send  chan []byte
	state *State
	input Input

	id        int32
	speed     float32
	pitch     float32
	yaw       float32
	radius    float32
	rollAngle float32
	rollSpeed float32
	brake     float32
	score     int32
	positions list.List
	maxLength int

	heldMap map[Input]float32

	protoCache *protos.Player
}

func NewPlayer(conn *websocket.Conn, s *State) *Player {
	p := &Player{
		conn:      conn,
		send:      make(chan []byte, 64),
		input:     0,
		speed:     10,
		radius:    16,
		positions: list.List{},
		maxLength: SCORE_LENGTH_FACTOR,
		score:     1,

		heldMap: map[Input]float32{},
	}
	s.join <- p
	p.state = s

	return p
}

func (p *Player) WriteTo() {
	defer func() {
		p.conn.Close()
	}()
	for data := range p.send {
		err := p.conn.WriteMessage(websocket.BinaryMessage, data)

		if err != nil {
			log.Printf("failed to write a message to client %s", err.Error())
			return
		}
	}
}

func (p *Player) ReadFrom() {
	defer func() {
		p.state.disconnect <- p
		p.conn.Close()
	}()

	for {
		_, data, err := p.conn.ReadMessage()
		if err != nil {
			log.Printf("error while reading player: %d, %s", p.id, err.Error())
			return
		}

		msg := &protos.Input{}

		err = proto.Unmarshal(data, msg)
		if err != nil {
			log.Printf("error while unmarshalling input: %s", err.Error())
			return
		}

		switch msg := msg.Payload.(type) {
		case *protos.Input_KeyInput:
			{
				p.input = Input(msg.KeyInput.Input)
			}
		case *protos.Input_StarTouch:
			{
				p.state.events <- &StarTouch{starId: msg.StarTouch.TargetId}
				p.score++
				p.maxLength += SCORE_LENGTH_FACTOR
				p.radius *= 1.2
			}
		}
	}
}

func (p *Player) applyInput() {
	isPitching := false

	if p.input&FLAG_MOVE_UP == FLAG_MOVE_UP {
		isPitching = true
		p.heldMap[FLAG_MOVE_UP]++
		framesHeld := p.heldMap[FLAG_MOVE_UP]

		p.pitch += BASE_ROT_SPEED + (framesHeld * ROT_JERK_FACTOR)
	} else if p.heldMap[FLAG_MOVE_UP] > 0 {
		p.heldMap[FLAG_MOVE_UP] = 0
	}

	if p.input&FLAG_MOVE_DOWN == FLAG_MOVE_DOWN {
		isPitching = true
		p.heldMap[FLAG_MOVE_DOWN]++
		framesHeld := p.heldMap[FLAG_MOVE_DOWN]

		p.pitch -= BASE_ROT_SPEED + (framesHeld * ROT_JERK_FACTOR)
	} else if p.heldMap[FLAG_MOVE_DOWN] > 0 {
		p.heldMap[FLAG_MOVE_DOWN] = 0
	}

	if !isPitching {
		p.pitch *= ROT_FRICTION
		if p.pitch > -0.001 && p.pitch < 0.001 {
			p.pitch = 0
		}
	}

	if p.pitch > MAX_ROT_SPEED {
		p.pitch = MAX_ROT_SPEED
	} else if p.pitch < -MAX_ROT_SPEED {
		p.pitch = -MAX_ROT_SPEED
	}

	isYawing := false

	if p.input&FLAG_MOVE_LEFT == FLAG_MOVE_LEFT {
		isYawing = true
		p.heldMap[FLAG_MOVE_LEFT]++
		framesHeld := p.heldMap[FLAG_MOVE_LEFT]
		p.yaw += BASE_ROT_SPEED + (framesHeld * ROT_JERK_FACTOR)
	} else if p.heldMap[FLAG_MOVE_LEFT] > 0 {
		p.heldMap[FLAG_MOVE_LEFT] = 0
	}

	if p.input&FLAG_MOVE_RIGHT == FLAG_MOVE_RIGHT {
		isYawing = true
		p.heldMap[FLAG_MOVE_RIGHT]++
		framesHeld := p.heldMap[FLAG_MOVE_RIGHT]
		p.yaw -= BASE_ROT_SPEED + (framesHeld * ROT_JERK_FACTOR)
	} else if p.heldMap[FLAG_MOVE_RIGHT] > 0 {
		p.heldMap[FLAG_MOVE_RIGHT] = 0
	}

	if !isYawing {
		p.yaw *= ROT_FRICTION
		if p.yaw > -0.001 && p.yaw < 0.001 {
			p.yaw = 0
		}
	}

	if p.yaw > MAX_ROT_SPEED {
		p.yaw = MAX_ROT_SPEED
	} else if p.yaw < -MAX_ROT_SPEED {
		p.yaw = -MAX_ROT_SPEED
	}

	if p.input&FLAG_BRAKE == FLAG_BRAKE {
		p.brake = max(p.brake-0.001, 0)
	} else {
		p.brake = 1
	}

	if p.input&FLAG_SPEED_UP == FLAG_SPEED_UP {
		p.heldMap[FLAG_SPEED_UP]++
		framesHeld := p.heldMap[FLAG_SPEED_UP]

		accel := BASE_ACCELERATION_SPEED + (framesHeld * JERK_FACTOR)
		p.speed = min(p.speed+accel, MAX_SPEED)
	} else {
		if p.heldMap[FLAG_SPEED_UP] > 0 {
			p.heldMap[FLAG_SPEED_UP] = 0
		}
		p.speed *= p.brake
	}

	pitchRot := mgl32.QuatRotate(p.pitch, mgl32.Vec3{1, 0, 0})
	yawRot := mgl32.QuatRotate(p.yaw, mgl32.Vec3{0, 1, 0})

	delta := yawRot.Mul(pitchRot)

	new := &protos.PosAndRot{}
	p.PositionAndRotation.r = p.PositionAndRotation.r.Mul(delta).Normalize()

	forward := p.PositionAndRotation.r.Rotate(mgl32.Vec3{0, 0, -1})
	p.PositionAndRotation.p = p.PositionAndRotation.p.Add(forward.Mul(p.speed))

	new.Position = toProtoVec3(p.PositionAndRotation.p)
	new.Rotation = toProtoVec4(p.PositionAndRotation.r)
	new.Radius = p.radius

	p.positions.PushFront(new)

	if p.positions.Len() > p.maxLength {
		p.positions.Remove(p.positions.Back())
	}
}

func (p *Player) toProto() *protos.Player {
	if p.protoCache == nil {
		p.protoCache = &protos.Player{
			Positions: make([]*protos.PosAndRot, 0, 1000),
		}
	}

	p.protoCache.Positions = p.protoCache.Positions[:0]
	p.protoCache.Pitch = p.pitch
	p.protoCache.Yaw = p.yaw
	p.protoCache.Score = p.score
	p.protoCache.Id = p.id

	for e := p.positions.Front(); e != nil; e = e.Next() {
		p.protoCache.Positions = append(p.protoCache.Positions, e.Value.(*protos.PosAndRot))
	}

	return p.protoCache
}
