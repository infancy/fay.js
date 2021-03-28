/**
 * fay.js's matrix use `M * v` style multiplication, row-vector storage, all is like PBRT
 * but `P * V * M * v` is not clear, so provide `v.to(M).to(V).to(P)` style method
 */

import {isEqual, toRadian} from "./math"
import { vec2, vec3, vec4, number3, number4 } from "./vec"
import { TypedArray } from "./vec-operator_"

export abstract class MatOperator<T extends MatOperator<T>> {
    protected abstract a_ : TypedArray
    protected abstract readonly row_ : number
    protected abstract readonly col_ : number
    protected abstract readonly length_ : number
    abstract clone() : T

    //#region get/set

    /** 0-based index, e.g. mat4(0, 0)~mat4(3, 3) */
    get(row: number, col: number): number { return this.a_[this.col_ * row + col] }

    /*
    row(index: number): number[] { 
        let r = []; 
        for(let i = 0; i < this.col_; ++i) 
            r.push(this.a_[this.col_ * index + i]); 
        return r; 
    }

    col(index: number): number[] { 
        let r = [];
        for(let i = 0; i < this.row_; ++i) 
            r.push(this.a_[this.row_ * i + index]); 
        return r;
    }
    */
    
    data(index: number): number { return this.a_[index] }

    set(row: number, col: number, value: number) { this.a_[this.col_ * row + col] = value }

    //#endregion



    //#region unary

    reset() { this.assignScalar(0) }

    //#endregion



    //#region +-*/
    add(that: T) : T { let result = this.clone(); result.addAssign(that); return result; }
    sub(that: T) : T { let result = this.clone(); result.subAssign(that); return result; }

       assign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i]  = that.a_[i] }
    addAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] += that.a_[i] }
    subAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] -= that.a_[i] }

    //#endregion

    //#region scalar

    addScalar(that: number) : T { let result = this.clone(); result.addAssignScalar(that); return result; }
    subScalar(that: number) : T { let result = this.clone(); result.subAssignScalar(that); return result; }
    mulScalar(that: number) : T { let result = this.clone(); result.mulAssignScalar(that); return result; }
    divScalar(that: number) : T { let result = this.clone(); result.divAssignScalar(that); return result; }
    
       assignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i]  = that }
    addAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] += that }
    subAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] -= that }
    mulAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] *= that }
    divAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] /= that }
    
    //#endregion scalar



    //#region misc

    // determinant()

    //#endregion
}



//#region mat4

type number16_ = [
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
]

abstract class Mat4Base<T extends MatOperator<T>> extends MatOperator<T> {
    protected readonly row_ = 4
    protected readonly col_ = 4
    protected readonly length_ = 16

    protected init_(values: number16_) {
        for(let i = 0; i < this.length_; ++i) {
            this.a_[i] = values[i]
        }
    }

    //#region



    transpose(): T {
        let r = this.clone(); r.reset() // TODO

        for(let i = 0; i < this.col_; ++i)
            for(let j = 0; j < this.row_; ++j)
                r.set(i, j, this.get(j, i))

        return r
    }

    //#endregion
}

