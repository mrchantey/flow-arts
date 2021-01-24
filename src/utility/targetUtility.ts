import { Vector3, MeshBuilder, Matrix } from "babylonjs"
import { Scene } from "babylonjs/scene"
import { Entity } from "ecsy"
import { AdvancedPlane, Vector2Ext, Vector3Ext, MathExt, QuaternionExt, MatrixExt, MeshBuilderExt, iLineSystemOptions, Color4Ext } from "ecsy-baby"
import { iLinearTarget } from "../components/LinearTarget"
import { Player } from "../components/Player"
import { iRadialTarget } from "../components/RadialTarget"



export function createLinearTarget(scene: Scene) {
	const guides: iLineSystemOptions = {
		lines: [
			[Vector3.Zero(), Vector3.Zero()],
			[Vector3.Zero(), Vector3.Zero()]
		],
		colors: [
			[Color4Ext.Green(), Color4Ext.Green()],
			[Color4Ext.Clear(), Color4Ext.Green()],
		],
		updatable: true
	}
	guides.instance = MeshBuilder.CreateLineSystem("guides", guides, scene)
	const target: iLinearTarget = {
		guides,
		localToWorld: new Matrix(),
		worldToLocal: new Matrix()
	}
	return target
}

function getTargetDirection(player: Player) {
	const playerDeltaPos = player.transform.position.subtract(player.plane.origin)
	let direction: number
	if (playerDeltaPos.length() > 1)
		direction = Vector2Ext.toPolar(Vector3Ext.toVector2XY(playerDeltaPos.scale(-1))).theta
	else
		direction = Math.random() * MathExt.TWO_PI

	// console.log(direction);
	direction = MathExt.roundToNearest(direction, MathExt.QUARTER_PI)
	// console.log(direction);
	return direction
}


export function resetLinearTarget(player: Player, target: iLinearTarget) {
	const direction = getTargetDirection(player)
	const targetPos = Vector3Ext.roundToNearest(player.transform.position, 0.2)
	target.scale = 1
	const targetRot = QuaternionExt.angleAxis(direction, player.plane.normal)

	MatrixExt.fromPositionedQuaternionToRef(targetPos, targetRot, target.localToWorld)
	target.localToWorld.invertToRef(target.worldToLocal)
	target.guides.lines[0] = [new Vector3(target.scale, -target.scale, 0), new Vector3(target.scale, target.scale, 0)]
	target.guides.lines[1] = [new Vector3(0, 0, 0), new Vector3(target.scale, 0, 0)]
	MeshBuilderExt.redrawLineSystem(target.guides)
	target.guides.instance!.rotationQuaternion = targetRot
	target.guides.instance!.position = targetPos
}

export function createRadialTarget(scene: Scene) {
	const guides: iLineSystemOptions = {
		lines: [
			[Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero()]
		],
		colors: [
			[Color4Ext.Green(), Color4Ext.Green(), Color4Ext.Green(), Color4Ext.Green(), Color4Ext.Green(), Color4Ext.Green()]
		],
		updatable: true,
	}
	guides.lines[0].push(guides.lines[0][0])
	guides.colors![0].push(guides.colors![0][0])
	guides.instance = MeshBuilder.CreateLineSystem("guides", guides, scene)
	const target: iRadialTarget = {
		guides,
		localToWorld: new Matrix(),
		worldToLocal: new Matrix()
	}
	return target
}



export function resetRadialTarget(player: Player, target: iLinearTarget) {
	const direction = getTargetDirection(player)
	const targetRot = QuaternionExt.angleAxis(direction, player.plane.normal)


	const targetPos = Vector3Ext.roundToNearest(player.transform.position, 0.2)
	target.scale = Math.random() + 0.5

	MatrixExt.fromPositionedQuaternionToRef(targetPos, targetRot, target.localToWorld)
	target.localToWorld.invertToRef(target.worldToLocal)

	const numPoints = target.guides.lines[0].length - 1 //
	const dTheta = MathExt.TWO_PI / numPoints
	for (let i = 0; i < numPoints; i++) {
		const theta = i * dTheta
		target.guides.lines[0][i].copyFrom(Vector2Ext.toVec3XY(Vector2Ext.fromPolar(theta, target.scale)))
	}
	MeshBuilderExt.redrawLineSystem(target.guides)
	target.guides.instance!.rotationQuaternion = targetRot
	target.guides.instance!.position = targetPos
}