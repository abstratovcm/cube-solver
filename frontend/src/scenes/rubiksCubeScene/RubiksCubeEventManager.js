import RubiksCubeMouseHandler from './RubiksCubeMouseHandler';
import BaseEventManager from '../../managers/BaseEventManager';

class RubiksCubeEventManager extends BaseEventManager {
    constructor(scene) {
        super(scene);

        this.mouseHandler = new RubiksCubeMouseHandler(scene);
    }

    addEventListeners() {
        super.addEventListeners();
        document.addEventListener('mouseup', this.mouseHandler.onMouseUp);
        document.addEventListener('mousedown', this.mouseHandler.onMouseDown);
        document.addEventListener('mousemove', this.mouseHandler.onMouseMove);
    }

    removeEventListeners() {
        super.removeEventListeners();
        document.removeEventListener('mouseup', this.mouseHandler.onMouseUp);
        document.removeEventListener('mousedown', this.mouseHandler.onMouseDown);
        document.removeEventListener('mousemove', this.mouseHandler.onMouseMove);
    }
}

export default RubiksCubeEventManager;