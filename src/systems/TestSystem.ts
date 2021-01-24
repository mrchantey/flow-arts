import { Color4, Matrix, Quaternion, Vector3 } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem, DebugLines, Keyboard, MatrixExt } from "ecsy-baby"
import { Player } from "../components/Player";


export class TestSystem extends BabySystem {
	execute(delta: number, time: number) {

		// testPlanes(this.world, time)

	}

	static queries: SystemQueries = {
		players: {
			components: [Player]
		},
	}
}