
const vec1math = require('./vector1math');

const PI = Math.PI
const TWO_PI = Math.PI * 2

module.exports = {
	add,
	sub,
	scale,
	lerp,
	magnitude,
	normalize,
	perpendicular,
	angle,
	dot,
	getSlope,
	getYIntersect,
	angleBetween,
	signedAngleBetween,
	deltaAngle,
	signedDeltaAngle,
	direction,
	distance,
	cartesianToPolar,
	polarToCartesian,
	nextPointOnCircle,
	nextPointOnCircleLerped,
	nearestPointOnLine,
	slopeInterceptPointOfIntersection,
	cartesianPointOfIntersection,
	cartesianToSlopeIntercept,
	circleInfo
}

function add(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	}
}

function sub(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	}
}
//does not normalize first
function scale(vec, s) {
	return {
		x: vec.x * s,
		y: vec.y * s
	}
}

function normalize(vec) {
	const mag = magnitude(vec)
	return {
		x: vec.x / mag,
		y: vec.y / mag
	}
}

function magnitude(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}

function lerp(a, b, t) {
	return {
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t,
	}
}



function perpendicular(vec) {
	return {
		x: -vec.y,
		y: vec.x
	}
}

function angle(vec) {
	return Math.atan2(vec.y, vec.x)
}

function dot(a, b) {
	return a.x * b.x + a.y * b.y
}

function angleBetween(a, b) {
	const dotProduct = dot(a, b)
	const combinedMag = magnitude(a) * magnitude(b)

	return Math.acos(dotProduct / combinedMag)
}

function signedAngleBetween(a, b) {
	const thetaA = angle(a)
	const thetaB = angle(b)
	const theta = thetaB - thetaA
	if (theta > PI)
		return theta - TWO_PI
	else if (theta < -PI)
		return theta + TWO_PI
	else
		return theta
}

function direction(posA, posB) {
	return normalize(sub(posB, posA))
}

function distance(posA, posB) {
	return magnitude(sub(posB, posA))
}

//vecA and B are describing the line, vecC is the point
function nearestPointOnLine(lineA, lineB, posC) {
	const vecAB = sub(lineB, lineA)
	const vecAC = sub(posC, lineA)

	const theta = angleBetween(vecAB, vecAC)

	const magAC = magnitude(vecAC)
	const magAD = Math.cos(theta) * magAC

	const dirAB = normalize(vecAB)

	const vecAD = scale(dirAB, magAD)

	const posD = add(lineA, vecAD)

	// const dirA = normalize(vecA)
	// const magC = dot(dirA, vecB)
	// console.log(object);
	// const magB = magnitude(vecB)
	// const thetaAB = angleBetween(vecA, vecB)
	// const magC = Math.cos(thetaAB) * magB
	// const vecC = scale(dirA, magC)
	// const vecC = add(vecA, scale(dirA, magAC))
	return posD
}

function cartesianToPolar(vec) {

	return {
		radius: magnitude(vec),
		theta: Math.atan2(vec.y, vec.x)
	}
}

function polarToCartesian(theta, radius) {
	return {
		x: Math.cos(theta) * radius,
		y: Math.sin(theta) * radius
	}
}

function getSlope(vec) {
	return vec.y / vec.x
}


function getYIntersect(vec, slope) {
	//y = mx+b
	//vec.y = slope * vec.x + b
	//vec.y - slope * vec.x = b
	//b = vec.y - slope * vec.x
	return vec.y - slope * vec.x
}

//y = mx+b
//y = slope * x + yIntersect
function cartesianToSlopeIntercept(vecA, vecB) {
	const vecAB = sub(vecB, vecA)
	const slope = getSlope(vecAB)
	const yIntersect = getYIntersect(vecA, slope)
	return {
		slope,
		yIntersect
	}
}

function cartesianPointOfIntersection(vec1A, vec1B, vec2A, vec2B) {
	const eq1 = cartesianToSlopeIntercept(vec1A, vec1B)
	const eq2 = cartesianToSlopeIntercept(vec2A, vec2B)
	return slopeInterceptPointOfIntersection(eq1.slope, eq1.yIntersect, eq2.slope, eq2.yIntersect)
}


