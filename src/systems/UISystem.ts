import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from "babylonjs-gui";
import { SystemQueries } from "ecsy";
import { BabySystem, Scene } from "ecsy-baby"
import { Player } from "../components/Player";
import { UI } from "../components/UI";

export class UISystem extends BabySystem {

	init() {
		const scene = this.getSingletonComponent(Scene).scene
		const root = AdvancedDynamicTexture.CreateFullscreenUI("UI", undefined, scene)

		const rect = new Rectangle("ui box")
		rect.width = 1
		rect.height = 0.05
		rect.color = "rgba(0,0,0,0)"
		rect.background = "rgba(0,0,0,0)"
		rect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
		rect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
		root.addControl(rect)

		const scoreText = new TextBlock("Score")
		scoreText.verticalAlignment = 0
		scoreText.text = `score: ${0}`
		scoreText.color = "gray"
		scoreText.fontSize = 24
		scoreText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
		rect.addControl(scoreText)

		this.addSingletonComponent(UI, { scoreText })
	}

	execute() {
		const ui = this.getSingletonComponent(UI)

		this.queries.entities.results.forEach(entity => {
			const flow = entity.getMutableComponent(Player)!

			ui.scoreText.text = `score: ${flow.score}`

		})
	}

	static queries: SystemQueries = {
		entities: {
			components: [Player]
		}
	}
}