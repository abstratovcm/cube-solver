import * as THREE from 'three';
import { onDocumentMouseClick, onWindowResize } from '../handlers/EventHandlers';

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
        document.addEventListener('click', (e) => onDocumentMouseClick(
            e, this.mouse, this.raycaster,
            this.camera, this.scene, this.highlightManager
        ), false);
        window.addEventListener('resize', () => onWindowResize(this.camera, this.renderer), false);
    }
}

export default EventManager;