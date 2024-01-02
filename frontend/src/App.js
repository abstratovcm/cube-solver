import SceneManager from './managers/SceneManager';

class App {
  constructor(containerId) {
    this.sceneManager = new SceneManager();
    this.sceneManager.initialize();

    const renderer = this.sceneManager.currentScene.renderer;
    document.getElementById(containerId).appendChild(renderer.domElement);

    this.startAnimationLoop();
  }

  startAnimationLoop = () => {
    const animate = () => {
      requestAnimationFrame(animate);

      this.sceneManager.update();

      this.sceneManager.render();
    };
    animate();
  }
}

export default App;
