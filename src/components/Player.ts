// import { LinesMesh, Mesh, Vector3 } from 'babylonjs';
import { LinesMesh, Mesh, Plane, Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyTypes } from 'ecsy-baby';
import { iLineOptions, iTransform, AdvancedPlane } from 'ecsy-baby';

export class Player extends Component<Player> {
	// value: type
	plane: AdvancedPlane
	transform: iTransform
	score: number

	static schema: ComponentSchema = {
		plane: { type: Types.Ref },
		transform: { type: Types.Ref },
		score: { type: Types.Number },
	}
}