import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer, Raycaster, Vector2 } from 'three';
import RubiksCube from './elements/RubiksCube';
import HighlightManager from './utils/HighlightManager';

class App {
  constructor(containerId) {
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.highlightManager = new HighlightManager();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById(containerId).appendChild(this.renderer.domElement);

    document.addEventListener('click', this.onDocumentMouseClick, false);
    window.addEventListener('resize', this.onWindowResize, false);

    this.camera.position.z = 5;

    this.init();
  }

  init() {
    this.rubiksCube = new RubiksCube();
    this.scene.add(this.rubiksCube.mesh);

    this.animate();
  }

  onDocumentMouseClick = (event) => {
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      this.highlightManager.setHighlight(intersects[0].object);
    }
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if (this.rubiksCube) {
      this.rubiksCube.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export default App;
