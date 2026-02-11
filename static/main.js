import * as THREE from "three"
import { Input, Tick } from "./proto/protocol.js"
import { PLANE_VIEW_BOX_SIZE, PLANE_VIEW_BOX_COUNT, WORLD_BOX_OFFSET } from "./constants.js";
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

/**
 * @type {Star[][][]}
 */

const PLANE_VIEW_BOXES = Array.from({ length: PLANE_VIEW_BOX_COUNT }, () => { return Array.from({ length: PLANE_VIEW_BOX_COUNT }, () => []) })
const STAR_ACTIVE = 1.0
const STAR_INACTIVE = 0.0

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1000, 5000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const activeArray = new Float32Array(2_000_000).fill(STAR_ACTIVE);
const starGeometry = new THREE.TetrahedronGeometry(10);
starGeometry.setAttribute('aActive', new THREE.InstancedBufferAttribute(activeArray, 1));
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, 2_000_000);
/**
 * @type {Map<number, THREE.Box3Helper>}
 */
const playersMap = new Map()
/**
 * @param {Player} player 
 */
const newPlayer = (player) => {
    const { position, id, rotation } = player.state
    const geometry = new THREE.BoxGeometry(20, 20, 20);

    const material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(position.x, position.y, position.z);

    const { x, y, z, w } = rotation;
    mesh.rotation.setFromQuaternion(new THREE.Quaternion(x, y, z, w));

    scene.add(mesh);
    playersMap.set(id, mesh);
    return mesh;
}

starMesh.frustumCulled = false;
starMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uPlayerPos = { value: new THREE.Vector3() };

    starMaterial.userData.shader = shader;

    shader.vertexShader = `
        uniform vec3 uPlayerPos;
        attribute float aActive;
    ` + shader.vertexShader;

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        
        float scale = aActive;
        float renderDistance = ${PLANE_VIEW_BOX_SIZE * 5}.0;
        vec3 instancePos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        float dist = distance(instancePos, uPlayerPos);
        
        if (dist > renderDistance) {
            scale = 0.0;
        }

        transformed *= scale;
        `
    );
};

const dummyObj = new THREE.Object3D();
scene.add(starMesh)
document.body.appendChild(renderer.domElement);

const ws = new WebSocket("/ws")

const keys = {
    ArrowUp: 1,
    ArrowDown: 1 << 1,
    ArrowLeft: 1 << 2,
    ArrowRight: 1 << 3,
    z: 1 << 4,
    x: 1 << 5
}

let input = 0
/**
 * @type {number | null}
*/
let targetId = null
let currentPlaneViewBox = [0, 0]
/**
 * @type {Star[] | null}
*/
let stars = null

const collisionCheck = () => {
    const [x, y] = currentPlaneViewBox
    // console.log({ stars: PLANE_VIEW_BOXES[x][y] })
}

/**
 * 
 * @param {{players: {players: Player[]}, starsUpdate: {starsUpdate: []}}} tick
 * @returns 
 */
const animationLoop = ({ players, starsUpdate }) => {
    /**
     * @type {Player | null}
     */
    let me = null

    const allIds = new Set(playersMap.keys())

    for (const player of players.players) {
        const { id, position, rotation } = player.state
        if (id === targetId) {
            me = player
        }

        allIds.delete(id)
        let graphic = playersMap.get(id)
        if (graphic === undefined) {
            graphic = newPlayer(player)
        }

        graphic.position.x = position.x
        graphic.position.y = position.y
        graphic.position.z = position.z

        const { x, y, z, w } = rotation
        graphic.rotation.setFromQuaternion(new THREE.Quaternion(x, y, z, w))
    }

    for (const id of allIds) {
        scene.remove(players.get(id))
        delete players[id]
    }

    if (me === null) {
        return
    }

    const { state } = me
    const { position, rotation } = state
    const playerRot = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

    const cameraOffset = new THREE.Vector3(0, 20, 100);
    cameraOffset.applyQuaternion(playerRot);

    camera.position.x = position.x + cameraOffset.x;
    camera.position.y = position.y + cameraOffset.y;
    camera.position.z = position.z + cameraOffset.z;

    const playerUp = new THREE.Vector3(0, 1, 0);
    playerUp.applyQuaternion(playerRot);

    camera.up.copy(playerUp);
    camera.lookAt(position.x, position.y, position.z);

    currentPlaneViewBox = [
        Math.floor((position.x + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE),
        Math.floor((position.y + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)
    ];

    if (starMaterial.userData.shader) {
        starMaterial.userData.shader.uniforms.uPlayerPos.value.copy(position);
    }

    collisionCheck()
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
    const msg = {
        keyInput: {
            input
        }
    }
    const i = Input.create(msg)
    ws.send(Input.encode(i).finish())
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
                stars = message.starsInit.stars
                console.log({ stars })
                for (const star of stars) {
                    const { id, position } = star.state
                    dummyObj.position.set(position.x, position.y, position.z);
                    const planeViewBoxX = Math.floor((position.x + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)
                    const planeViewBoxY = Math.floor((position.y + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)

                    dummyObj.updateMatrix();
                    starMesh.setMatrixAt(id, dummyObj.matrix);
                    activeArray[id] = star.active ? STAR_ACTIVE : STAR_INACTIVE
                    PLANE_VIEW_BOXES[planeViewBoxX][planeViewBoxY].push(star)
                }
                starMesh.instanceMatrix.needsUpdate = true
                break;
            case "gameTick":
                if (stars === null) {
                    return
                }
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
