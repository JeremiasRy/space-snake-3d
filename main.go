package main

import (
	"log"
	"net/http"
	_ "net/http/pprof"
	"space-snake-3d/game"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var state *game.State

func handleWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	player := game.NewPlayer(conn, state)

	go player.WriteTo()
	player.ReadFrom()
}

func main() {
	state = game.CreateState()

	go state.ListenPlayers()
	go state.Tick()

	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/ws", handleWs)
	http.ListenAndServe(":8000", nil)
}
