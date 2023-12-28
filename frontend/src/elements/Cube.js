import { Group } from 'three';
import Face from './Face';

class Cube {
  constructor(size) {
    this.group = new Group();

    const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc'];

    for (let i = 0; i < 6; i++) {
      const face = new Face(size, colors[i]);

      switch(i) {
        case 0: // front
          face.mesh.rotation.y = -Math.PI;
          face.mesh.position.z = size / 2;
          break;
        case 1: // back
          face.mesh.rotation.y = Math.PI;
          face.mesh.position.z = -size / 2;
          break;
        case 2: // top
          face.mesh.rotation.x = Math.PI / 2;
          face.mesh.position.y = size / 2;
          break;
        case 3: // bottom
          face.mesh.rotation.x = -Math.PI / 2;
          face.mesh.position.y = -size / 2;
          break;
        case 4: // right
          face.mesh.rotation.y = -Math.PI / 2;
          face.mesh.position.x = size / 2;
          break;
        case 5: // left
          face.mesh.rotation.y = Math.PI / 2;
          face.mesh.position.x = -size / 2;
          break;
      }
      face.mesh.userData.cube = this;
      this.group.add(face.mesh);
    }
  }
}

export default Cube;
