/*
model.mul(view).mul(camera).mul(vec3)
vec3.mul(model)
*/

import {isEqual, notEqual} from "./math"
import {VecOperator, TypedArray } from "./vec-operator_"
/*
interface vec_type_ {

}
*/

//#region vec2

abstract class Vec2Accessor<T extends VecOperator<T>> extends VecOperator<T> {
    // type length = 3
    // type col = 4
    // type row = 4

    protected abstract a_ : TypedArray
    protected length_ = 2

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

export class vec2 extends Vec2Accessor<vec2> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero = new vec2(0, 0)
    static readonly one = new vec2(1, 1)

    constructor(x = 0, y = 0) {
        super()
        this.x = x
        this.y = y
    }

    create(x = 0, y = 0) { return new vec2(x, y) }
    clone(){ return this.create(this.x, this.y) }

    isEqual(that: vec2): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], that.a_[i])) return false
        return true
    }

    //typeName_() { return this.constructor.name }
}

export class vec2i extends Vec2Accessor<vec2i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero = new vec2i(0, 0)
    static readonly one = new vec2i(1, 1)

    constructor(x = 0, y = 0) {
        super()
        this.x = x
        this.y = y
    }

    create(x = 0, y = 0) { return new vec2i(x, y) }
    clone(){ return this.create(this.x, this.y) }

    isEqual(that: vec2i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== that.a_[i]) return false
        return true
    }

    /*
    copyFromVec2(that: vec2) {
        for(let i = 0; i < this.length_; ++i) this.a_[i] = that.at(i)
    }
    */
}

//#endregion



//#region vec3

abstract class Vec3Accessor<T extends VecOperator<T>> extends VecOperator<T> {
    protected abstract a_ : TypedArray
    abstract create(x: number, y: number, z: number) : T
    protected length_ = 3

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

    // | +1 -1 +1 |
    // | x1 y1 z1 |
    // | x2 y2 z2 |
    cross(that: Vec3Accessor<T>) {
        const x1 = this.x, y1 = this.y, z1 = this.z;
        const x2 = that.x, y2 = that.y, z2 = that.z;

        //  ( y1 * z2 - z1 * y2 )
        // -( x1 * z2 - z1 * x2 ) 
        //  ( x1 * y2 - y1 * x2 )
        return this.create(
            (y1 * z2) - (z1 * y2), 
            (z1 * x2) - (x1 * z2),
            (x1 * y2) - (y1 * x2))
    }
}

export class vec3 extends Vec3Accessor<vec3> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero    = new vec3(0, 0, 0)
    static readonly one     = new vec3(1, 1, 1)

    static readonly right   = new vec3(1, 0, 0)
    static readonly up      = new vec3(0, 1, 0)
    static readonly forward = new vec3(0, 0, 1)

    constructor(x = 0, y = 0, z = 0) {
        super()
        this.x = x
        this.y = y
        this.z = z
    }

    create(x = 0, y = 0, z = 0) { return new vec3(x, y, z) }
    clone(){ return this.create(this.x, this.y, this.z) }

    isEqual(that: vec3): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], that.a_[i])) return false
        return true
    }
}

export class vec3i extends Vec3Accessor<vec3i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new vec3(0, 0, 0)
    static readonly one     = new vec3(1, 1, 1)
    
    static readonly right   = new vec3(1, 0, 0)
    static readonly up      = new vec3(0, 1, 0)
    static readonly forward = new vec3(0, 0, 1)

    constructor(x = 0, y = 0, z = 0) {
        super()
        this.x = x
        this.y = y
        this.z = z
    }

    create(x = 0, y = 0, z = 0) { return new vec3i(x, y, z) }
    clone(){ return this.create(this.x, this.y, this.z) }

    isEqual(that: vec3i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== that.a_[i]) return false
        return true
    }
}

//#endregion



//#region vec4

abstract class Vec4Accessor<T extends VecOperator<T>> extends VecOperator<T> {
    protected abstract a_ : TypedArray
    protected length_ = 4

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

export class vec4 extends Vec4Accessor<vec4> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero    = new vec4(0, 0, 0, 0)
    static readonly one     = new vec4(1, 1, 1, 1)

    constructor(x = 0, y = 0, z = 0, w = 0) {
        super()
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    // TODO: static
    create(x = 0, y = 0, z = 0, w = 0) { return new vec4(x, y, z, w) }
    clone(){ return this.create(this.x, this.y, this.z, this.w) }

    isEqual(that: vec4): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(notEqual(this.a_[i], that.a_[i])) return false
        return true
    }
}

export class vec4i extends Vec4Accessor<vec4i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new vec4i(0, 0, 0, 0)
    static readonly one     = new vec4i(1, 1, 1, 1)

    constructor(x = 0, y = 0, z = 0, w = 0) {
        super()
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    create(x = 0, y = 0, z = 0, w = 0) { return new vec4i(x, y, z, w) }
    clone(){ return this.create(this.x, this.y, this.z, this.w) }

    isEqual(that: vec4i): boolean {
        for(let i = 0; i < this.length_; ++i)
            if(this.a_[i] !== that.a_[i]) return false
        return true
    }
}

//#endregion



//#region type

export type number2 = [number, number] | vec2
export type number3 = [number, number, number] | vec3
export type number4 = [number, number, number, number]  | vec4

//#endregion