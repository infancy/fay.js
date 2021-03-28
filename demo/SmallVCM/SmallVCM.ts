/*
import * as fay from '../../engine/index'
import { vec3 } from '../../engine/index'

function draw(){
    const canvas = document.getElementById('fay-canvas') as HTMLCanvasElement;
    //canvas.width = canvas.height = 640;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    for (var i=0;i<6;i++){
        for (var j=0;j<6;j++){
        ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
                        Math.floor(255-42.5*j) + ',0)';
        ctx.fillRect(j*25,i*25,25,25);
        }
    }

    const triangle = new fay.Triangle(new vec3(0, 0, 0), new vec3(10, 10, 1), new vec3(10, -10, 1))
    triangle.onDraw(ctx)
}
*/

(function draw() {
    var canvas = document.getElementById("fay-canvas") as HTMLCanvasElement;
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 55, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (30, 30, 55, 50);
    }
})()