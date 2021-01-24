import { Component, ComponentSchema, Types } from 'ecsy';
import { Matrix } from 'babylonjs';
import { iLineSystemOptions } from 'ecsy-baby';

export interface iLinearTarget {
	guides: iLineSystemOptions
	localToWorld: Matrix
	worldToLocal: Matrix
	scale?: number
}


export class LinearTarget extends Component<LinearTarget> {
	guides: iLineSystemOptions
	scale: number
	localToWorld: Matrix
	worldToLocal: Matrix

	static schema: ComponentSchema = {
		guides: { type: Types.Ref },
		scale: { type: Types.Number },
		localToWorld: { type: Types.Ref },
		worldToLocal: { type: Types.Ref },
	}
}