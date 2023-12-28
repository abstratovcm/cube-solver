import { Group } from 'three';
import Cube from './Cube';

class RubiksCube {
    constructor() {
        this.mesh = new Group();

        const cubeSize = 0.5;
        const spacing = 0.1;

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    const cube = new Cube(cubeSize);
                    cube.group.position.set(
                        (cubeSize + spacing) * (x - 1),
                        (cubeSize + spacing) * (y - 1),
                        (cubeSize + spacing) * (z - 1)
                    );
                    this.mesh.add(cube.group);
                }
            }
        }
    }

    update() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
}

export default RubiksCube;
