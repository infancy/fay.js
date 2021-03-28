// type float = 'float'

export type TypedArray = Int8Array    | Uint8Array   | Uint8ClampedArray |
                  Int16Array   | Uint16Array  |
                  Int32Array   | Uint32Array  |
                  Float32Array | Float64Array;

//declare vec_operator_
//type vec_type_ = T extends vec_operator_<T>
// T = vec_type???
// vec_operator_<T>
export abstract class VecOperator<T extends VecOperator<T>> {

    protected abstract a_ : TypedArray
    protected abstract length_ : number
    abstract clone() : T
    abstract isEqual(that: T): boolean
    //protected abstract typeName_(): string



    //#region access

    get(index: number): number { return this.a_[index] }

    set(index: number, value: number) { this.a_[index] = value }

    *[Symbol.iterator]() { 
        for(let i = 0; i < this.length_; ++i) {
            yield this.a_[i]
        }
    }

    //#endregion



    //#region unary

    negative() { for(let i = 0; i < this.length_; ++i) this.a_[i] = -this.a_[i] }
    inverse()  { for(let i = 0; i < this.length_; ++i) this.a_[i] = 1.0 / this.a_[i] }
    
    reset() { this.assignScalar(0) }
    /** return this */
    normalize(): this { this.mulAssignScalar(1.0 / this.length()); return this }

    //#endregion



    //#region binary

    //#region +-*/

    /** c = a + b => const c = a.add(b) */
    // TODO: return void? const c = new vec(), vec.add(c, a, b)
    // rename: addBinary?
    // return this.clone().addAssign(that)
    add(that: T) : T { let result = this.clone(); result.addAssign(that); return result; }
    sub(that: T) : T { let result = this.clone(); result.subAssign(that); return result; }
    // ???
    //mul(that: T) : T { let result = this.clone(); result.mulAssign(that); return result; }
    //div(that: T) : T { let result = this.clone(); result.divAssign(that); return result; }

    /** a.addAssign(b) => a += b */
       assign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i]  = that.a_[i] }
    addAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] += that.a_[i] }
    subAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] -= that.a_[i] }
    //mulAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] *= that.a_[i] }
    //divAssign(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] /= that.a_[i] }

    //#endregion



    //#region scalar

    addScalar(that: number): T { let result = this.clone(); result.addAssignScalar(that); return result; }
    subScalar(that: number): T { let result = this.clone(); result.subAssignScalar(that); return result; }
    mulScalar(that: number): T { let result = this.clone(); result.mulAssignScalar(that); return result; }
    divScalar(that: number): T { let result = this.clone(); result.divAssignScalar(that); return result; }

       assignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i]  = that }
    addAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] += that }
    subAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] -= that }
    mulAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] *= that }
    divAssignScalar(that: number) { for(let i = 0; i < this.length_; ++i) this.a_[i] /= that }

    //#endregion scalar

    //#endregion binary



    //#region length

    length(): number {
        return Math.sqrt(this.length())
    }

    lengthSquare(): number {
        let square = 0
        for(let i = 0; i < this.length_; ++i) 
            square += this.a_[i] * this.a_[i]
        return square
    }

    /** ||a-b|| */
    distance(that: T): number {
        return this.sub(that).length()
    }

    /** $ ||a-b||^2 $ */
    distanceSquare(that: T): number {
        return this.sub(that).lengthSquare()
    }

    //#endregion



    //#region dot, cross

    dot(that: T): number {
        let r = 0
        for(let i = 0; i < this.length_; ++i)
            r += this.a_[i] * that.a_[i]
        return r
    }

    // only for vec3
    //cross(that: T): T {}

    //#endregion



    //#region misc
    
    /** v.to(M) => M * v */
    // warning! very special method, means 'transfrom to', look like v*M, actully is M*v
    // TOOD: to<V, M, R>
    // to(a:T, b:T) : this
    to(mat: any): this {
        // TODO
        return this
    }

    notEqual(that: T): boolean {
        return !this.isEqual(that)
    }

    copyTo(that: T)   { for(let i = 0; i < this.length_; ++i) that.a_[i] = this.a_[i] }
    copyFrom(that: T) { for(let i = 0; i < this.length_; ++i) this.a_[i] = that.a_[i] }

    ceil() {for(let i = 0; i < this.length_; ++i) this.a_[i] = Math.ceil( this.a_[i]) }
    floor(){for(let i = 0; i < this.length_; ++i) this.a_[i] = Math.floor(this.a_[i]) }

    toString() {
        let str = ""
        for(let i = 0; i < this.length_; ++i) str += `${this.a_[i]}, `
        return `${this.constructor.name}(${str})` 
    }

    //#endregion



    //#region static

    static lerp(a: any, b: typeof a, t: number): typeof a {
        return a.mulScalar(t) + b.mulScalar(1 - t)
    }

    //#endregion
}



/*
type VecType = Constructor<{
    a_ : TypedArray
    length_ : number
    clone() : any
    isEqual(that: VecType): boolean
}>

export function MixinVecOperator<BaseType extends VecType>(Base: BaseType) {
    return class This extends Base {
        add(that: This) : This {
            // return this.clone().addAssign(that)
            let result: This = this.clone() // problem
            result.addAssign(that)
            return result
        }
    } 
}
*/
