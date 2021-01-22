import { Matrix } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem, Camera, Scene } from "ecsy-baby"
import { Player } from "../components/Player";

export class PlayerMoveSystem extends BabySystem {
	execute() {

		const scene = this.getSingletonComponent(Scene).scene
		const camera = this.getSingletonComponent(Camera).camera


		this.queries.entities.results.forEach(entity => {
			const player = entity.getMutableComponent(Player)!
			const playerPos = player.transform.position
			const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)
			player.transform.rotation.y += 0.01

			const dist = ray.intersectsPlane(player.plane)
			if (dist == null) return
			const pos = ray.origin.add(ray.direction.scale(dist))
			player.transform.position = pos

		})
	}

	static queries: SystemQueries = {
		entities: {
			components: [Player]
		}
	}
}