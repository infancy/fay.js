//#region constant

export const AbsoluteEpsilon = 0.000001
export const RelativeEpsilon = 0.000001

//#endregion



//#region degree, radian

const _PiDiv180 = Math.PI / 180
const _180DivPi = 180 / Math.PI

export function toRadian(degree: number) {
    return degree * _PiDiv180
}

export function toDegree(radian: number) {
    return radian * _180DivPi
}

//#endregion



//#region compare

export function isEqual(a: number, b: number, epsilon: number = AbsoluteEpsilon) : boolean {
    return Math.abs(a - b) <= epsilon * Math.max(1.0, Math.abs(a), Math.abs(b))
}

export function notEqual(a: number, b: number, epsilon: number = AbsoluteEpsilon) : boolean {
    return !isEqual(a, b, epsilon)
}

//#endregion
