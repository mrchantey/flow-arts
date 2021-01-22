
import { Color4, Vector3, FreeCamera, Scene, } from 'babylonjs';
import { initialize } from 'ecsy-baby';
import { Grid } from './components/Grid';
import { GridSystem } from './systems/GridSystem';
import { ApproachTargetSystem } from './systems/ApproachTargetSystem';
import { UISystem } from './systems/UISystem';
import { Player } from './components/Player';
import { UI } from './components/UI';
import { Target } from './components/Target';
import { createPlayer } from './factories/Player';
import { createTarget } from './factories/Target';
import { PlayerMoveSystem } from './systems/PlayerMoveSystem';

const components = [Grid, Player, Target, UI]

const systems = [GridSystem, PlayerMoveSystem, ApproachTargetSystem, UISystem]

function createCamera(scene: Scene, canvas: HTMLCanvasElement) {
	return new FreeCamera("camera", Vector3.Backward().scale(5), scene)
}
const { world, scene } = initialize({ antialias: false, start: false, createCamera, components, systems })
scene.clearColor = new Color4(0, 0, 0, 1)



createPlayer(world, scene)
createTarget(world, scene)
world.start()
