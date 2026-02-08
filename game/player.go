package game

import (
	"log"

	"github.com/gorilla/websocket"
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
		p.state.input <- data
	}
}
