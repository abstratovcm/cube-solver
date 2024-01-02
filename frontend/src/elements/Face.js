import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

class Face {
  constructor(size, color) {
    const geometry = new PlaneGeometry(size, size);
    const material = new MeshBasicMaterial({ color, side: DoubleSide });
    this.mesh = new Mesh(geometry, material);
  }
}

export default Face;