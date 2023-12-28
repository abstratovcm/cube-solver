import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight } from 'three';
import RubiksCube from './elements/RubiksCube';

class App {
  constructor(containerId) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById(containerId).appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    this.init();
  }

  init() {
    this.rubiksCube = new RubiksCube();
    this.scene.add(this.rubiksCube.mesh);

    this.animate();
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