export class mat4 extends Mat4Base<mat4> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero     = new mat4()
    static readonly identity = new mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)

    constructor(
        _00 = 0, _01 = 0, _02 = 0, _03 = 0,
        _10 = 0, _11 = 0, _12 = 0, _13 = 0,
        _20 = 0, _21 = 0, _22 = 0, _23 = 0,
        _30 = 0, _31 = 0, _32 = 0, _33 = 0) {
            
        super()
        // this.arguments
        this.init_([
            _00, _01, _02, _03,
            _10, _11, _12, _13,
            _20, _21, _22, _23,
            _30, _31, _32, _33
        ])
    }

    create(numbers: []) { return new mat4(...numbers) }
    clone() { 
        return new mat4(
            this.a_[0],  this.a_[1],  this.a_[2],  this.a_[3],
            this.a_[4],  this.a_[5],  this.a_[6],  this.a_[7],
            this.a_[8],  this.a_[9],  this.a_[10], this.a_[11],
            this.a_[12], this.a_[13], this.a_[14], this.a_[15],
        ) 
    }



    //#region get/set

    getRow(index: number): vec4 { 
        let r = new vec4();
        for(let i = 0; i < this.col_; ++i) 
            r.set(i, this.a_[this.col_ * index + i]); 
        return r; 
    }

    getCol(index: number): vec4 { 
        let r = new vec4();
        for(let i = 0; i < this.row_; ++i) 
            r.set(i, this.a_[this.row_ * i + index]); 
        return r;
    }

    setRow(index: number, row: vec4) {
        for(let i = 0; i < this.col_; ++i)
            this.set(index, i, row.get(i))
    }

    setCol(index: number, col: vec4) {
        for(let i = 0; i < this.col_; ++i)
            this.set(i, index, col.get(i))
    }

    //#endregion
    


    //#region

    mul(that: mat4): mat4 {
        let r = mat4.zero.clone()

        for(let i = 0; i < this.row_; ++i) {
            const row = this.getRow(i)
            for(let j = 0; j < this.row_; ++j) {
                const col = that.getCol(j)
                r.set(i, j, row.dot(col))
            }
        }
        
        return r
    }
    mulAssign(that: mat4) {
        this.assign(this.mul(that))
    }

    mulVec4(that: vec4): vec4 {
        let r = vec4.zero.clone()

        for(let i = 0; i < this.row_; ++i) {
            const row = this.getRow(i)
            r.set(i, row.dot(that))
        }
        
        return r
    }

    inverse() {
        const a00 = this.a_[0]
        const a01 = this.a_[1]
        const a02 = this.a_[2]
        const a03 = this.a_[3]
        const a10 = this.a_[4]
        const a11 = this.a_[5]
        const a12 = this.a_[6]
        const a13 = this.a_[7]
        const a20 = this.a_[8]
        const a21 = this.a_[9]
        const a22 = this.a_[10]
        const a23 = this.a_[11]
        const a30 = this.a_[12]
        const a31 = this.a_[13]
        const a32 = this.a_[14]
        const a33 = this.a_[15]

        const det00 = a00 * a11 - a01 * a10
        const det01 = a00 * a12 - a02 * a10
        const det02 = a00 * a13 - a03 * a10
        const det03 = a01 * a12 - a02 * a11
        const det04 = a01 * a13 - a03 * a11
        const det05 = a02 * a13 - a03 * a12
        const det06 = a20 * a31 - a21 * a30
        const det07 = a20 * a32 - a22 * a30
        const det08 = a20 * a33 - a23 * a30
        const det09 = a21 * a32 - a22 * a31
        const det10 = a21 * a33 - a23 * a31
        const det11 = a22 * a33 - a23 * a32

        let det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06)
        if (!det) {
            return null
        }

        let invDet = 1.0 / det

        this.a_[0]  = ( a11 * det11 - a12 * det10 + a13 * det09) * invDet
        this.a_[1]  = (-a01 * det11 + a02 * det10 - a03 * det09) * invDet
        this.a_[2]  = ( a31 * det05 - a32 * det04 + a33 * det03) * invDet
        this.a_[3]  = (-a21 * det05 + a22 * det04 - a23 * det03) * invDet
        this.a_[4]  = (-a10 * det11 + a12 * det08 - a13 * det07) * invDet
        this.a_[5]  = ( a00 * det11 - a02 * det08 + a03 * det07) * invDet
        this.a_[6]  = (-a30 * det05 + a32 * det02 - a33 * det01) * invDet
        this.a_[7]  = ( a20 * det05 - a22 * det02 + a23 * det01) * invDet
        this.a_[8]  = ( a10 * det10 - a11 * det08 + a13 * det06) * invDet
        this.a_[9]  = (-a00 * det10 + a01 * det08 - a03 * det06) * invDet
        this.a_[10] = ( a30 * det04 - a31 * det02 + a33 * det00) * invDet
        this.a_[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * invDet
        this.a_[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * invDet
        this.a_[13] = ( a00 * det09 - a01 * det07 + a02 * det06) * invDet
        this.a_[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * invDet
        this.a_[15] = ( a20 * det03 - a21 * det01 + a22 * det00) * invDet

        return this
    }

    //#endregion



    //#region transform

    translate(vec: vec3): this {
        this.mulAssign(mat4.translate(vec))
        return this
    }

    scale(vec: vec3): this {
        this.mulAssign(mat4.scale(vec))
        return this
    }

    //#endregion

    //#region static

    /** model to world */

    // TODO: vec_like_type
    static translate([x, y, z]: number3): mat4 {
        return new mat4(
            1, 0, 0, x, 
            0, 1, 0, y, 
            0, 0, 1, z, 
            0, 0, 0, 1,
        )
    }

    static scale([x, y, z]: number3): mat4 {
        return new mat4(
            x, 0, 0, 0, 
            0, y, 0, 0, 
            0, 0, z, 0, 
            0, 0, 0, 1,
        )
    }

    static rotateX(theta: number): mat4 {
        const sin = Math.sin(toRadian(theta))
        const cos = Math.cos(toRadian(theta))
        return new mat4(
            1,   0,   0, 0, 
            0, cos,-sin, 0, 
            0, sin, cos, 0, 
            0,   0,   0, 1,
        )
    }
    static rotateY(theta: number): mat4 {
        const sin = Math.sin(toRadian(theta))
        const cos = Math.cos(toRadian(theta))
        return new mat4(
            cos, 0, sin, 0, 
              0, 1,   0, 0, 
           -sin, 0, cos, 0, 
              0, 0,   0, 1,
        )
    }
    static rotateZ(theta: number): mat4 {
        const sin = Math.sin(toRadian(theta))
        const cos = Math.cos(toRadian(theta))
        return new mat4(
            cos,-sin, 0, 0,
            sin, cos, 0, 0,
              0,   0, 1, 0, 
              0,   0, 0, 1,
        )
    }
    static rotate(theta: number, axis: vec3): mat4 {
        // TODO: link

        const sin = Math.sin(toRadian(theta))
        const cos = Math.cos(toRadian(theta))
        const [x,y,z] = axis.normalize()

        // Compute rotation of first, second and third basis vectors
        let m00 = x * x + (1 - x * x) * cos;   let m01 = x * y * (1 - cos) - z * sin; let m02 = x * z * (1 - cos) + y * sin;
        let m10 = x * y * (1 - cos) + z * sin; let m11 = y * y + (1 - y * y) * cos;   let m12 = y * z * (1 - cos) - x * sin;
        let m20 = x * z * (1 - cos) - y * sin; let m21 = y * z * (1 - cos) + x * sin; let m22 = z * z + (1 - z * z) * cos;

        return new mat4(
            m00, m01, m02, 0,
            m10, m11, m12, 0,
            m20, m21, m22, 0,
            0,   0,   0,   1,
        )
    }

    /** world to camera */
    
    static lookAt(position: vec3, target: vec3, up: vec3 = vec3.up): mat4 {
        let camera2world = new mat4(
            0, 0, 0, position.x,
            0, 0, 0, position.y,
            0, 0, 0, position.z,
            0, 0, 0, 1,
        )

        const dir = target.sub(position).normalize() // z
        const right = up.cross(dir).normalize() // x
        const newUp = dir.cross(right) // y
        /*
        if(isEqual(right.length(), 0)) {
            console.error(`
                up vector ${up.toString()} and viewing direction ${dir.toString()}
                passed to LookAt are pointing in the same direction.  
                Using the identity transformation.`);
            return mat4.identity.clone()
        }
        */

        return new mat4(
            ...right, -right.dot(position),
            ...newUp, -newUp.dot(position),
            ...dir,   -dir.dot(position),
            0, 0, 0, 1,
        )
    }

    /** camera to NDC */

    // OpenGL: z from -1 to 1
    // D3D: z from 1 to 0

    static frustumLH_ZO(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        const rl = right - left
        const tb = top - bottom
        const fn = far - near

        const m00 = (near * 2) / rl
        const m11 = (near * 2) / tb

        const m02 = (right + left) / rl
        const m12 = (top + bottom) / tb
        const m22 = far / fn

        const m23 = -(far * near) / fn

        return new mat4(
            m00, 0,   m02, 0,
            0,   m11, m12, 0,
            0,   0,   m22, m23, 
            0,   0,   1,   1,
        )

        /*
        return new mat4(
            m00, 0,   0,   0,
            0,   m11, 0,   0,
            m02, m12, m22, 1, 
            0,   0,   m23, 1,
        )
        */
    }

    static frustumRH_NO(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        const rl = right - left
        const tb = top - bottom
        const fn = far - near

        const m00 = (near * 2) / rl
        const m11 = (near * 2) / tb

        const m02 = (right + left) / rl
        const m12 = (top + bottom) / tb
        const m22 = -(far + near) / fn

        const m23 = -(far * near * 2) / fn

        return new mat4(
            m00, 0,   m02, 0,
            0,   m11, m12, 0,
            0,   0,   m22, m23, 
            0,   0,   -1,  1,
        )

        /*
        return new mat4(
            m00, 0,   0,   0,
            0,   m11, 0,   0,
            m20, m21, m22,-1, 
            0,   0,   m32, 1,
        )
        */
    }

    // TODO
    static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        return mat4.frustumRH_NO(left, right, bottom, top, near, far)
    }

    static perspective(fov: number, aspect: number, near: number, far: number): mat4 {
        const top = near * Math.tan(toRadian(fov) / 2.0)
        const right = top * aspect

        return mat4.frustumRH_NO(-right, right, -top, top, near, far)
    }


    static orthographicLH_ZO(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        const rl = right - left
        const tb = top - bottom
        const fn = far - near

        const m00 = 2 / rl
        const m11 = 2/ tb
        const m22 = 1 / fn

        const m03 = -(left + right) / rl
        const m13 = -(top + bottom) / tb
        const m23 = -near / fn

        return new mat4(
            m00, 0,   0,   m03,
            0,   m11, 0,   m13,
            0,   0,   m22, m23,
            0,   0,   0,   1,
        )

        /*
        return new mat4(
            m00, 0,   0,   0,
            0,   m11, 0,   0,
            0,   0,   m22, 0,
            m30, m31, m32, 1,
        )
        */
    }

    static orthographicRH_NO(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        const rl = right - left
        const tb = top - bottom
        const fn = far - near

        const m00 = 2 / rl
        const m11 = 2/ tb
        const m22 = -2 / fn

        const m03 = -(left + right) / rl
        const m13 = -(top + bottom) / tb
        const m23 = -(far + near) / fn

        return new mat4(
            m00, 0,   0,   m03,
            0,   m11, 0,   m13,
            0,   0,   m22, m23,
            0,   0,   0,   1,
        )

        /*
        return new mat4(
            m00, 0,   0,   0,
            0,   m11, 0,   0,
            0,   0,   m22, 0,
            m30, m31, m32, 1,
        )
        */
    }

    static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
        return mat4.orthographicRH_NO(left, right, bottom, top, near, far)
    }

    //#endregion
}

