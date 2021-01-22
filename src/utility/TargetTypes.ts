import { Vector3 } from "babylonjs";


export interface iTargetType {
	name: string,
	getScore: (pos: Vector3, targetPos: Vector3, scale: number) => number,
	modifyLines: (lines: Vector3[][], scale: number) => void
}

export interface iTargetTypes {
	[key: string]: iTargetType
}

export const TargetTypes: iTargetTypes = {
	linearX: {
		name: "linearX",
		getScore: (pos, targetPos, scale) => Math.abs(pos.x - targetPos.x) / scale,
		modifyLines(lines, scale) {
			lines[0][0] = new Vector3(-scale, scale, 0)
			lines[0][1] = new Vector3(-scale, -scale, 0)
			lines[1][0] = new Vector3(scale, scale, 0)
			lines[1][1] = new Vector3(scale, -scale, 0)
		}
	},
	linearY: {
		name: "linearY",
		getScore: (pos, targetPos, scale) => Math.abs(pos.y - targetPos.y) / scale,
		modifyLines(lines, scale) {
			lines[0][0] = new Vector3(-scale, scale, 0)
			lines[0][1] = new Vector3(scale, scale, 0)
			lines[1][0] = new Vector3(-scale, -scale, 0)
			lines[1][1] = new Vector3(scale, -scale, 0)
		},
	}
}

const targetTypesArr = Object.values(TargetTypes)


export function getRandomTargetType() {
	const index = Math.floor(Math.random() * targetTypesArr.length)
	return targetTypesArr[index]
}

