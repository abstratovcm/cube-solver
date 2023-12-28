import { PlaneGeometry, MeshBasicMaterial, Mesh, BackSide } from 'three';

class Face {
  constructor(size, color) {
    const geometry = new PlaneGeometry(size, size);
    const material = new MeshBasicMaterial({ color, side: BackSide });
    this.mesh = new Mesh(geometry, material);
  }
}

export default Face;