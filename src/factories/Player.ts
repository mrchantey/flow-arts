import { MeshBuilder, StandardMaterial, Color3, Vector3, Color4, Scene, Plane } from "babylonjs";
import { Entity } from "ecsy";
import { BabyWorld } from "ecsy-baby";
import { Player } from "../components/Player";
import { iLineOptions, AdvancedPlane } from "ecsy-baby";
import { PlayerTrail } from "../components/PlayerTrail";

export function createPlayer(world: BabyWorld, scene: Scene): Entity {

	const gizmo = MeshBuilder.CreateBox("box", { size: 0.1 }, scene)
	const mat = new StandardMaterial("mat", scene)
	mat.diffuseColor = new Color3(1, 0, 0)
	mat.specularColor = new Color3(1, 0, 1)
	gizmo.material = mat

	let score = 0

	const trailPoints = [Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(),]

	const trailOptions: iLineOptions = {
		points: trailPoints,
		colors: [new Color4(1, 0, 0, 1), new Color4(1, 1, 0, 1), new Color4(0, 1, 0, 1), new Color4(0, 1, 1, 1), new Color4(0, 0, 1, 1), new Color4(1, 0, 1, 1),],
		updatable: true,
	}

	let lines = MeshBuilder.CreateLines("path", trailOptions, scene)
	trailOptions.instance = lines
	const plane = new AdvancedPlane(Vector3.Zero(), Vector3.Forward())


	const entity = world.createEntity("player")
		.addComponent(Player, {
			transform: gizmo,
			score,
			plane
		})
		.addComponent(PlayerTrail, {
			trailOptions
		})

	return entity
}