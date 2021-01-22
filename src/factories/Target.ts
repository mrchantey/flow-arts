import { MeshBuilder, Vector3, Plane, Scene } from "babylonjs";
import { Entity } from "ecsy";
import { BabyWorld } from "ecsy-baby";
import { Target } from "../components/Target";
import { iLinesSystemOptions } from "../types/types";
import { getRandomTargetType } from "../utility/TargetTypes";



export function createTarget(world: BabyWorld, scene: Scene): Entity {
	const scale = 1

	const targetType = getRandomTargetType()
	const guides: iLinesSystemOptions = {
		lines: [
			[Vector3.Zero(), Vector3.Zero()],
			[Vector3.Zero(), Vector3.Zero()],
		],
		updatable: true
	}

	targetType.modifyLines(guides.lines, scale)
	const guidesInstance = MeshBuilder.CreateLineSystem("guides", guides, scene)
	guides.instance = guidesInstance

	return world.createEntity("target")
		.addComponent(Target, {
			guides,
			scale,
			targetType
		})
}