import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export function initializeScene() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    
    return { scene, camera, renderer };
}
