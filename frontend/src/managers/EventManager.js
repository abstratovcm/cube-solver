import * as THREE from 'three';
import EventHandler from '../handlers/EventHandler';

class EventManager {
    constructor(camera, renderer, raycaster, scene, highlightManager) {
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = raycaster;
        this.scene = scene;
        this.highlightManager = highlightManager;
        this.mouse = new THREE.Vector2();

        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('mouseup', (e) => EventHandler.onMouseUp(
            e, this.mouse, this.raycaster,
            this.camera, this.scene, this.highlightManager
        ), false);
        document.addEventListener('mousedown', EventHandler.onMouseDown, false);
        document.addEventListener('mousemove', EventHandler.onMouseMove, false);
        window.addEventListener('resize', () => EventHandler.onWindowResize(this.camera, this.renderer), false);
    }
}

export default EventManager;