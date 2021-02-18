export class VecOperator {
  get(index) {
    return this.a_[index];
  }
  set(index, value) {
    this.a_[index] = value;
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length_; ++i) {
      yield this.a_[i];
    }
  }
  negative() {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = -this.a_[i];
  }
  inverse() {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = 1 / this.a_[i];
  }
  reset() {
    this.assignScalar(0);
  }
  normalize() {
    this.mulAssignScalar(1 / this.length());
    return this;
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
  length() {
    return Math.sqrt(this.length());
  }
  lengthSquare() {
    let square = 0;
    for (let i = 0; i < this.length_; ++i)
      square += this.a_[i] * this.a_[i];
    return square;
  }
  distance(that) {
    return this.sub(that).length();
  }
  distanceSquare(that) {
    return this.sub(that).lengthSquare();
  }
  dot(that) {
    let r = 0;
    for (let i = 0; i < this.length_; ++i)
      r += this.a_[i] * that.a_[i];
    return r;
  }
  to(mat) {
    return this;
  }
  notEqual(that) {
    return !this.isEqual(that);
  }
  copyTo(that) {
    for (let i = 0; i < this.length_; ++i)
      that.a_[i] = this.a_[i];
  }
  copyFrom(that) {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = that.a_[i];
  }
  ceil() {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = Math.ceil(this.a_[i]);
  }
  floor() {
    for (let i = 0; i < this.length_; ++i)
      this.a_[i] = Math.floor(this.a_[i]);
  }
  toString() {
    let str = "";
    for (let i = 0; i < this.length_; ++i)
      str += `${this.a_[i]}, `;
    return `${this.constructor.name}(${str})`;
  }
  static lerp(a, b, t) {
    return a.mulScalar(t) + b.mulScalar(1 - t);
  }
}
