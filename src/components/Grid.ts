import { Component, ComponentSchema, Types } from 'ecsy';

export class Grid extends Component<Grid> {
	rows: number
	cols: number

	static schema: ComponentSchema = {
		rows: { type: Types.Number, default: 10 },
		cols: { type: Types.Number, default: 10 },
	}
}