import * as THREE from "three"
import { Input, Tick } from "./proto/protocol.js"
import { PLANE_VIEW_BOX_SIZE, PLANE_VIEW_BOX_COUNT, WORLD_BOX_OFFSET } from "./constants.js";
import { getStarshipBall, newStarship } from "./starshipFactory.js";
import { createFlashSprite } from "./flashOfLight.js";
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
 * 
*/

/**
 * @typedef {Object} Player
 * @property {State} state
 * @property {number} pitch
 * @property {number} yaw
 * @property {number} score
 * @property {number} shootLoad
 */

/**
 * @typedef {Object} Star
 * @property {State} state
 * @property {boolean} active
 */

/**
 * @typedef {Object} FlashOfLight
 * @property {State} state
 * @property {number} intensity
 */

/**
 * @type {Star[][][]}
 */
const PLANE_VIEW_BOXES = Array.from({ length: PLANE_VIEW_BOX_COUNT }, () => { return Array.from({ length: PLANE_VIEW_BOX_COUNT }, () => []) })
const STAR_ACTIVE = 1.0
const STAR_INACTIVE = 0.0

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
const activeArray = new Float32Array(2_000_000).fill(STAR_ACTIVE);
const starGeometry = new THREE.TetrahedronGeometry(10);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, 2_000_000);

/**
 * @type {Star[] | null}
*/
let stars = null

/**
 * @type {Map<number, THREE.Group>}
 */
const playersMap = new Map()

/**
 * @type {Map<number, THREE.Mesh>}
 */

const flashMap = new Map()

/**
 * @param {FlashOfLight} flash
 * @returns {THREE.Mesh}
 */


scene.fog = new THREE.Fog(0x000000, 1000, 5000);
renderer.setSize(window.innerWidth, window.innerHeight);
starGeometry.setAttribute('aActive', new THREE.InstancedBufferAttribute(activeArray, 1));
scene.add(starMesh)
document.body.appendChild(renderer.domElement);
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

console.time("Pre-compile");
renderer.compile(scene, camera);
console.timeEnd("Pre-compile");


/**
 * @param {Player} player 
 */
const newPlayer = (player) => {
    const { position, id, rotation } = player.state
    const starship = newStarship()
    starship.position.set(position.x, position.y, position.z);

    const { x, y, z, w } = rotation;
    starship.rotation.setFromQuaternion(new THREE.Quaternion(x, y, z, w));

    scene.add(starship);
    playersMap.set(id, starship);
    return starship;
}

const newFlash = (flash) => {
    const { state } = flash;
    const { position, id } = state;
    const flashSprite = createFlashSprite(position)

    scene.add(flashSprite);
    flashMap.set(id, flashSprite);

    return flashSprite;
}



const ws = new WebSocket("/ws")

