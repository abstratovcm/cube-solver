import * as THREE from 'three';

class RubiksCubeMouseHandler {
    constructor(scene) {
        this.scene = scene;
        this.isMouseDown = false;
        this.mouseDownTime = 0;
        this.startPosition = { x: 0, y: 0 };
        this.currentPosition = { x: 0, y: 0 };
        this.centerOfRotation = new THREE.Vector3();
        this.rotationAxis = new THREE.Vector3(1, 0, 0); // Default axis, can be changed
        this.totalRotation = 0;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseDownTime = Date.now();
        this.startPosition = { x: event.clientX, y: event.clientY };
        this.scene.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.scene.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.scene.raycaster.setFromCamera(this.scene.mouse, this.scene.camera);
        const intersects = this.scene.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            this.scene.highlightManager.setLayerHighlight(intersects[0].object);
        }
    }

    onMouseUp(event) {
        this.isMouseDown = false;
        const duration = Date.now() - this.mouseDownTime;
        if (duration < 200) {
            this.onClick(event);
        } else {
            this.onRelease();
        }
    }

    onMouseMove(event) {
        if (!this.isMouseDown) return;

        const duration = Date.now() - this.mouseDownTime;
        if (duration >= 200) {
            this.onHold(event);
        }
    }

    onClick(event) {
        event.preventDefault();

        this.scene.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.scene.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.scene.raycaster.setFromCamera(this.scene.mouse, this.scene.camera);
        const intersects = this.scene.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            this.scene.highlightManager.setCubeHighlight(intersects[0].object);
        }
    }

    onHold(event) {
        this.currentPosition = { x: event.clientX, y: event.clientY };

        const dx = this.currentPosition.x - this.startPosition.x;
        const dy = this.currentPosition.y - this.startPosition.y;

        let centerOfRotation = new THREE.Vector3();
        this.scene.highlightManager.selectedCubes.forEach(cube => {
            centerOfRotation.add(cube.position);
        });
        centerOfRotation.divideScalar(this.scene.highlightManager.selectedCubes.length);

        // Determine rotation axis - assuming x-axis for the moment
        let rotationAxis = new THREE.Vector3(1, 0, 0);

        const rotationDirection = (dx > 0) ? 1 : -1;
        const rotationMagnitude = Math.sqrt(dx * dx + dy * dy);

        const incrementalRotation = rotationDirection * rotationMagnitude * (Math.PI / 180);
        this.totalRotation += incrementalRotation;

        this.centerOfRotation.copy(centerOfRotation);
        this.rotationAxis.copy(rotationAxis);

        this.applyRotationToCubes(this.scene.highlightManager.selectedCubes, incrementalRotation, centerOfRotation, rotationAxis);

        this.startPosition = this.currentPosition;
    }

    onRelease() {
        // Calculate the nearest 90-degree increment
        const nearest90Degree = Math.round(this.totalRotation / (Math.PI / 2)) * (Math.PI / 2);

        const adjustmentRotation = nearest90Degree - this.totalRotation;

        this.applyRotationToCubes(
            this.scene.highlightManager.selectedCubes,
            adjustmentRotation,
            this.centerOfRotation,
            this.rotationAxis
        );
        // Reset totalRotation
        this.totalRotation = 0;
    }

    applyRotationToCubes(cubes, rotationAngle, centerOfRotation, rotationAxis) {
        cubes.forEach(cube => {
            let relativePosition = new THREE.Vector3().subVectors(cube.position, centerOfRotation);

            let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(rotationAxis, rotationAngle);

            relativePosition.applyQuaternion(quaternion);

            cube.position.addVectors(relativePosition, centerOfRotation);

            cube.quaternion.premultiply(quaternion);
        });
    }
}

export default RubiksCubeMouseHandler;
