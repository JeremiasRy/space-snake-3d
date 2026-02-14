import * as THREE from "three"
import { createFlashSprite } from "./flashOfLight.js";

const yellowMesh = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true
});

const skyBlue = new THREE.PointsMaterial({
    color: 0x87CEEB,
    size: 0.2,
    sizeAttenuation: true
})


const BOX_HEIGHT = 12
const BOX_WIDTH = 16
const BOX_DEPTH = 16


const block = ({ x, y, z }) => {
    const geometry = new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH)
    const mesh = new THREE.Mesh(geometry, yellowMesh)
    mesh.position.set(x, y, z)
    return mesh
}

const STARSHIP_BALL_NAME = "magic_ball"

const ball = ({ x, y, z }) => {
    const geometry = new THREE.SphereGeometry(2, 16, 16)
    const dottedSphere = new THREE.Points(geometry, skyBlue)
    dottedSphere.position.set(x, y, z)
    dottedSphere.name = STARSHIP_BALL_NAME

    return dottedSphere
}

export const newStarship = () => {
    const group = new THREE.Group()

    // center column
    for (const [x, y, z] of [[0, -BOX_HEIGHT, 0], [0, BOX_HEIGHT, 0]]) {
        group.add(block({ x, y, z }))
    }

    // center "plane"
    for (const [x, y, z] of [[BOX_WIDTH / 2, 0, BOX_DEPTH / 2], [-(BOX_WIDTH / 2), 0, BOX_DEPTH / 2], [BOX_WIDTH / 2, 0, -(BOX_DEPTH / 2)], [-(BOX_WIDTH / 2), 0, -(BOX_DEPTH / 2)]]) {
        group.add(block({ x, y, z }))
    }

    // right turret
    for (const [x, y, z] of [[-BOX_WIDTH, -BOX_HEIGHT, -BOX_DEPTH], [-BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 2)], [-BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 3)], [-BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 4)],]) {
        group.add(block({ x, y, z }))
    }

    // left turret
    for (const [x, y, z] of [[BOX_WIDTH, -BOX_HEIGHT, -BOX_DEPTH], [BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 2)], [BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 3)], [BOX_WIDTH, -BOX_HEIGHT, -(BOX_DEPTH * 4)],]) {
        group.add(block({ x, y, z }))
    }

    // the ball
    group.add(ball({ x: 0, y: 0, z: -(BOX_DEPTH * 4) }))
    return group
}

/**
 * @param {THREE.Group} starship 
 */
export const getStarshipBall = (starship) => {
    return starship.getObjectByName(STARSHIP_BALL_NAME)
}
export const getStarshipFlash = (starship) => {
    return starship.getObjectByName(STARSHIP_FLASH_NAME)
} 
