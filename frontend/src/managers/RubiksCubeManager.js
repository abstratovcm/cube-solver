import RubiksCube from '../elements/RubiksCube';

export function createRubiksCube() {
    return new RubiksCube();
}

export function updateRubiksCube(rubiksCube) {
    if (rubiksCube) {
        rubiksCube.update();
    }
}
