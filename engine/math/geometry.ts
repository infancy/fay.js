/* 

geometry related tools

*/

import { Drawable, Renderable } from "../core/index"
import { vec3 } from "./vec"

export class Ray {
    protected origin_: vec3
    protected direction_: vec3

    constructor(origin: vec3, direction: vec3) {
        this.origin_ = origin.clone()
        this.direction_ = direction.clone()
    }

    onDraw(canvas: HTMLCanvasElement): void {

    }
}

/*
export class Bounds3 {
    protected leftBottom_: vec3
    protected rightTop_: vec3

    onDraw(canvas: HTMLCanvasElement): void {

    }
}
*/