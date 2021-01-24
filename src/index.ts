
import { Color4, Vector3, FreeCamera, Scene, Vector2, ArcRotateCamera, Matrix, UniversalCamera, TargetCamera, } from 'babylonjs';
import { DebugLines, initialize } from 'ecsy-baby';
import { Grid } from './components/Grid';
import { GridSystem } from './systems/GridSystem';
import { UISystem } from './systems/UISystem';
import { Player } from './components/Player';
import { UI } from './components/UI';
import { createPlayer } from './factories/Player';
import { PlayerMoveSystem } from './systems/PlayerMoveSystem';
import { TestSystem } from './systems/TestSystem';
import { LinearTarget } from './components/LinearTarget';
import { RadialTarget } from './components/RadialTarget';
import { TargetSystem } from './systems/TargetSystem';
import { PlayerTrail } from './components/PlayerTrail';

const components = [
	Grid,
	LinearTarget,
	RadialTarget,
	Player,
	PlayerTrail,
	UI
]

const systems = [
	GridSystem,
	PlayerMoveSystem,
	TestSystem,
	TargetSystem,
	// LinearTargetSystem,
	UISystem
]

function createCamera(scene: Scene, canvas: HTMLCanvasElement) {
	const cam = new TargetCamera("camera", new Vector3(0, 0.5, -7), scene)
	// cam.attachControl(canvas)
	return cam
}
const { world, scene } = initialize({ antialias: false, start: false, createCamera, components, systems })
// const { world, scene, camera } = initialize({ antialias: false, start: false, components, systems })
scene.clearColor = new Color4(0, 0, 0, 1);

// const cam = (<ArcRotateCamera>camera)
// cam.useAutoRotationBehavior = true
// cam.autoRotationBehavior!.idleRotationSpeed = 0.1

createPlayer(world, scene)
// createLinearTarget(
// 	// createTarget(world, scene)


world.start()


// const x = new Matrix

// x.


// world.onExecute = (delta, time) => {
	// (<ArcRotateCamera>camera). .y += 0.1

// }
// 