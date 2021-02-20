


export const enum ERenderBackend {
    None = 0,
    WebGL2,
    WebGPU,
    CPU,
    Compute
}

export interface RenderBackendDesc {

}

export abstract class RenderBackend {
    constructor(desc: RenderBackendDesc) {

    }



    //#region resource creation, updating and destruction

    //#endregion resource creation, updating and destruction



    //#region render command


    //#endregion render command


    
    //#region protected

    //#endregion protected
}