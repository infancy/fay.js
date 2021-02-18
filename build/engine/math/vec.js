import {notEqual} from "./math.js";
import {VecOperator} from "./vecOperator_.js";
class Vec2Accessor extends VecOperator {
  constructor() {
    super(...arguments);
    this.length_ = 2;
  }
  get x() {
    return this.a_[0];
  }
  get y() {
    return this.a_[1];
  }
  set x(value) {
    this.a_[0] = value;
  }
  set y(value) {
    this.a_[1] = value;
  }
  get s() {
    return this.x;
  }
  get t() {
    return this.y;
  }
  set s(value) {
    this.x = value;
  }
  set t(value) {
    this.y = value;
  }
}
const vec22 = class extends Vec2Accessor {
  constructor(x = 0, y = 0) {
    super();
    this.a_ = new Float32Array(this.length_);
    this.x = x;
    this.y = y;
  }
  create(x = 0, y = 0) {
    return new vec22(x, y);
  }
  clone() {
    return this.create(this.x, this.y);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (notEqual(this.a_[i], that.a_[i]))
        return false;
    return true;
  }
};
export let vec2 = vec22;
vec2.zero = new vec22(0, 0);
vec2.one = new vec22(1, 1);
const vec2i2 = class extends Vec2Accessor {
  constructor(x = 0, y = 0) {
    super();
    this.a_ = new Int32Array(this.length_);
    this.x = x;
    this.y = y;
  }
  create(x = 0, y = 0) {
    return new vec2i2(x, y);
  }
  clone() {
    return this.create(this.x, this.y);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (this.a_[i] !== that.a_[i])
        return false;
    return true;
  }
};
export let vec2i = vec2i2;
vec2i.zero = new vec2i2(0, 0);
vec2i.one = new vec2i2(1, 1);
class Vec3Accessor extends VecOperator {
  constructor() {
    super(...arguments);
    this.length_ = 3;
  }
  get x() {
    return this.a_[0];
  }
  get y() {
    return this.a_[1];
  }
  get z() {
    return this.a_[2];
  }
  set x(value) {
    this.a_[0] = value;
  }
  set y(value) {
    this.a_[1] = value;
  }
  set z(value) {
    this.a_[2] = value;
  }
  get r() {
    return this.x;
  }
  get g() {
    return this.y;
  }
  get b() {
    return this.z;
  }
  set r(value) {
    this.x = value;
  }
  set g(value) {
    this.y = value;
  }
  set b(value) {
    this.z = value;
  }
  cross(that) {
    const x1 = this.x, y1 = this.y, z1 = this.z;
    const x2 = that.x, y2 = that.y, z2 = that.z;
    return this.create(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
  }
}
const vec32 = class extends Vec3Accessor {
  constructor(x = 0, y = 0, z = 0) {
    super();
    this.a_ = new Float32Array(this.length_);
    this.x = x;
    this.y = y;
    this.z = z;
  }
  create(x = 0, y = 0, z = 0) {
    return new vec32(x, y, z);
  }
  clone() {
    return this.create(this.x, this.y, this.z);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (notEqual(this.a_[i], that.a_[i]))
        return false;
    return true;
  }
};
export let vec3 = vec32;
vec3.zero = new vec32(0, 0, 0);
vec3.one = new vec32(1, 1, 1);
vec3.right = new vec32(1, 0, 0);
vec3.up = new vec32(0, 1, 0);
vec3.forward = new vec32(0, 0, 1);
const vec3i2 = class extends Vec3Accessor {
  constructor(x = 0, y = 0, z = 0) {
    super();
    this.a_ = new Int32Array(this.length_);
    this.x = x;
    this.y = y;
    this.z = z;
  }
  create(x = 0, y = 0, z = 0) {
    return new vec3i2(x, y, z);
  }
  clone() {
    return this.create(this.x, this.y, this.z);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (this.a_[i] !== that.a_[i])
        return false;
    return true;
  }
};
export let vec3i = vec3i2;
vec3i.zero = new vec3(0, 0, 0);
vec3i.one = new vec3(1, 1, 1);
vec3i.right = new vec3(1, 0, 0);
vec3i.up = new vec3(0, 1, 0);
vec3i.forward = new vec3(0, 0, 1);
class Vec4Accessor extends VecOperator {
  constructor() {
    super(...arguments);
    this.length_ = 4;
  }
  get x() {
    return this.a_[0];
  }
  get y() {
    return this.a_[1];
  }
  get z() {
    return this.a_[2];
  }
  get w() {
    return this.a_[3];
  }
  set x(value) {
    this.a_[0] = value;
  }
  set y(value) {
    this.a_[1] = value;
  }
  set z(value) {
    this.a_[2] = value;
  }
  set w(value) {
    this.a_[3] = value;
  }
  get r() {
    return this.x;
  }
  get g() {
    return this.y;
  }
  get b() {
    return this.z;
  }
  get a() {
    return this.w;
  }
  set r(value) {
    this.x = value;
  }
  set g(value) {
    this.y = value;
  }
  set b(value) {
    this.z = value;
  }
  set a(value) {
    this.w = value;
  }
}
const vec42 = class extends Vec4Accessor {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    super();
    this.a_ = new Float32Array(this.length_);
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  create(x = 0, y = 0, z = 0, w = 0) {
    return new vec42(x, y, z, w);
  }
  clone() {
    return this.create(this.x, this.y, this.z, this.w);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (notEqual(this.a_[i], that.a_[i]))
        return false;
    return true;
  }
};
export let vec4 = vec42;
vec4.zero = new vec42(0, 0, 0, 0);
vec4.one = new vec42(1, 1, 1, 1);
const vec4i2 = class extends Vec4Accessor {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    super();
    this.a_ = new Int32Array(this.length_);
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  create(x = 0, y = 0, z = 0, w = 0) {
    return new vec4i2(x, y, z, w);
  }
  clone() {
    return this.create(this.x, this.y, this.z, this.w);
  }
  isEqual(that) {
    for (let i = 0; i < this.length_; ++i)
      if (this.a_[i] !== that.a_[i])
        return false;
    return true;
  }
};
export let vec4i = vec4i2;
vec4i.zero = new vec4i2(0, 0, 0, 0);
vec4i.one = new vec4i2(1, 1, 1, 1);
