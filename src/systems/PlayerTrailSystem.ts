import { SystemQueries } from "ecsy";
import { BabySystem } from "ecsy-baby"
import { PlayerTrail } from "../components/PlayerTrail";

export class PlayerTrailSystem extends BabySystem {
	execute() {

		//on removed
		this.queries.entities.results.forEach(entity => {
			const trail = entity.getMutableComponent(PlayerTrail)!
			// player.trailOptions.points.unshift(player.lastAnchor)
			// player.trailOptions.points.pop()
			// player.lastAnchor = player.transform.position

			// MeshBuilderExt.redrawLines(player.trailOptions)

		})
		//else
		// else {
		// 	player.trailOptions.points[0] = player.transform.position
		// }

	}

	static queries: SystemQueries = {
		entities: {
			//on target removed
			components: [PlayerTrail]
		}
	}
}