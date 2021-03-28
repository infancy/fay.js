/*

basic primitive:

* Point
* Line
* Curve

* Triangle
* Rectangle
* Plane
* Cube

* Circle
* Sphere

# reference

*/

import { vec3 } from "../math/index"
//import { Drawable, Renderable } from "../core/index"

export class Point implements Drawable, Renderable {
    private a_: vec3

    constructor(a: vec3) {
        this.a_ = a.clone()
    }

    onDraw(ctx: CanvasRenderingContext2D): void {

    }
}

export class Line {
    private a_: vec3
    private b_: vec3

    constructor(a: vec3, b: vec3) {
        this.a_ = a.clone()
        this.b_ = b.clone()
    }

    onDraw(ctx: CanvasRenderingContext2D): void {

    }
}

export class Curve {

}



export class Triangle {
    private a_: vec3
    private b_: vec3
    private c_: vec3

    constructor(a: vec3, b: vec3, c: vec3) {
        this.a_ = a.clone()
        this.b_ = b.clone()
        this.c_ = c.clone()
    }

    onDraw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.moveTo(this.a_.x, this.a_.y);
        ctx.lineTo(this.b_.x, this.b_.y);
        ctx.lineTo(this.c_.x, this.c_.y);
        ctx.fill();
    }
}

export class Rectangle {
    private a_: vec3
    private b_: vec3
    private c_: vec3
    private d_: vec3

    constructor(a: vec3, b: vec3, c: vec3, d: vec3) {
        this.a_ = a.clone()
        this.b_ = b.clone()
        this.c_ = c.clone()
        this.d_ = d.clone()
    }
    
    onDraw(ctx: CanvasRenderingContext2D): void {

    }
}

export class Plane {

}

export class Cube {

}



export class Circle {

}

export class Sphere {

}