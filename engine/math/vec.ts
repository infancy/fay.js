/*
model.mul(view).mul(camera).mul(vec3)
vec3.mul(model)
*/

import {isEqual, notEqual} from "./math"
import {vec_operator_} from "./vec_operator_"

/*
interface vec_type_ {

}
*/

//#region vec2

abstract class vec2_<T extends vec_operator_<T>> extends vec_operator_<T> {
    // type length = 3
    // type col = 4
    // type row = 4

    protected length_ = 2

    constructor(x = 0, y = 0) {
        super()

        this.x = x
        this.y = y
    }

    get x() { return this.a_[0] }
    get y() { return this.a_[1] }
    set x(value) { this.a_[0] = value }
    set y(value) { this.a_[1] = value }

    get s() { return this.x }
    get t() { return this.y }
    set s(value) { this.x = value }
    set t(value) { this.y = value }

    // u, v
    // s, t
}

export class vec2 extends vec2_<vec2> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero = new vec2(0, 0)
    static readonly one = new vec2(1, 1)

    clone(){ return new vec2(this.x, this.y) }

    isEqual(right: vec2): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], right.a_[i])) return false
        return true
    }
}

export class vec2i extends vec2_<vec2i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero = new vec2i(0, 0)
    static readonly one = new vec2i(1, 1)

    clone(){ return new vec2i(this.x, this.y) }

    isEqual(right: vec2i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== right.a_[i]) return false
        return true
    }
}

//#endregion



//#region vec3

abstract class vec3_<T extends vec_operator_<T>> extends vec_operator_<T> {
    protected length_ = 3

    constructor(x = 0, y = 0, z = 0) {
        super()

        this.x = x
        this.y = y
        this.z = z
    }

    get x() { return this.a_[0] }
    get y() { return this.a_[1] }
    get z() { return this.a_[2] }
    set x(value) { this.a_[0] = value }
    set y(value) { this.a_[1] = value }
    set z(value) { this.a_[2] = value }

    get r() { return this.x }
    get g() { return this.y }
    get b() { return this.z }
    set r(value) { this.x = value }
    set g(value) { this.y = value }
    set b(value) { this.z = value }
}

export class vec3 extends vec3_<vec3> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero    = new vec3(0, 0, 0)
    static readonly one     = new vec3(1, 1, 1)

    static readonly right   = new vec3(1, 0, 0)
    static readonly up      = new vec3(0, 1, 0)
    static readonly forward = new vec3(0, 0, 1)

    clone(){ return new vec3(this.x, this.y, this.z) }

    isEqual(right: vec3): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], right.a_[i])) return false
        return true
    }
}

export class vec3i extends vec3_<vec3i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new vec3(0, 0, 0)
    static readonly one     = new vec3(1, 1, 1)
    
    static readonly right   = new vec3(1, 0, 0)
    static readonly up      = new vec3(0, 1, 0)
    static readonly forward = new vec3(0, 0, 1)

    clone(){ return new vec3i(this.x, this.y, this.z) }

    isEqual(right: vec3i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== right.a_[i]) return false
        return true
    }
}

//#endregion



//#region vec4

abstract class vec4_<T extends vec_operator_<T>> extends vec_operator_<T> {
    protected length_ = 4

    constructor(x = 0, y = 0, z = 0, w = 0) {
        super()

        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    get x() { return this.a_[0] }
    get y() { return this.a_[1] }
    get z() { return this.a_[2] }
    get w() { return this.a_[3] }
    set x(value) { this.a_[0] = value }
    set y(value) { this.a_[1] = value }
    set z(value) { this.a_[2] = value }
    set w(value) { this.a_[3] = value }

    get r() { return this.x }
    get g() { return this.y }
    get b() { return this.z }
    get a() { return this.w }
    set r(value) { this.x = value }
    set g(value) { this.y = value }
    set b(value) { this.z = value }
    set a(value) { this.w = value }
}

export class vec4 extends vec4_<vec4> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero    = new vec4(0, 0, 0, 0)
    static readonly one     = new vec4(1, 1, 1, 1)

    clone(){ return new vec4(this.x, this.y, this.z, this.w) }

    isEqual(right: vec4): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], right.a_[i])) return false
        return true
    }
}

export class vec4i extends vec4_<vec4i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new vec4i(0, 0, 0, 0)
    static readonly one     = new vec4i(1, 1, 1, 1)

    clone(){ return new vec4i(this.x, this.y, this.z, this.w) }

    isEqual(right: vec4i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== right.a_[i]) return false
        return true
    }
}

//#endregion