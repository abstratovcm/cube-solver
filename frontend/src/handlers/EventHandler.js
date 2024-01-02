class EventHandler {
  static isMouseDown = false;
  static mouseDownTime = 0;
  static startPosition = { x: 0, y: 0 };
  static currentPosition = { x: 0, y: 0 };

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

  static onMouseDown(event) {
    EventHandler.isMouseDown = true;
    EventHandler.mouseDownTime = Date.now();
    EventHandler.startPosition = { x: event.clientX, y: event.clientY };
  }

  static onMouseUp(event, mouse, raycaster, camera, scene, highlightManager) {
    EventHandler.isMouseDown = false;
    const duration = Date.now() - EventHandler.mouseDownTime;
    if (duration < 200) {
        EventHandler.onClick(event, mouse, raycaster, camera, scene, highlightManager);
    } else {
        EventHandler.onHold(event, highlightManager);
    }
  }

  static onMouseMove(event) {
    if (!this.isMouseDown) return;
    EventHandler.currentPosition = { x: event.clientX, y: event.clientY };
    // Here you can continuously check for direction during movement
  }

  static onHold(event, highlightManager) {
    const dx = EventHandler.currentPosition.x - EventHandler.startPosition.x;
    const dy = EventHandler.currentPosition.y - EventHandler.startPosition.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        // Moved right
      } else {
        // Moved left
      }
    } else {
      if (dy > 0) {
        // Moved down
      } else {
        // Moved up
      }
    }
  }
}

export default EventHandler;