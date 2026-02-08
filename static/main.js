import * as THREE from "three"
import { Input, Tick, WhoAreYou } from "./proto/protocol.js"


const ws = new WebSocket("http://172.20.14.229:8000/ws")

const keys = {
    ArrowUp: 1,
    ArrowDown: 2,
    ArrowLeft: 4,
    ArrowRight: 8,
}

let input = 0
/**
 * @type {number | null}
 */
let targetId = null

/**
 * @param {KeyboardEvent} event 
 */
const handleDown = ({ key, repeat }) => {
    if (repeat) {
        return
    }
    input |= keys[key]
    sendInput()
}

/**
 * @param {KeyboardEvent} event 
 */
const handleUp = ({ key, repeat }) => {
    if (repeat) {
        return
    }
    input ^= keys[key]
    sendInput()
}

const sendInput = () => {
    if (targetId === null) {
        return
    }
    const i = Input.encode({ targetId, input }).finish()
    ws.send(i)
}
/**
 * @param {Event} event
 */
ws.addEventListener("open", (event) => {
    console.log("Connection established...", { event })
})

/**
 * @param {MessageEvent} event
 */
ws.addEventListener("message", async ({ data }) => {
    const buffer = new Uint8Array(await data.arrayBuffer())

    try {
        /** @type {import('./proto/protocol.js').Tick} */
        const tick = Tick.decode(buffer);
        const message = Tick.toObject(tick, {
            oneofs: true,
            defaults: true
        });

        switch (message.payload) {
            case "youInit":
                targetId = message.youInit.targetId
                window.addEventListener("keydown", handleDown)
                window.addEventListener("keyup", handleUp)
                break;
            case "starsInit":
                console.log("stars_init", message.stars.stars);
                break;
            case "gameTick":
                console.log("game tick:", message.players.players);
                break;
        }
    } catch (e) {
        console.error("Protobuf decoding failed:", e);
    }
})

ws.addEventListener("close", (event) => {
    console.log({ event })
    window.removeEventListener("keydown", handleDown)
    window.removeEventListener("keyup", handleUp)
})
