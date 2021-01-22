import { MeshBuilder, StandardMaterial, Color3, Vector3, Color4, Scene, Plane } from "babylonjs";
import { Entity } from "ecsy";
import { BabyWorld } from "ecsy-baby";
import { Player } from "../components/Player";
import { iLineOptions } from "../types/types";

export function createPlayer(world: BabyWorld, scene: Scene): Entity {

	const gizmo = MeshBuilder.CreateBox("box", { size: 0.1 }, scene)
	const mat = new StandardMaterial("mat", scene)
	mat.diffuseColor = new Color3(1, 0, 0)
	mat.specularColor = new Color3(1, 0, 1)
	gizmo.material = mat

	let lastAnchor = Vector3.Zero()

	let score = 0
	const anchorMax = 1

	const trailPoints = [Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(),]

	const trailOptions: iLineOptions = {
		points: trailPoints,
		colors: [new Color4(1, 0, 0, 1), new Color4(1, 1, 0, 1), new Color4(0, 1, 0, 1), new Color4(0, 1, 1, 1), new Color4(0, 0, 1, 1), new Color4(1, 0, 1, 1),],
		updatable: true,
	}

	let lines = MeshBuilder.CreateLines("path", trailOptions, scene)
	trailOptions.instance = lines
	const plane = Plane.FromPositionAndNormal(Vector3.Zero(), Vector3.Backward())


	const entity = world.createEntity("player")
		.addComponent(Player, {
			transform: gizmo,
			trailOptions,
			score,
			plane
		})

	return entity
}