import * as THREE from 'three';
import { initializeScene } from './scene/SceneSetup';
import { createRubiksCube, updateRubiksCube } from './managers/RubiksCubeManager';
import HighlightManager from './managers/HighlightManager';
import EventManager from './managers/EventManager';

class App {
  constructor(containerId) {
    const { scene, camera, renderer } = initializeScene();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.highlightManager = new HighlightManager();
    this.raycaster = new THREE.Raycaster();
    this.eventManager = new EventManager(this.camera, this.renderer, this.raycaster, this.scene, this.highlightManager);

    document.getElementById(containerId).appendChild(this.renderer.domElement);

    this.initRubiksCube();
    this.startAnimationLoop();
  }

  initRubiksCube() {
    this.rubiksCube = createRubiksCube();
    this.scene.add(this.rubiksCube.group);
  }

  startAnimationLoop = () => {
    const animate = () => {
      requestAnimationFrame(animate);
      updateRubiksCube(this.rubiksCube);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default App;
