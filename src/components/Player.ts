// import { LinesMesh, Mesh, Vector3 } from 'babylonjs';
import { LinesMesh, Mesh, Plane, Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyTypes } from 'ecsy-baby';
import { iLineOptions, iTransform } from '../types/types';

export class Player extends Component<Player> {
	// value: type
	plane: Plane
	transform: iTransform
	trailOptions: iLineOptions
	lastAnchor: Vector3
	score: number

	static schema: ComponentSchema = {
		plane: { type: Types.Ref },
		transform: { type: Types.Ref },
		trailOptions: { type: Types.Ref },
		lastAnchor: { type: BabyTypes.Vector3 },
		score: { type: Types.Number },
	}
}