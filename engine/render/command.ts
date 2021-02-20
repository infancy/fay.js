import { RenderBuffer, RenderTexture, RenderShader, RenderPipeline, RenderFrame } from "./resource"

export enum ERenderCommand {

}

export class RenderCommand {
    private type_ : ERenderCommand;

    constructor() {

    }
}

export class RenderCommandList {
    private cmds_ : RenderCommand[]

    constructor() {
        
    }
}