export class mat4i extends Mat4Base<mat4i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new mat4i()
    static readonly identity = new mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)

    constructor(
        _00 = 0, _01 = 0, _02 = 0, _03 = 0,
        _10 = 0, _11 = 0, _12 = 0, _13 = 0,
        _20 = 0, _21 = 0, _22 = 0, _23 = 0,
        _30 = 0, _31 = 0, _32 = 0, _33 = 0) {
            
        super()
        // this.arguments
        this.init_([
            _00, _01, _02, _03,
            _10, _11, _12, _13,
            _20, _21, _22, _23,
            _30, _31, _32, _33
        ])
    }

    create(numbers: []) { return new mat4i(...numbers) }
    clone() { 
        return new mat4i(
            this.a_[0],  this.a_[1],  this.a_[2],  this.a_[3],
            this.a_[4],  this.a_[5],  this.a_[6],  this.a_[7],
            this.a_[8],  this.a_[9],  this.a_[10], this.a_[11],
            this.a_[12], this.a_[13], this.a_[14], this.a_[15],
        ) 
    }
}

//#endregion



//#region mat3x4

type number12_ = [
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
]

class mat3x4 extends MatOperator<mat3x4> {
    protected a_ = new Float32Array(this.length_)
    protected readonly row_ = 3
    protected readonly col_ = 4
    protected readonly length_ = 12

    static readonly zero     = new mat3x4()
    static readonly identity = new mat3x4(1,0,0,0, 0,1,0,0, 0,0,1,0)

    constructor(
        _00 = 0, _01 = 0, _02 = 0, _03 = 0,
        _10 = 0, _11 = 0, _12 = 0, _13 = 0,
        _20 = 0, _21 = 0, _22 = 0, _23 = 0) {

        super()

        this.init_([
            _00, _01, _02, _03,
            _10, _11, _12, _13,
            _20, _21, _22, _23,
        ])
    }
    protected init_(values: number12_) {
        for(let i = 0; i < this.length_; ++i) {
            this.a_[i] = values[i]
        }
    }

    create(numbers: []) { return new mat3x4(...numbers) }
    clone() {
        const m = this.a_
        return new mat3x4(
            m[0],  m[1],  m[2],  m[3],
            m[4],  m[5],  m[6],  m[7],
            m[8],  m[9],  m[10], m[11]
        ) 
    }
}

//#endregion
