import * as THREE from "three"
import { Input, Tick } from "./proto/protocol.js"

/**
 * @typedef {Object} Vector3
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} Vector4
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} w
 */

/**
 * @typedef {Object} State
 * @property {number} id
 * @property {Vector3} position
 * @property {Vector4} rotation 
*/

/**
 * @typedef {Object} Player
 * @property {State} state
 */

/**
 * @typedef {Object} Star
 * @property {State} state
 * @property {boolean} active
 */

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1000, 10000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const starGeometry = new THREE.SphereGeometry(1, 16, 16);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, 20000);
starMesh.frustumCulled = false;

const dummyObj = new THREE.Object3D();
scene.add(starMesh)
document.body.appendChild(renderer.domElement);

const ws = new WebSocket("http://172.20.14.229:8000/ws")

const keys = {
    ArrowUp: 1,
    ArrowDown: 1 << 1,
    ArrowLeft: 1 << 2,
    ArrowRight: 1 << 3,
}

let input = 0
/**
 * @type {number | null}
 */
let targetId = null
/**
 * @type {Star[]}
 */
const stars = []
/**
 * 
 * @param {{players: {players: Player[]}, starsUpdate: {starsUpdate: []}}} tick
 * @returns 
 */
const animationLoop = ({ players, starsUpdate }) => {
    const me = players.players.find((p) => p.state.id === targetId) ?? null

    if (me === null) {
        return
    }

    const { state } = me
    const { position, rotation } = state

    camera.position.x = position.x
    camera.position.y = position.y
    camera.position.z = position.z

    camera.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

    renderer.render(scene, camera)
}

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
                console.log("you_init", { targetId: message.youInit.targetId })
                targetId = message.youInit.targetId
                window.addEventListener("keydown", handleDown)
                window.addEventListener("keyup", handleUp)
                break;
            case "starsInit":
                stars.push(...message.starsInit.stars)
                for (const star of stars) {
                    const { position, rotation } = star.state
                    dummyObj.position.set(position.x, position.y, position.z);

                    if (star.active === false) {
                        dummyObj.scale.set(0, 0, 0);
                    } else {
                        dummyObj.scale.set(1, 1, 1);
                    }

                    dummyObj.updateMatrix();
                    starMesh.setMatrixAt(star.state.id, dummyObj.matrix);
                }
                starMesh.instanceMatrix.needsUpdate = true
                break;
            case "gameTick":
                animationLoop(message.gameTick)
                break;
        }
    } catch (e) {
        console.error("tick failed:", e);
    }
})

ws.addEventListener("close", (event) => {
    console.log({ event })
    window.removeEventListener("keydown", handleDown)
    window.removeEventListener("keyup", handleUp)
})
