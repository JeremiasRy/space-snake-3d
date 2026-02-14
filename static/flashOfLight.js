import * as THREE from "three"

/**
 * @typedef {Object} FlashOfLight
 * @property {State} state
 * @property {number} intensity
 */

/**
 * @typedef {Object} Vector3
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */


const glowTexture = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');

    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 150, 50, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
})()

/**
 * 
 * @param {Vector3} param0 
 * @returns 
 */
export const createFlashSprite = ({ x, y, z }) => {
    const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0,
        depthWrite: false
    });

    const flashSprite = new THREE.Sprite(material);
    flashSprite.position.set(x, y, z);
    return flashSprite
}
