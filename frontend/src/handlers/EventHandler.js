import * as THREE from 'three';

// TODO: Modularize this class

class EventHandler {
  static isMouseDown = false;
  static mouseDownTime = 0;
  static startPosition = { x: 0, y: 0 };
  static currentPosition = { x: 0, y: 0 };
  static centerOfRotation = new THREE.Vector3();
  static rotationAxis = new THREE.Vector3(1, 0, 0); // Default axis, can be changed
  static totalRotation = 0;

  static onClick(event, mouse, raycaster, camera, scene, highlightManager) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      highlightManager.setHighlight(intersects[0].object);
    }
  }

  static onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // TODO: setPlaneHighlight shouldn't be called here
  static onMouseDown(event, mouse, raycaster, camera, scene, highlightManager) {
    EventHandler.isMouseDown = true;
    EventHandler.mouseDownTime = Date.now();
    EventHandler.startPosition = { x: event.clientX, y: event.clientY };

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      highlightManager.setPlaneHighlight(intersects[0].object);
    }
  }

  static onMouseUp(event, mouse, raycaster, camera, scene, highlightManager) {
    EventHandler.isMouseDown = false;
    const duration = Date.now() - EventHandler.mouseDownTime;
    if (duration < 200) {
      EventHandler.onClick(event, mouse, raycaster, camera, scene, highlightManager);
    } else {
      EventHandler.onRelease(highlightManager);
    }
  }

  static onMouseMove(event, highlightManager) {
    if (!EventHandler.isMouseDown) return;

    const duration = Date.now() - EventHandler.mouseDownTime;
    if (duration >= 200) {
      EventHandler.onHold(event, highlightManager);
    }
  }

  static applyRotationToCubes(cubes, rotationAngle, centerOfRotation, rotationAxis) {
    cubes.forEach(cube => {
      let relativePosition = new THREE.Vector3().subVectors(cube.position, centerOfRotation);

      let quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(rotationAxis, rotationAngle);

      relativePosition.applyQuaternion(quaternion);

      cube.position.addVectors(relativePosition, centerOfRotation);

      cube.quaternion.premultiply(quaternion);
    });
  }

  static onHold(event, highlightManager) {
    EventHandler.currentPosition = { x: event.clientX, y: event.clientY };

    const dx = EventHandler.currentPosition.x - EventHandler.startPosition.x;
    const dy = EventHandler.currentPosition.y - EventHandler.startPosition.y;

    let centerOfRotation = new THREE.Vector3();
    highlightManager.selectedCubes.forEach(cube => {
      centerOfRotation.add(cube.position);
    });
    centerOfRotation.divideScalar(highlightManager.selectedCubes.length);

    // Determine rotation axis - assuming x-axis for the moment
    let rotationAxis = new THREE.Vector3(1, 0, 0);

    const rotationDirection = (dx > 0) ? 1 : -1;
    const rotationMagnitude = Math.sqrt(dx * dx + dy * dy);

    const incrementalRotation = rotationDirection * rotationMagnitude * (Math.PI / 180);
    EventHandler.totalRotation += incrementalRotation;

    EventHandler.centerOfRotation.copy(centerOfRotation);
    EventHandler.rotationAxis.copy(rotationAxis);

    this.applyRotationToCubes(highlightManager.selectedCubes, incrementalRotation, centerOfRotation, rotationAxis);

    EventHandler.startPosition = EventHandler.currentPosition;
  }

  static onRelease(highlightManager) {
    // Calculate the nearest 90-degree increment
    const nearest90Degree = Math.round(EventHandler.totalRotation / (Math.PI / 2)) * (Math.PI / 2);

    const adjustmentRotation = nearest90Degree - EventHandler.totalRotation;

    this.applyRotationToCubes(
      highlightManager.selectedCubes,
      adjustmentRotation,
      EventHandler.centerOfRotation,
      EventHandler.rotationAxis
    );
    // Reset totalRotation
    EventHandler.totalRotation = 0;
  }
}

export default EventHandler;