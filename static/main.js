import * as THREE from "three"
import { Input, Tick } from "./proto/protocol.js"
import { PLANE_VIEW_BOX_SIZE, PLANE_VIEW_BOX_COUNT, WORLD_BOX_OFFSET } from "./constants.js";
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
 * @typedef {Object} PosAndRot
 * @property {Vector3} position 
 * @property {Vector4} rotation 
 * @property {number} radius
 */


/**
 * @typedef {Object} Player
 * @property {PosAndRot[]} positions
 * @property {number} pitch
 * @property {number} yaw
 * @property {number} score
 * @property {number} id
 */

/**
 * @typedef {Object} Star
 * @property {number} id
 * @property {PosAndRot} position
 * @property {boolean} active
*/

/**
 * @typedef {Object} FlashOfLight
 * @property {number} id
 * @property {PosAndRot} position
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
 * @type {Map<number, THREE.Mesh[]>}
 */
const playersMap = new Map()
/**
 * @type {Map<number, THREE.Mesh>}
 */
const flashMap = new Map()

scene.fog = new THREE.Fog(0x000000, 1000, 25000);
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


const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
/**
 * @param {PosAndRot} param0 
 */
const newRingMesh = ({ position, rotation, radius }) => {
    const geometry = new THREE.RingGeometry(1, 2, 8, 8);
    const mesh = new THREE.Mesh(geometry, playerMaterial);
    mesh.position.set(position.x, position.y, position.z);
    mesh.scale.setScalar(radius)

    const { x, y, z, w } = rotation;
    mesh.rotation.setFromQuaternion(new THREE.Quaternion(x, y, z, w));
    return mesh
}
/**
 * @param {Player} player 
 */
const newPlayer = (player) => {
    const { positions, id } = player
    const meshArr = positions.map(newRingMesh)

    meshArr.forEach(m => scene.add(m))
    playersMap.set(id, meshArr);
    return meshArr;
}
/**
 * @param {FlashOfLight} flash 
 * @returns 
 */
const newFlash = (flash) => {
    const { id, position } = flash;
    const { position: p, } = position;
    const flashSprite = createFlashSprite(p)

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

const dummyBox_1 = new THREE.Box3();
const dummyBox_2 = new THREE.Box3();
const playerHitboxHelper = new THREE.Box3Helper(dummyBox_2, 0x00ff00);
const arrowTargetVec = new THREE.Vector3();
const arrowDirVec = new THREE.Vector3();

const closestStarArrow = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    10,
    0x00ffff
);

