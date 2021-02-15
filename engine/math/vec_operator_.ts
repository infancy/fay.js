// type float = 'float'



//declare vec_operator_
//type vec_type_ = T extends vec_operator_<T>
// T = vec_type???
// vec_operator_<T>
export abstract class vec_operator_<T extends vec_operator_<T>> {

    protected abstract a_ : TypedArray
    protected abstract length_ : number
    abstract clone() : T
    abstract isEqual(right: T): boolean

    //#region +-*/


    /** let c = a.add(b) => c = a + b */
    add(right:T) : T {
        // return this.clone().addAssign(right)
        let result : T = this.clone()
        result.addAssign(right)
        return result
    }



    /** a.addAssign(b) => a += b */
    addAssign(right: T) {
        for(let i = 0; i < this.length_; ++i) { this.a_[i] += right.a_[i] }
    }

    addAssignScalar(right: number) { for(let i = 0; i < this.length_; ++i) { this.a_[i] += right } }
    subAssignScalar(right: number) { for(let i = 0; i < this.length_; ++i) { this.a_[i] -= right } }
    mulAssignScalar(right: number) { for(let i = 0; i < this.length_; ++i) { this.a_[i] *= right } }
    divAssignScalar(right: number) { for(let i = 0; i < this.length_; ++i) { this.a_[i] /= right } }

    //#endregion


    //#region dot, cross

    dot(right: T): T {

    }

    cross(right: T): T {
        
    }

    //#endregion

    
    /** v.to(M) => M * v */
    // warning! very special method, means 'transfrom to', look like v*M, actully is M*v
    // TOOD: to<V, M, R>
    // to(a:T, b:T) : this
    to(mat: any) : this {
        // TODO
        return this
    }



    //#region compare

    notEqual(right: T): boolean {
        return !this.isEqual(right)
    }
}
