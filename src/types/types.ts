import { Color4, LinesMesh, Nullable, Quaternion, Vector3, AnimationPropertiesOverride, Behavior, Matrix } from "babylonjs";

export interface iLineOptions {
	points: Vector3[];
	updatable?: boolean | undefined;
	instance?: Nullable<LinesMesh> | undefined;
	colors?: Color4[] | undefined;
	useVertexAlpha?: boolean | undefined;
}

export interface iLinesSystemOptions {
	lines: Vector3[][];
	updatable?: boolean | undefined;
	instance?: Nullable<LinesMesh> | undefined;
	colors?: Nullable<Color4[][]> | undefined;
	useVertexAlpha?: boolean | undefined;
}

//https://doc.babylonjs.com/typedoc/classes/babylon.transformnode
export interface iTransform {
	absolutePosition: Vector3
	absoluteRotationQuaternion: Nullable<Quaternion>
	absoluteScaling: Vector3
	animationPropertiesOverride: Nullable<AnimationPropertiesOverride>
	// behaviors: Behavior<Node>[]
	billboardMode: number
	doNotSerialize: boolean
	forward: Vector3
	infiniteDistance: boolean
	isWorldMatrixFrozen: boolean
	nonUniformScaling: boolean
	onDispose: (item: void) => any
	// parent: Nullable<Node>
	position: Vector3
	preserveParentRotationForBillboard: boolean
	right: Vector3
	rotation: Vector3
	rotationQuaternion: Nullable<Quaternion>
	scaling: Vector3
	up: Vector3
	worldMatrixFromCache: Matrix
}