import { SystemQueries } from "ecsy";
import { BabySystem, Scene as SceneComp, Camera as CameraComp } from "ecsy-baby"
import { Player } from "../components/Player";

import { Color3, Color4, Matrix, Mesh, MeshBuilder, StandardMaterial, Vector3, Plane, Nullable, LinesMesh, FreeCamera } from 'babylonjs';
import { iLineOptions } from "../types/types";
import { Target } from "../components/Target";
import { getRandomTargetType } from "../utility/TargetTypes";


export class ApproachTargetSystem extends BabySystem {


	execute() {


		const targets = this.queries.targets.results

		if (targets.length === 0)
			return

		const targetEntity = targets[0]
		const target = targetEntity.getMutableComponent(Target)!

		this.queries.entities.results.forEach(entity => {

			const player = entity.getMutableComponent(Player)!

			const pos = player.transform.position

			const dist = target.targetType.getScore(pos, target.guides.instance!.position, target.scale)

			const col = new Color3(0, 0, dist);
			(<any>player.transform).material.diffuseColor = col

			if (dist > 1) {
				player.score++
				// player.scoreText.text = `score: ${score}`
				// options.points[0].x += 0.1
				player.trailOptions.points.unshift(player.lastAnchor)
				player.trailOptions.points.pop()
				MeshBuilder.CreateLines("lines", player.trailOptions)
				player.lastAnchor = pos
				target.guides.instance!.position = pos
				console.log(target.targetType.name);
				target.targetType = getRandomTargetType()
				console.log(target.targetType.name);

				target.targetType.modifyLines(target.guides.lines, target.scale);
				(<any>MeshBuilder).CreateLineSystem("guides", target.guides)
				// target.guides.lines
				// targetEntity.remove()
			} else {
				player.trailOptions.points[0] = pos
				MeshBuilder.CreateLines("lines", player.trailOptions)
			}
			// console.log(`${pos.x.toFixed(2)},${pos.y.toFixed(2)}`);


		})
	}

	static queries: SystemQueries = {
		entities: {
			components: [Player]
		},
		targets: {
			components: [Target]
		}
	}
}