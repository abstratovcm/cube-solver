import { MeshBasicMaterial, BackSide } from 'three';

class HighlightManager {
  constructor() {
    this.selectedObject = null;
    this.originalMaterial = null;
    this.highlightMaterial = new MeshBasicMaterial({ color: 0xffffff, side: BackSide });
  }

  setHighlight(object) {
    if (this.selectedObject) {
      this.removeHighlight();
    }

    if (object && object.userData && object.userData.cube) {
      this.selectedObject = object.userData.cube.group;
      this.originalMaterial = [];
      this.selectedObject.children.forEach(child => {
        this.originalMaterial.push(child.material);
        child.material = this.highlightMaterial;
      });
    }
  }
  
  removeHighlight() {
    if (this.selectedObject && this.originalMaterial) {
      this.selectedObject.children.forEach((child, idx) => {
        child.material = this.originalMaterial[idx];
      });
      this.selectedObject = null;
      this.originalMaterial = null;
    }
  }
  
}

export default HighlightManager;
