import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer, Raycaster } from 'three';
import RubiksCube from '../../elements/RubiksCube';
import RubiksCubeHighlighter from '../../highlights/RubiksCubeHighlighter';
import RubiksCubeEventManager from './RubiksCubeEventManager';

class RubiksCubeScene extends Scene {
    constructor() {
        super();
        this.initializeScene();
    }

    initializeScene() {
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.rubiksCube = new RubiksCube();
        this.add(this.rubiksCube.group);

        this.mouse = new THREE.Vector2();
    }

    activate() {
        this.highlightManager = new RubiksCubeHighlighter();
        this.raycaster = new Raycaster();
        this.eventManager = new RubiksCubeEventManager(this);
        this.eventManager.addEventListeners();
    }

    deactivate() {
        if (this.eventManager) {
            this.eventManager.removeEventListeners();
        }
    }

    update() {
        if (this.rubiksCube) {
            this.rubiksCube.group.rotation.x += 0.01;
            this.rubiksCube.group.rotation.y += 0.01;
        }
    }

    render() {
        this.renderer.render(this, this.camera);
    }
}

export default RubiksCubeScene;
