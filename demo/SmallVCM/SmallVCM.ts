import * as fay from '../../engine/index'
import { vec3 } from '../../engine/index'

const canvas = document.getElementById('fay-canvas') as HTMLCanvasElement;
//canvas.width = canvas.height = 640;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D


//ctx.fillStyle = "rgb(200,0,0)";

const triangle = new fay.Triangle(new vec3(0, 0, 0), new vec3(100, 100, 1), new vec3(100, -100, 1))
triangle.onDraw(ctx)