function slopeInterceptPointOfIntersection(m1, b1, m2, b2) {
	//m1 * x + b1 = m2 * x + b2

	//move b1 to other side
	//m1 * x = m2 * x + b2 - b1

	//move (m2 * x) to other side
	//m1 * x - m2 * x = b2 - b1

	//combine like terms
	//(m1 - m2) * x = b1 - b2

	//viola
	//x = (b2 - b1) / (m1 - m2)

	//solve y with either slopeIntercept
	//y = m1 * x + b1
	const x = (b2 - b1) / (m1 - m2)
	const y = m1 * x + b1
	return { x, y }
}

function deltaAngle(posA, posB, posC) {
	const deltaAB = sub(posB, posA)
	const deltaBC = sub(posC, posB)
	return angleBetween(deltaAB, deltaBC)
}
function signedDeltaAngle(posA, posB, posC) {
	const deltaAB = sub(posB, posA)
	const deltaBC = sub(posC, posB)
	return signedAngleBetween(deltaAB, deltaBC)
}

function nextPointOnCircle(posA, posB, posC) {
	const deltaAB = sub(posB, posA)
	const deltaBC = sub(posC, posB)
	//technically the inverse of thetaABC (PI - theta || -PI + theta)
	const signedThetaABC = signedAngleBetween(deltaAB, deltaBC)
	const signedThetaBCD = signedThetaABC


	const magBC = magnitude(deltaBC)
	const magCD = magBC

	const magCE = Math.cos(signedThetaBCD) * magCD
	//this is really a signed magnitude
	const magED = Math.sin(signedThetaBCD) * magCD


	const dirBC = normalize(deltaBC)
	const dirED = perpendicular(dirBC)

	const posE = add(posC, scale(dirBC, magCE))
	const posD = add(posE, scale(dirED, magED))

	return posD
}


function nextPointOnCircleLerped(posA, posB, posC, lastSignedThetaECD) {
	const deltaAB = sub(posB, posA)
	const deltaBC = sub(posC, posB)
	const signedThetaABC = signedAngleBetween(deltaAB, deltaBC)

	const magBC = magnitude(deltaBC)
	const magCD = magBC

	const dirBC = normalize(deltaBC)


	// const signedThetaECD = signedThetaABC
	const signedThetaECD = vec1math.lerp(lastSignedThetaECD, signedThetaABC, 0.02)

	const magCE = Math.cos(signedThetaECD) * magCD
	const magED = Math.sin(signedThetaECD) * magCD

	const dirED = perpendicular(dirBC)

	const posE = add(posC, scale(dirBC, magCE))
	const posD = add(posE, scale(dirED, magED))

	if (!isNaN(signedThetaECD))
		lastSignedThetaECD = signedThetaECD
	return {
		posD,
		lastSignedThetaECD
	}
}


function average(vecA, vecB) {
	return scale(add(vecA, vecB), 0.5)

}

function circleInfo(posA, posB, posC, maxValidRadius = 100000) {



	const dirAB = direction(posA, posB)
	const dirBC = direction(posB, posC)

	//may be inverted
	const dirDE = perpendicular(dirAB)
	const dirCE = perpendicular(dirBC)

	const slopeDirDE = getSlope(dirDE)
	const slopeDirCE = getSlope(dirCE)
	//will return invalid if either vector x component is 0
	//or slopes are parrallel
	if (
		!isValid(slopeDirDE) ||
		!isValid(slopeDirCE) ||
		Math.abs(slopeDirDE) === Math.abs(slopeDirCE))
		return

	const dirBE = normalize(average(dirDE, dirCE))
	const posF = add(posB, dirBE)


	const posG = add(posC, dirCE)

	const posE = cartesianPointOfIntersection(posB, posF, posC, posG)


	const vecBE = sub(posE, posB)
	//diameter
	const magBE = magnitude(vecBE)
	//radius
	const magBH = magBE / 2

	// if (!isValid(magBH) || magBH > maxValidRadius)
	if (magBH > maxValidRadius)
		return

	// const dirBE = normalize(vecBE)
	//center
	const posH = add(posB, scale(dirBE, magBH))


	return {
		center: posH,
		radius: magBH,
		diameter: magBE
	}
}

function isValid(val) {
	return isFinite(val) && !isNaN(val)
}