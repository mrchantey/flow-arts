import { Component, ComponentSchema, Types } from 'ecsy';
import { LinesMesh, Mesh, Plane, Vector3 } from 'babylonjs';
import { BabyTypes } from 'ecsy-baby';
import { iLinesSystemOptions } from '../types/types';
import { iTargetType } from '../utility/TargetTypes';

export class Target extends Component<Target> {
	guides: iLinesSystemOptions
	scale: number
	targetType: iTargetType


	static schema: ComponentSchema = {
		guides: { type: Types.Ref },
		scale: { type: Types.Number },
		targetType: { type: Types.Ref }
	}
}