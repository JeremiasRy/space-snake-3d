package game

import (
	"log"
	"space-snake-3d/protos"

	"github.com/go-gl/mathgl/mgl32"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

const (
	ROT_SPEED  float32 = 0.1
	MOVE_SPEED float32 = 1
)

const (
	MOVE_UP    int32 = 1
	MOVE_DOWN  int32 = 1 << 1
	MOVE_LEFT  int32 = 1 << 2
	MOVE_RIGHT int32 = 1 << 3
)

type Player struct {
	GameObject
	conn  *websocket.Conn
	send  chan []byte
	state *State
	input int32
}

func NewPlayer(conn *websocket.Conn, s *State) *Player {
	p := &Player{
		conn:  conn,
		send:  make(chan []byte),
		input: 0,
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
			log.Printf("error while reading player: %d, %s", p.i, err.Error())
			return
		}

		msg := &protos.Input{}

		err = proto.Unmarshal(data, msg)
		if err != nil {
			log.Printf("error while unmarshalling input: %s", err.Error())
			return
		}

		p.input = msg.Input
	}
}
func (p *Player) applyInput() {
	if p.input != 0 {
		var pitchInput float32 = 0
		var yawInput float32 = 0

		if p.input&MOVE_UP == MOVE_UP {
			pitchInput += ROT_SPEED
		}
		if p.input&MOVE_DOWN == MOVE_DOWN {
			pitchInput -= ROT_SPEED
		}
		if p.input&MOVE_LEFT == MOVE_LEFT {
			yawInput += ROT_SPEED
		}
		if p.input&MOVE_RIGHT == MOVE_RIGHT {
			yawInput -= ROT_SPEED
		}

		pitchRot := mgl32.QuatRotate(pitchInput, mgl32.Vec3{1, 0, 0})
		yawRot := mgl32.QuatRotate(yawInput, mgl32.Vec3{0, 1, 0})

		delta := yawRot.Mul(pitchRot)
		p.r = p.r.Mul(delta).Normalize()
	}

	forward := p.r.Rotate(mgl32.Vec3{0, 0, -1})
	p.p = p.p.Add(forward.Mul(MOVE_SPEED))
}

func (p *Player) toProto() *protos.Player {
	return &protos.Player{
		State: p.GameObject.toProto(),
	}
}
