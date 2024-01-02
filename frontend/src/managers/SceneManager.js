import RubiksCubeScene from '../scenes/rubiksCubeScene/RubiksCubeScene';
// Import other scenes as needed

class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    initialize() {
        this.scenes['RubiksCubeScene'] = new RubiksCubeScene();

        this.switchScene('RubiksCubeScene');
    }

    switchScene(sceneName) {
        if (this.currentScene && this.currentScene.deactivate) {
            this.currentScene.deactivate();
        }

        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName];
            if (this.currentScene.activate) {
                this.currentScene.activate();
            }
        } else {
            console.warn(`Scene '${sceneName}' not found`);
        }
    }

    update() {
        if (this.currentScene && this.currentScene.update) {
            this.currentScene.update();
        }
    }

    render() {
        if (this.currentScene && this.currentScene.render) {
            this.currentScene.render();
        }
    }
}

export default SceneManager;
