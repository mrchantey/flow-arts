import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyTypes, iLineOptions } from 'ecsy-baby';

export class PlayerTrail extends Component<PlayerTrail> {
	trailOptions: iLineOptions


	static schema: ComponentSchema = {
		trailOptions: { type: Types.Ref },
		lastAnchor: { type: BabyTypes.Vector3 }
	}
}