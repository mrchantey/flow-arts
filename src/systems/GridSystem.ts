import { Color4, MeshBuilder, Vector3 } from "babylonjs";
import { Not, SystemQueries } from "ecsy";
import { BabySystem, Scene } from "ecsy-baby";
import { Grid } from "../components/Grid";
import { Player } from "../components/Player";

export class GridSystem extends BabySystem {
	execute() {
		const scene = this.getSingletonComponent(Scene).scene
		this.queries.playerNoGrid.results.forEach(entity => {

			const res = 50
			const len = 10
			const dlen = len / res
			const hlen = len / 2
			let lines: Vector3[][] = []
			let colors: Color4[][] = []
			for (let i = 0; i <= res; i++) {
				const d = -hlen + i * dlen
				lines.push([new Vector3(d, -hlen, 0), new Vector3(d, hlen, 0)])
				lines.push([new Vector3(-hlen, d, 0), new Vector3(hlen, d, 0)])
				colors.push([new Color4(1, 1, 1, 0.1), new Color4(1, 1, 1, 0.1)])
				colors.push([new Color4(1, 1, 1, 0.1), new Color4(1, 1, 1, 0.1)])
			}

			const guidesInstance = MeshBuilder.CreateLineSystem("guides", { lines, colors }, scene)
			// const gridRows = 
			entity.addComponent(Grid)

		})
	}

	static queries: SystemQueries = {
		playerNoGrid: {
			components: [Player, Not(Grid)]
		}
	}
}