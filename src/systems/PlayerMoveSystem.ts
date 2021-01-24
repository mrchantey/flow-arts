import { Matrix, Vector3 } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem, Camera, DebugLines, Keyboard, KeyValue, Mouse, Scene } from "ecsy-baby"
import { Player } from "../components/Player";

export class PlayerMoveSystem extends BabySystem {
	execute(delta: number) {

		const scene = this.getSingletonComponent(Scene).scene
		const camera = this.getSingletonComponent(Camera).camera
		const keyboard = this.getSingletonComponent(Keyboard)
		const mouse = this.getSingletonComponent(Mouse)

		const translateSpeed = 3 * delta
		if (keyboard.keysPressed[KeyValue.KEY_W] || keyboard.keysPressed[KeyValue.ArrowUp])
			camera.position.z += translateSpeed
		if (keyboard.keysPressed[KeyValue.KEY_S] || keyboard.keysPressed[KeyValue.ArrowDown])
			camera.position.z += -translateSpeed
		if (keyboard.keysPressed[KeyValue.KEY_A] || keyboard.keysPressed[KeyValue.ArrowLeft])
			camera.position.x += -translateSpeed
		if (keyboard.keysPressed[KeyValue.KEY_D] || keyboard.keysPressed[KeyValue.ArrowRight])
			camera.position.x += translateSpeed

		// console.log('pow');
		if (mouse.leftButtonHeld) {
			const dx = mouse.xnorm - mouse.xDownNorm
			const dy = mouse.ynorm - mouse.yDownNorm
			// console.log(mouse.xsign);
			camera.rotation.x += -dy * delta
			camera.rotation.y += dx * delta

		}


		this.queries.entities.results.forEach(entity => {
			const player = entity.getMutableComponent(Player)!
			const playerPos = player.transform.position
			const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)
			player.transform.rotation.y += 0.01

			const dist = ray.intersectsPlane(player.plane.babyPlane)
			if (dist == null) return
			const pos = ray.origin.add(ray.direction.scale(dist))
			player.transform.position = pos

			// const debugLines = this.getMutableSingletonComponent(DebugLines)
			// debugLines.addLine(Vector3.Zero(), pos)
			// debugLines.clearEachFrame = true

		})
	}

	static queries: SystemQueries = {
		entities: {
			components: [Player]
		}
	}
}