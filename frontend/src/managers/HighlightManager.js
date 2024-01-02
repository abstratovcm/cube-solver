import { MeshBasicMaterial, DoubleSide } from 'three';

class HighlightManager {
  constructor() {
    this.selectedCubes = [];
    this.highlightMaterial = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide });
  }

  setPlaneHighlight(face) {
    this.removeHighlights();

    if (face && face.userData && face.userData.cube) {
      const selectedCube = face.userData.cube.group;
      const selectedCubePosition = selectedCube.position;
      const rubiksCube = selectedCube.userData.rubiksCube.group;
      rubiksCube.children.forEach(cube => {
        const cubePosition = cube.position;
        if (cubePosition.x === selectedCubePosition.x) {
          cube.children.forEach(face => {
            face.userData.originalMaterial = face.material;
            face.material = this.highlightMaterial;
          });
          this.selectedCubes.push(cube);
        }
      });
    }
  }

  setHighlight(face) {
    this.removeHighlights();

    if (face && face.userData && face.userData.cube) {
      const selectedCube = face.userData.cube.group;
      selectedCube.children.forEach(face => {
        face.userData.originalMaterial = face.material;
        face.material = this.highlightMaterial;
      });
      this.selectedCubes.push(selectedCube);
    }
  }

  removeHighlights() {
    this.selectedCubes.forEach(cube => {
      cube.children.forEach(face => {
        if (face.userData.originalMaterial) {
          face.material = face.userData.originalMaterial;
          delete face.userData.originalMaterial;
        }
      });
    });
    this.selectedCubes = [];
  }
}

export default HighlightManager;
