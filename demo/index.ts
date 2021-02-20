import * as fay from '../engine/index';

const canvas = document.getElementById('fay-canvas') as HTMLCanvasElement;
canvas.width = 1080
canvas.height = 640;

const renderer = new fay.Renderer(canvas);
renderer.start();