scene.add(closestStarArrow);
scene.add(playerHitboxHelper);

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
                console.log("initialization tick received", { targetId })
                window.addEventListener("keydown", handleDown)
                window.addEventListener("keyup", handleUp)
                break;
            case "starsInit":
                stars = message.starsInit.stars
                console.time("star initialization")
                const dummyObj = new THREE.Object3D();
                for (const star of stars) {
                    const { id, position } = star
                    const { position: p, } = position
                    dummyObj.position.set(p.x, p.y, p.z);
                    const planeViewBoxX = Math.floor((p.x + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)
                    const planeViewBoxY = Math.floor((p.y + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)

                    dummyObj.updateMatrix();
                    starMesh.setMatrixAt(id, dummyObj.matrix);
                    activeArray[id] = star.active ? STAR_ACTIVE : STAR_INACTIVE
                    PLANE_VIEW_BOXES[planeViewBoxX][planeViewBoxY].push(star)
                }
                starMesh.instanceMatrix.needsUpdate = true
                console.timeEnd("star initialization")
                break;
            case "gameTick":
                // still loading our star mesh
                if (stars === null) {
                    return
                }
                console.time("Game tick")
                /**
                 *  @type {{ players: { players: Player[] }, starsUpdate: { stars: Star[] }, flashes: { flashes: FlashOfLight[] } }} 
                **/
                const { players, starsUpdate, flashes } = message.gameTick;

                const allFlashIds = new Set(flashMap.keys())
                if (flashes.flashes.length > 0) {
                    for (const flashMessage of flashes.flashes) {
                        const { id } = flashMessage


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
                    for (const { active, id } of starsUpdate.stars) {
                        stars[id].active = active
                        activeArray[id] = active ? STAR_ACTIVE : STAR_INACTIVE

                        if (id < minIndex) {
                            minIndex = id
                        }
                        if (id > maxIndex) {
                            maxIndex = id
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
                    const { id, positions } = player

                    if (id === targetId) {
                        me = player
                    }

                    allPlayerIds.delete(id)
                    let snake = playersMap.get(id)
                    if (snake === undefined) {
                        snake = newPlayer(player)
                    }

                    if (snake.length < positions.length) {
                        let diff = positions.length - snake.length
                        while (diff > 0) {
                            const newMesh = newRingMesh(positions[positions.length - diff])
                            scene.add(newMesh)
                            snake.push(newMesh)
                            diff--
                        }
                    }

                    for (const [idx, mesh] of snake.entries()) {
                        const { position, rotation, radius } = positions[idx]
                        mesh.position.x = position.x
                        mesh.position.y = position.y
                        mesh.position.z = position.z

                        mesh.scale.setScalar(radius / 10)

                        const { x, y, z, w } = rotation
                        const headingQuat = new THREE.Quaternion(x, y, z, w)

                        mesh.quaternion.copy(headingQuat)

                        const spinSpeed = 0.002;
                        mesh.rotateZ(performance.now() * spinSpeed);
                    }
                }

                for (const id of allPlayerIds) {
                    scene.remove(playersMap.get(id))
                    playersMap.delete(id)
                }

                if (me === null) {
                    break;
                }

                // set camera from the head
                const { pitch, yaw, score, positions } = me
                const { position, rotation, radius } = positions[0]


                const playerMesh = playersMap.get(targetId)[0]

                hudX.innerText = Math.trunc(position.x)
                hudY.innerText = Math.trunc(position.y)
                hudZ.innerText = Math.trunc(position.z)

                hudPitch.innerText = Math.trunc(pitch * 1000) / 100
                hudYaw.innerText = Math.trunc(yaw * 1000) / 100

                hudScore.innerText = score - 1

                const pitchIntensity = pitch / 0.5;
                const yawIntensity = yaw / 0.5;

                const playerRot = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

                const cameraOffset = new THREE.Vector3(0, positions.length * 10, positions.length * 15);
                cameraOffset.applyQuaternion(playerRot);

                const idealPosition = new THREE.Vector3(
                    position.x + cameraOffset.x,
                    position.y + cameraOffset.y,
                    position.z + cameraOffset.z
                );

                const cameraSpeed = 0.1;
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

                const [planeX, planeY] = [
                    Math.floor((position.x + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE),
                    Math.floor((position.y + WORLD_BOX_OFFSET) / PLANE_VIEW_BOX_SIZE)
                ];

                if (starMaterial.userData.shader) {
                    starMaterial.userData.shader.uniforms.uPlayerPos.value.copy(position);
                }

                const starCenterVec = new THREE.Vector3();
                const starSizeVec = new THREE.Vector3(20, 20, 20);
                const meCenterVec = new THREE.Vector3(position.x, position.y, position.z);
                const size = radius / 10
                const meSizeVec = new THREE.Vector3(size, size, size);

                dummyBox_2.setFromCenterAndSize(meCenterVec, meSizeVec);

                let closestDistanceSq = Number.MAX_VALUE;
                let closestStarPos = null;

                for (const star of PLANE_VIEW_BOXES[planeX][planeY]) {
                    if (!star.active) {
                        continue
                    }

                    const { x, y, z } = star.position.position
                    starCenterVec.set(x, y, z)
                    dummyBox_1.setFromCenterAndSize(starCenterVec, starSizeVec)

                    if (dummyBox_1.intersectsBox(dummyBox_2)) {
                        const msg = {
                            starTouch: {
                                targetId: star.id
                            }
                        }
                        const i = Input.create(msg)
                        ws.send(Input.encode(i).finish())
                        break; // There are no overlapping stars so no need to continue the checks
                    }

                    const distSq = meCenterVec.distanceToSquared(starCenterVec);

                    if (distSq < closestDistanceSq) {
                        closestDistanceSq = distSq;
                        closestStarPos = { x, y, z };
                    }
                }

                if (closestStarPos !== null) {
                    closestStarArrow.visible = true;
                    arrowTargetVec.set(closestStarPos.x, closestStarPos.y, closestStarPos.z);

                    arrowDirVec.subVectors(arrowTargetVec, meCenterVec);
                    const distance = arrowDirVec.length();
                    arrowDirVec.normalize();

                    closestStarArrow.position.copy(meCenterVec);
                    closestStarArrow.setDirection(arrowDirVec);

                    closestStarArrow.setLength(100 < distance ? 100 : distance, 15, 10);
                }
                renderer.render(scene, camera)
                console.timeEnd("Game tick")
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
