import { SystemQueries } from "ecsy";
import { BabySystem } from "ecsy-baby";
import { Grid } from "../components/Grid";

export class GridSystem extends BabySystem {
	execute() {
		// this.queries.entities.results.forEach(entity => {

		// })
	}

	static queries: SystemQueries = {
		entities: {
			components: [Grid]
		}
	}
}