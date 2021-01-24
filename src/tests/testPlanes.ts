import { Vector3 } from "babylonjs"
import { BabyWorld, DebugLines, Color4Ext, AdvancedPlane, Vector2Ext, MathExt } from "ecsy-baby"


export function testPlanes(world: BabyWorld, time: number) {

	const debugLines = world.entity.getMutableComponent(DebugLines)!
	const scale = 3
	const theta = time * MathExt.TWO_PI * 0.1

	const sin = Math.sin(theta) * 0.5 + 0.5

	const dir = Vector2Ext.fromPolar(theta)

	// const dir = Vector2Ext.Right()
	const origin = Vector3.Zero()


	// const plane = Plane.FromPositionAndNormal(Vector3.Zero(), Vec3.forward())

	// console.dir(plane1.toString());
	// const newPos = plane1.PointOnPlane(dir.toVec3XZ())
	debugLines.addLine(Vector3.Zero(), Vector3.Forward(), Color4Ext.Blue())
	debugLines.addLine(Vector3.Zero(), Vector3.Right(), Color4Ext.Red())
	debugLines.addLine(Vector3.Zero(), Vector3.Up(), Color4Ext.Green())

	const plane1 = new AdvancedPlane(Vector3.Right(), new Vector3(0, 1, 0))
	debugLines.addLine(plane1.origin, plane1.origin.add(plane1.normal), Color4Ext.Blue())
	debugLines.addLine(plane1.origin, plane1.origin.add(plane1.tangent), Color4Ext.Red())
	debugLines.addLine(plane1.origin, plane1.origin.add(plane1.bitangent), Color4Ext.Green())


	// const plane2 = new AdvancedPlane(Vector3.left(), new Vector3(0.1, 1, sin))
	const plane2 = new AdvancedPlane(Vector3.Left(), Vector3.Right())
	debugLines.addLine(plane2.origin, plane2.origin.add(plane2.normal), Color4Ext.Blue())
	debugLines.addLine(plane2.origin, plane2.origin.add(plane2.tangent), Color4Ext.Red())
	debugLines.addLine(plane2.origin, plane2.origin.add(plane2.bitangent), Color4Ext.Green())

}