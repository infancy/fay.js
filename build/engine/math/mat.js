import {toRadian} from "./math.js";
import {vec3, vec4} from "./vec.js";
export class MatOperator {
  get(row, col) {
    return this.a_[this.col_ * row + col];
  }
  data(index) {
    return this.a_[index];
  }
  set(row, col, value) {
    this.a_[this.col_ * row + col] = value;
  }
  reset() {
    this.assignScalar(0);
  }
  add(that) {
    let result = this.clone();
    result.addAssign(that);
    return result;
  }
  sub(that) {
    let result = this.clone();
    result.subAssign(that);
    return result;
  }
  assign(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = that.a_[i];
  }
  addAssign(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] += that.a_[i];
  }
  subAssign(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] -= that.a_[i];
  }
  addScalar(that) {
    let result = this.clone();
    result.addAssignScalar(that);
    return result;
  }
  subScalar(that) {
    let result = this.clone();
    result.subAssignScalar(that);
    return result;
  }
  mulScalar(that) {
    let result = this.clone();
    result.mulAssignScalar(that);
    return result;
  }
  divScalar(that) {
    let result = this.clone();
    result.divAssignScalar(that);
    return result;
  }
  assignScalar(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = that;
  }
  addAssignScalar(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] += that;
  }
  subAssignScalar(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] -= that;
  }
  mulAssignScalar(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] *= that;
  }
  divAssignScalar(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] /= that;
  }
}
class Mat4Base extends MatOperator {
  constructor() {
    super(...arguments);
    this.row_ = 4;
    this.col_ = 4;
    this.length_ = 16;
  }
  init_(values) {
    for (let i = 0; i < this.length_; ++i) {
      this.a_[i] = values[i];
    }
  }
  transpose() {
    let r = this.clone();
    r.reset();
    for (let i = 0; i < this.col_; ++i)
      for (let j = 0; j < this.row_; ++j)
        r.set(i, j, this.get(j, i));
    return r;
  }
}
const mat42 = class extends Mat4Base {
  constructor(_00 = 0, _01 = 0, _02 = 0, _03 = 0, _10 = 0, _11 = 0, _12 = 0, _13 = 0, _20 = 0, _21 = 0, _22 = 0, _23 = 0, _30 = 0, _31 = 0, _32 = 0, _33 = 0) {
    super();
    this.a_ = new Float32Array(this.length_);
    this.init_([
      _00,
      _01,
      _02,
      _03,
      _10,
      _11,
      _12,
      _13,
      _20,
      _21,
      _22,
      _23,
      _30,
      _31,
      _32,
      _33
    ]);
  }
  create(numbers) {
    return new mat42(...numbers);
  }
  clone() {
    return new mat42(this.a_[0], this.a_[1], this.a_[2], this.a_[3], this.a_[4], this.a_[5], this.a_[6], this.a_[7], this.a_[8], this.a_[9], this.a_[10], this.a_[11], this.a_[12], this.a_[13], this.a_[14], this.a_[15]);
  }
  getRow(index) {
    let r = new vec4();
    for (let i = 0; i < this.col_; ++i)
      r.set(i, this.a_[this.col_ * index + i]);
    return r;
  }
  getCol(index) {
    let r = new vec4();
    for (let i = 0; i < this.row_; ++i)
      r.set(i, this.a_[this.row_ * i + index]);
    return r;
  }
  setRow(index, row) {
    for (let i = 0; i < this.col_; ++i)
      this.set(index, i, row.get(i));
  }
  setCol(index, col) {
    for (let i = 0; i < this.col_; ++i)
      this.set(i, index, col.get(i));
  }
  mul(that) {
    let r = mat42.zero.clone();
    for (let i = 0; i < this.row_; ++i) {
      const row = this.getRow(i);
      for (let j = 0; j < this.row_; ++j) {
        const col = that.getCol(j);
        r.set(i, j, row.dot(col));
      }
    }
    return r;
  }
  mulAssign(that) {
    this.assign(this.mul(that));
  }
  mulVec4(that) {
    let r = vec4.zero.clone();
    for (let i = 0; i < this.row_; ++i) {
      const row = this.getRow(i);
      r.set(i, row.dot(that));
    }
    return r;
  }
  inverse() {
    const a00 = this.a_[0];
    const a01 = this.a_[1];
    const a02 = this.a_[2];
    const a03 = this.a_[3];
    const a10 = this.a_[4];
    const a11 = this.a_[5];
    const a12 = this.a_[6];
    const a13 = this.a_[7];
    const a20 = this.a_[8];
    const a21 = this.a_[9];
    const a22 = this.a_[10];
    const a23 = this.a_[11];
    const a30 = this.a_[12];
    const a31 = this.a_[13];
    const a32 = this.a_[14];
    const a33 = this.a_[15];
    const det00 = a00 * a11 - a01 * a10;
    const det01 = a00 * a12 - a02 * a10;
    const det02 = a00 * a13 - a03 * a10;
    const det03 = a01 * a12 - a02 * a11;
    const det04 = a01 * a13 - a03 * a11;
    const det05 = a02 * a13 - a03 * a12;
    const det06 = a20 * a31 - a21 * a30;
    const det07 = a20 * a32 - a22 * a30;
    const det08 = a20 * a33 - a23 * a30;
    const det09 = a21 * a32 - a22 * a31;
    const det10 = a21 * a33 - a23 * a31;
    const det11 = a22 * a33 - a23 * a32;
    let det = det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06;
    if (!det) {
      return null;
    }
    let invDet = 1 / det;
    this.a_[0] = (a11 * det11 - a12 * det10 + a13 * det09) * invDet;
    this.a_[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * invDet;
    this.a_[2] = (a31 * det05 - a32 * det04 + a33 * det03) * invDet;
    this.a_[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * invDet;
    this.a_[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * invDet;
    this.a_[5] = (a00 * det11 - a02 * det08 + a03 * det07) * invDet;
    this.a_[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * invDet;
    this.a_[7] = (a20 * det05 - a22 * det02 + a23 * det01) * invDet;
    this.a_[8] = (a10 * det10 - a11 * det08 + a13 * det06) * invDet;
    this.a_[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * invDet;
    this.a_[10] = (a30 * det04 - a31 * det02 + a33 * det00) * invDet;
    this.a_[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * invDet;
    this.a_[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * invDet;
    this.a_[13] = (a00 * det09 - a01 * det07 + a02 * det06) * invDet;
    this.a_[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * invDet;
    this.a_[15] = (a20 * det03 - a21 * det01 + a22 * det00) * invDet;
    return this;
  }
  translate(vec) {
    this.mulAssign(mat42.translate(vec));
    return this;
  }
  scale(vec) {
    this.mulAssign(mat42.scale(vec));
    return this;
  }
  static translate([x, y, z]) {
    return new mat42(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
  }
  static scale([x, y, z]) {
    return new mat42(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
  }
  static rotateX(theta) {
    const sin = Math.sin(toRadian(theta));
    const cos = Math.cos(toRadian(theta));
    return new mat42(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
  }
  static rotateY(theta) {
    const sin = Math.sin(toRadian(theta));
    const cos = Math.cos(toRadian(theta));
    return new mat42(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
  }
  static rotateZ(theta) {
    const sin = Math.sin(toRadian(theta));
    const cos = Math.cos(toRadian(theta));
    return new mat42(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  static rotate(theta, axis) {
    const sin = Math.sin(toRadian(theta));
    const cos = Math.cos(toRadian(theta));
    const [x, y, z] = axis.normalize();
    let m00 = x * x + (1 - x * x) * cos;
    let m01 = x * y * (1 - cos) - z * sin;
    let m02 = x * z * (1 - cos) + y * sin;
    let m10 = x * y * (1 - cos) + z * sin;
    let m11 = y * y + (1 - y * y) * cos;
    let m12 = y * z * (1 - cos) - x * sin;
    let m20 = x * z * (1 - cos) - y * sin;
    let m21 = y * z * (1 - cos) + x * sin;
    let m22 = z * z + (1 - z * z) * cos;
    return new mat42(m00, m01, m02, 0, m10, m11, m12, 0, m20, m21, m22, 0, 0, 0, 0, 1);
  }
  static lookAt(position, target, up = vec3.up) {
    let camera2world = new mat42(0, 0, 0, position.x, 0, 0, 0, position.y, 0, 0, 0, position.z, 0, 0, 0, 1);
    const dir = target.sub(position).normalize();
    const right = up.cross(dir).normalize();
    const newUp = dir.cross(right);
    return new mat42(...right, -right.dot(position), ...newUp, -newUp.dot(position), ...dir, -dir.dot(position), 0, 0, 0, 1);
  }
  static frustumLH_ZO(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
    const m00 = near * 2 / rl;
    const m11 = near * 2 / tb;
    const m02 = (right + left) / rl;
    const m12 = (top + bottom) / tb;
    const m22 = far / fn;
    const m23 = -(far * near) / fn;
    return new mat42(m00, 0, m02, 0, 0, m11, m12, 0, 0, 0, m22, m23, 0, 0, 1, 1);
  }
  static frustumRH_NO(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
    const m00 = near * 2 / rl;
    const m11 = near * 2 / tb;
    const m02 = (right + left) / rl;
    const m12 = (top + bottom) / tb;
    const m22 = -(far + near) / fn;
    const m23 = -(far * near * 2) / fn;
    return new mat42(m00, 0, m02, 0, 0, m11, m12, 0, 0, 0, m22, m23, 0, 0, -1, 1);
  }
  static frustum(left, right, bottom, top, near, far) {
    return mat42.frustumRH_NO(left, right, bottom, top, near, far);
  }
  static perspective(fov, aspect, near, far) {
    const top = near * Math.tan(toRadian(fov) / 2);
    const right = top * aspect;
    return mat42.frustumRH_NO(-right, right, -top, top, near, far);
  }
  static orthographicLH_ZO(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
    const m00 = 2 / rl;
    const m11 = 2 / tb;
    const m22 = 1 / fn;
    const m03 = -(left + right) / rl;
    const m13 = -(top + bottom) / tb;
    const m23 = -near / fn;
    return new mat42(m00, 0, 0, m03, 0, m11, 0, m13, 0, 0, m22, m23, 0, 0, 0, 1);
  }
  static orthographicRH_NO(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
    const m00 = 2 / rl;
    const m11 = 2 / tb;
    const m22 = -2 / fn;
    const m03 = -(left + right) / rl;
    const m13 = -(top + bottom) / tb;
    const m23 = -(far + near) / fn;
    return new mat42(m00, 0, 0, m03, 0, m11, 0, m13, 0, 0, m22, m23, 0, 0, 0, 1);
  }
  static orthographic(left, right, bottom, top, near, far) {
    return mat42.orthographicRH_NO(left, right, bottom, top, near, far);
  }
};
export let mat4 = mat42;
mat4.zero = new mat42();
mat4.identity = new mat42(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
const mat4i2 = class extends Mat4Base {
  constructor(_00 = 0, _01 = 0, _02 = 0, _03 = 0, _10 = 0, _11 = 0, _12 = 0, _13 = 0, _20 = 0, _21 = 0, _22 = 0, _23 = 0, _30 = 0, _31 = 0, _32 = 0, _33 = 0) {
    super();
    this.a_ = new Int32Array(this.length_);
    this.init_([
      _00,
      _01,
      _02,
      _03,
      _10,
      _11,
      _12,
      _13,
      _20,
      _21,
      _22,
      _23,
      _30,
      _31,
      _32,
      _33
    ]);
  }
  create(numbers) {
    return new mat4i2(...numbers);
  }
  clone() {
    return new mat4i2(this.a_[0], this.a_[1], this.a_[2], this.a_[3], this.a_[4], this.a_[5], this.a_[6], this.a_[7], this.a_[8], this.a_[9], this.a_[10], this.a_[11], this.a_[12], this.a_[13], this.a_[14], this.a_[15]);
  }
};
export let mat4i = mat4i2;
mat4i.zero = new mat4i2();
mat4i.identity = new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
const mat3x42 = class extends MatOperator {
  constructor(_00 = 0, _01 = 0, _02 = 0, _03 = 0, _10 = 0, _11 = 0, _12 = 0, _13 = 0, _20 = 0, _21 = 0, _22 = 0, _23 = 0) {
    super();
    this.a_ = new Float32Array(this.length_);
    this.row_ = 3;
    this.col_ = 4;
    this.length_ = 12;
    this.init_([
      _00,
      _01,
      _02,
      _03,
      _10,
      _11,
      _12,
      _13,
      _20,
      _21,
      _22,
      _23
    ]);
  }
  init_(values) {
    for (let i = 0; i < this.length_; ++i) {
      this.a_[i] = values[i];
    }
  }
  create(numbers) {
    return new mat3x42(...numbers);
  }
  clone() {
    const m = this.a_;
    return new mat3x42(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11]);
  }
};
let mat3x4 = mat3x42;
mat3x4.zero = new mat3x42();
mat3x4.identity = new mat3x42(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0);
