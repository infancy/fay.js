
import {isEqual} from "./math"
import {vec_operator_} from "./vec_operator_"

export abstract class mat_operator_<T extends mat_operator_<T>> {
    protected abstract a_ : TypedArray
    protected abstract row_ : number
    protected abstract col_ : number
    protected abstract length_ : number
    abstract clone() : T

    //#region 



    //#endregion
}

//#region mat4

type number16_ = [
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
]

abstract class mat4_<T extends mat_operator_<T>> extends mat_operator_<T> {
    protected col_ = 4
    protected row_ = 4
    protected length_ = 16

    constructor(
        _00 = 0, _01 = 0, _02 = 0, _03 = 0,
        _10 = 0, _11 = 0, _12 = 0, _13 = 0,
        _20 = 0, _21 = 0, _22 = 0, _23 = 0,
        _30 = 0, _31 = 0, _32 = 0, _33 = 0) {
        super()

        this.init([
            _00, _01, _02, _03,
            _10, _11, _12, _13,
            _20, _21, _22, _23,
            _30, _31, _32, _33
        ])
    }

    protected init(values: number16_) {
        for(let i = 0; i < this.length_; ++i) {
            this.a_[i] = values[i]
        }
    }
}

export class mat4 extends mat4_<mat4> {
    protected a_ = new Float32Array(this.length_)

    static readonly zero     = new mat4()
    static readonly identity = new mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)

    clone(){ 
        return new mat4(
            this.a_[0],  this.a_[1],  this.a_[2],  this.a_[3],
            this.a_[4],  this.a_[5],  this.a_[6],  this.a_[7],
            this.a_[8],  this.a_[9],  this.a_[10], this.a_[11],
            this.a_[12], this.a_[13], this.a_[14], this.a_[15],
        ) 
    }
}

export class mat4i extends mat4_<mat4i> {
    protected a_ = new Int32Array(this.length_)

    static readonly zero    = new mat4i()
    static readonly one     = new mat4i(1, 1, 1, 1)

    clone(){ 
        return new mat4i(
            this.a_[0],  this.a_[1],  this.a_[2],  this.a_[3],
            this.a_[4],  this.a_[5],  this.a_[6],  this.a_[7],
            this.a_[8],  this.a_[9],  this.a_[10], this.a_[11],
            this.a_[12], this.a_[13], this.a_[14], this.a_[15],
        ) 
    }
}

//#endregion
