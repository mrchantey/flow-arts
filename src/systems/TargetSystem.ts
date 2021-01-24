import { Not, SystemQueries } from "ecsy";
import { BabySystem, Scene as SceneComp, Camera as CameraComp, iLineSystemOptions, DebugLines, QuaternionExt, AdvancedPlane, MatrixExt, Vector3Ext, Color4Ext, MeshBuilderExt, Vector2Ext, MathExt } from "ecsy-baby"
import { Player } from "../components/Player";
import { Color3, Color4, Matrix, Mesh, MeshBuilder, StandardMaterial, Vector3, Plane, Nullable, LinesMesh, FreeCamera, Quaternion, Scene } from 'babylonjs';
import { iLinearTarget, LinearTarget } from "../components/LinearTarget";
import { RadialTarget } from "../components/RadialTarget";
import { createLinearTarget, createRadialTarget, resetLinearTarget, resetRadialTarget } from "../utility/targetUtility";



export class TargetSystem extends BabySystem {
	execute() {
		const scene = this.getSingletonComponent(SceneComp).scene
		const debugLines = this.getMutableSingletonComponent(DebugLines)
		this.queries.playerNoTarget.results.forEach(entity => {
			const player = entity.getMutableComponent(Player)!
			if (Math.random() >= 0.5) {
				const target = createLinearTarget(scene)
				resetLinearTarget(player, target)
				entity.addComponent(LinearTarget, target)
			} else {
				const target = createRadialTarget(scene)
				resetRadialTarget(player, target)
				entity.addComponent(RadialTarget, target)
			}
		})

		this.queries.playerWithLinearTarget.results.forEach(entity => {
			const player = entity.getMutableComponent(Player)!
			const target = entity.getMutableComponent(LinearTarget)!
			const playerLocalPos = Vector3.TransformCoordinates(player.transform.position, target.worldToLocal)
			let normalScore = playerLocalPos.x / target.scale
			if (normalScore > 1) {
				player.score++
				// resetLinearTarget(player.transform.position, player.plane, target)
				target.guides.instance!.dispose()
				entity.removeComponent(LinearTarget)
			} else {
				target.guides.colors!.forEach(arr => arr.forEach(col => col.a = MathExt.clamp(normalScore, 0.2, 1)))
				MeshBuilderExt.redrawLineSystem(target.guides)
			}
		})
		this.queries.playerWithRadialTarget.results.forEach(entity => {
			const player = entity.getMutableComponent(Player)!
			const target = entity.getMutableComponent(RadialTarget)!
			const playerLocalPos = Vector3.TransformCoordinates(player.transform.position, target.worldToLocal)
			let normalScore = (Vector2Ext.toPolar(Vector3Ext.toVector2XY(playerLocalPos)).theta + MathExt.PI) / MathExt.TWO_PI
			// let normalScore = playerLocalPos.x / target.scale
			// console.log(normalScore);

			if (normalScore > 0.8) {
				player.score++
				// resetLinearTarget(player.transform.position, player.plane, target)
				target.guides.instance!.dispose()
				entity.removeComponent(RadialTarget)
			} else {
				target.guides.colors!.forEach(arr => arr.forEach(col => col.a = MathExt.clamp(normalScore, 0.2, 1)))
				MeshBuilderExt.redrawLineSystem(target.guides)
			}
		})
	}

	static queries: SystemQueries = {
		playerNoTarget: {
			components: [Player, Not(LinearTarget), Not(RadialTarget)]
		},
		playerWithLinearTarget: {
			components: [Player, LinearTarget]
		},
		playerWithRadialTarget: {
			components: [Player, RadialTarget]
		},
	}
}