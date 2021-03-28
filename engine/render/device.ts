
import {ERenderBackend, RenderDesc, RenderBackend} from "./backend_"
export {ERenderCommand, RenderCommand, RenderCommandList} from "./command"
export * from "./webgl/webgl"
export * from "./webgpu/webgpu"

// let renderer = new RenderDevice(...)
export class RenderDevice {
    private backend_ : RenderDevice

    constructor(canvasName: string) {

    }



    private createRenderBackend(desc: RenderDesc) {
        switch(desc.backend) {
            case ERenderBackend.WebGL2:
                this.backend_
                break
        }
    }
}



