class BaseEventManager {
    constructor(scene) {
        this.scene = scene;
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize);
    }

    removeEventListeners() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.scene.camera.aspect = window.innerWidth / window.innerHeight;
        this.scene.camera.updateProjectionMatrix();
        this.scene.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

export default BaseEventManager;