const keys = {
    ArrowUp: 1,
    ArrowDown: 1 << 1,
    ArrowLeft: 1 << 2,
    ArrowRight: 1 << 3,
    z: 1 << 4,
    x: 1 << 5,
    [" "]: 1 << 6
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

const hudX = document.getElementById("pos-x")
const hudY = document.getElementById("pos-y")
const hudZ = document.getElementById("pos-z")

const hudPitch = document.getElementById("pitch")
const hudYaw = document.getElementById("yaw")

const hudScore = document.getElementById("score-ui")

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
                console.time("init")
                const dummyObj = new THREE.Object3D();
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
                console.timeEnd("init")
                break;
            case "gameTick":
                // still loading our star mesh
                if (stars === null) {
                    return
                }
                // console.time("Game tick")
                /**
                 *  @type {{ players: { players: Player[] }, starsUpdate: { stars: Star[] }, flashes: { flashes: FlashOfLight[] } }} 
                **/
                const { players, starsUpdate, flashes } = message.gameTick;

                const allFlashIds = new Set(flashMap.keys())
                if (flashes.flashes.length > 0) {
                    for (const flashMessage of flashes.flashes) {
                        const { id } = flashMessage.state


                        let flash = flashMap.get(id) ?? null
                        if (flash === null) {
                            flash = newFlash(flashMessage)
                        }

                        allFlashIds.delete(id)
                        const normalizedIntensity = Math.max(0, flashMessage.intensity / 100.0);

                        flash.material.opacity = normalizedIntensity;

                        const currentScale = 1 + (normalizedIntensity * 1000);
                        flash.scale.set(currentScale, currentScale, 1);
                    }

                }
                // clean up 
                for (const id of allFlashIds) {
                    const flash = flashMap.get(id) ?? null
                    if (flash === null) {
                        continue
                    }
                    scene.remove(flash)
                    flashMap.delete(id)
                }
                if (starsUpdate.stars.length > 0) {
                    let minIndex = Infinity
                    let maxIndex = -Infinity
                    // worst case we have updates at id 1 and 2mil :D Let's hope that doesn't happen...
                    for (const { active, state } of starsUpdate.stars) {
                        stars[state.id].active = active
                        activeArray[state.id] = active ? STAR_ACTIVE : STAR_INACTIVE

                        if (state.id < minIndex) {
                            minIndex = state.id
                        }
                        if (state.id > maxIndex) {
                            maxIndex = state.id
                        }
                    }

                    const activeGPUAttribute = starGeometry.attributes.aActive;
                    activeGPUAttribute.updateRanges.offset = minIndex;
                    activeGPUAttribute.updateRanges.count = (maxIndex - minIndex) + 1;
                    activeGPUAttribute.needsUpdate = true
                }

                const allPlayerIds = new Set(playersMap.keys())
                let me = null
                // move players
                for (const player of players.players) {
                    const { id, position, rotation, } = player.state
                    if (id === targetId) {
                        me = player
                    }

                    allPlayerIds.delete(id)
                    let starship = playersMap.get(id)
                    if (starship === undefined) {
                        starship = newPlayer(player)
                    }

                    starship.position.x = position.x
                    starship.position.y = position.y
                    starship.position.z = position.z

                    const { x, y, z, w } = rotation
                    starship.rotation.setFromQuaternion(new THREE.Quaternion(x, y, z, w))
                    const ball = getStarshipBall(starship)
                    const loadMultiplier = (player.shootLoad > 0 ? player.shootLoad : 1)
                    ball.rotation.y += 0.02 * loadMultiplier
                    ball.rotation.x += 0.004

                    if (loadMultiplier > 1) {
                        const scaleFactor = 1.001 * loadMultiplier
                        ball.scale.set(scaleFactor, scaleFactor, scaleFactor)
                    } else {
                        ball.scale.set(1, 1, 1)
                    }
                }

                for (const id of allPlayerIds) {
                    scene.remove(playersMap.get(id))
                    playersMap.delete(id)
                }

                if (me === null) {
                    break;
                }

                // set camera
                const { state, pitch, yaw, score } = me
                const { position, rotation } = state

                const playerMesh = playersMap.get(targetId)

                hudX.innerText = Math.trunc(position.x)
                hudY.innerText = Math.trunc(position.y)
                hudZ.innerText = Math.trunc(position.z)

                hudPitch.innerText = Math.trunc(pitch * 1000) / 100
                hudYaw.innerText = Math.trunc(yaw * 1000) / 100

                hudScore.innerText = score

                const pitchIntensity = pitch / 0.5;
                const yawIntensity = yaw / 0.5;

                const playerRot = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

                const cameraOffset = new THREE.Vector3(500 * yawIntensity, (500 * (-pitchIntensity)) + 20, 100);
                cameraOffset.applyQuaternion(playerRot);

                const idealPosition = new THREE.Vector3(
                    position.x + cameraOffset.x,
                    position.y + cameraOffset.y,
                    position.z + cameraOffset.z
                );

                const cameraSpeed = 0.5;
                camera.position.lerp(idealPosition, cameraSpeed);

                const playerUp = new THREE.Vector3(0, 1, 0);
                playerUp.applyQuaternion(playerRot);

                camera.up.lerp(playerUp, cameraSpeed);
                camera.lookAt(position.x, position.y, position.z);

                const maxOffsetRadians = THREE.MathUtils.degToRad(180);


                const visualPitch = pitchIntensity * maxOffsetRadians;
                const visualTurn = yawIntensity * maxOffsetRadians;

                playerMesh.quaternion.copy(playerRot);

                playerMesh.rotateX(visualPitch);
                playerMesh.rotateY(visualTurn);
                playerMesh.rotateZ(visualTurn);

                const [planeX, planeY] = [
                    Math.floor((position.x + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE),
                    Math.floor((position.y + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)
                ];

                if (starMaterial.userData.shader) {
                    starMaterial.userData.shader.uniforms.uPlayerPos.value.copy(position);
                }

                const dummyBox_1 = new THREE.Box3();
                const dummyBox_2 = new THREE.Box3();

                const starCenterVec = new THREE.Vector3();
                const starSizeVec = new THREE.Vector3(10, 10, 10);
                const meCenterVec = new THREE.Vector3(me.state.position.x, me.state.position.y, me.state.position.z);
                const meSizeVec = new THREE.Vector3(20, 20, 20);

                dummyBox_2.setFromCenterAndSize(meCenterVec, meSizeVec);
                for (const star of PLANE_VIEW_BOXES[planeX][planeY]) {
                    if (!star.active) {
                        continue
                    }

                    const { x, y, z } = star.state.position
                    starCenterVec.set(x, y, z)
                    dummyBox_1.setFromCenterAndSize(starCenterVec, starSizeVec)

                    if (dummyBox_1.intersectsBox(dummyBox_2)) {
                        const msg = {
                            starTouch: {
                                targetId: star.state.id
                            }
                        }
                        const i = Input.create(msg)
                        ws.send(Input.encode(i).finish())
                        break; // There are no overlapping stars so no need to continue the checks
                    }
                }
                renderer.render(scene, camera)
                //console.timeEnd("Game tick")
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
