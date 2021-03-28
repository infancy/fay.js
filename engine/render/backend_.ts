


export const enum ERenderBackend {
    None = 0,
    WebGL2,
    WebGPU,
    CPU,
    Compute
}

export class RenderDesc {
    backend: ERenderBackend = ERenderBackend.WebGL2
}

export abstract class RenderBackend {
    constructor(desc: RenderDesc) {

    }



    //#region resource 
    
    //create, update and delete

    //#endregion



    //#region command


    //#endregion command



    //#region protected

    //#endregion protected
}