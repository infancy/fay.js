import "../plugin/WebGPU/index"

//#region Enum

// vertex attribute usage
enum VertexAttribUsage
{
    none,

    // position2d,
    position, 
    normal,

    tangent,
    bitangent,

    bone_index,
    bone_weight,

    color0,
    color1,
    color2,
    color3,

    texcoord0,
    texcoord1,
    texcoord2,
    texcoord3,

    // instance
    instance_model,

    unknown0,
    unknown1,
    unknown2,
    unknown3,
}

enum VertexAttriFormat
{
    none,
    
    float1,
    float2,
    float3,
    float4,
    // floatx, could use float1 * 16 or float4 * 4

    // WARNING: The following type in opengl maybe need to normalized
    short2,
    short4,

    byte4,
    ubyte4,
};

class VertexAttribute_ {
    usage_: VertexAttribUsage
    format_: VertexAttriFormat
    num_: number
    index_: number

    constructor(usage: VertexAttribUsage, format: VertexAttriFormat, num, index) {
        this.usage_ = usage
        this.format_ = format
        this.num_ = num
        this.index_ = index
    }

    isEqual(that: VertexAttribute_) {
        return (this.usage_ === that.usage_) && (this.format_ === that.format_) && (this.num_ === that.num_) && (this.index_ === that.index_) 
    }
}

/*
class VertexLayout extends Array<VertexAttribute> {
    constructor(...args) {
        super(...args)
    }
}
*/

interface VertexAttributeKV {
    usage: VertexAttribUsage
    format: VertexAttriFormat
    num: number
}

class VertexLayout {
    private attribs_: VertexAttribute_[]

    constructor(attribs: VertexAttributeKV[]) {
        for(let a of attribs) {
            if(a.num == 1) {
                this.attribs_.push(new VertexAttribute_(a.usage, a.format, a.num))
            } else {

            }
        }
    }
}

//#endregion Enum

//#region RenderType

class RenderID<T extends RenderID<T>> {
    private value: number

    constructor(value = 0) {
        this.value = value
    }

    isValid(): boolean {
        return this.value > 0
    }

    isEqual(that: T) {
        return this.value === that.value
    }
}

export class BufferID   extends RenderID<BufferID> {}
export class TextureID  extends RenderID<TextureID> {}
export class AccelID    extends RenderID<AccelID> {}
export class RespackID  extends RenderID<RespackID> {}
export class ShaderID   extends RenderID<ShaderID> {}
export class PipelineID extends RenderID<PipelineID> {}
export class FrameID    extends RenderID<FrameID> {}



export class BufferDesc {
    name: string = "buffer"
    data: Float32Array

    usageType: typeof GPUBufferUsage
    storageType: GPU
}

// path:"texture/xx.jpg" => "../assets/textures/xx.jpg"
export class TextureDesc {

}

export class AccelDesc {

}

export class RespackDesc {

}

export class ShaderDesc {

}

export class PipelineDesc {

}

export class FrameDesc {

}

//#endregion RenderType