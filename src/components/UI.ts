import { TextBlock } from 'babylonjs-gui';
import { Component, ComponentSchema, Types } from 'ecsy';

export class UI extends Component<UI> {
	scoreText: TextBlock

	static schema: ComponentSchema = {
		scoreText: { type: Types.Ref }
	}
}