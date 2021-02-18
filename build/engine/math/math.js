export const AbsoluteEpsilon = 1e-6;
export const RelativeEpsilon = 1e-6;
const _PiDiv180 = Math.PI / 180;
const _180DivPi = 180 / Math.PI;
export function toRadian(degree) {
  return degree * _PiDiv180;
}
export function toDegree(radian) {
  return radian * _180DivPi;
}
export function isEqual(a, b, epsilon = AbsoluteEpsilon) {
  return Math.abs(a - b) <= epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
export function notEqual(a, b, epsilon = AbsoluteEpsilon) {
  return !isEqual(a, b, epsilon);
}
