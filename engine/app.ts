import * as fay from '../engine/index';

export abstract class app {
    protected canvas: HTMLCanvasElement
    private animationHandle: number

    abstract setup()
    abstract update()
    abstract clear()

    private init_() {
        this.canvas = document.getElementById('fay-canvas') as HTMLCanvasElement;
        this.canvas.width = 1080
        this.canvas.height = 640;
    }

    private update_ = () => {
        this.update()
        this.animationHandle = requestAnimationFrame(this.update_)
    }

    run() {
        this.init_()
        this.setup()

        this.update_()

        // clear()
        // destruct_()
    }

    destruct_() {
        cancelAnimationFrame(this.animationHandle)
    }
}