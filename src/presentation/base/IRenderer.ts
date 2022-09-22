abstract class IRenderer {
    canvas!: HTMLCanvasElement;
    gl!: WebGLRenderingContext;
    triangleVerticesBuffer!: WebGLBuffer;
    triangleVerticesBufferSize!: number; // the size of the buffer - necessary for drawing trinagleVerticesBuffer
    shaderProgram!: WebGLProgram;
    vertexPositionAttribute!: number;

    defaultVertexShader!: string
    defaultFragmentShader!: string

    constructor(canvas: HTMLCanvasElement, defaultVertexShader: string, defaultFragmentShader: string) {
        this.defaultVertexShader = defaultVertexShader;
        this.defaultFragmentShader = defaultFragmentShader
        this.buildCanvas(canvas)
        this.buildGL()
        this.buildShaderProgram();
        this.setupDefaultFragmentShader()
        this.setupDefaultVertexShader()
        this.setupShaderProgram()
        this.buildVertexPositionAttribute();
        // this.setVertices([]);
        // this.drawScene();
    }

    buildCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
        this.canvas = canvas;
        return canvas
    }

    buildGL(): WebGLRenderingContext {
        this.gl = this.canvas.getContext("webgl2", {preserveDrawingBuffer: true})!;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        return this.gl;
    }

    buildShaderProgram(): WebGLProgram {
        this.shaderProgram = this.gl.createProgram()!;
        return this.shaderProgram;
    }

    setupDefaultFragmentShader(){
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)!;
        this.gl.shaderSource(fragmentShader, this.defaultFragmentShader);
        this.gl.compileShader(fragmentShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
    }

    setupDefaultVertexShader(){
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)!;
        this.gl.shaderSource(vertexShader, this.defaultVertexShader);
        this.gl.compileShader(vertexShader);
        this.gl.attachShader(this.shaderProgram, vertexShader);
    }

    setupShaderProgram(){
        this.gl.linkProgram(this.shaderProgram);
        this.gl.useProgram(this.shaderProgram);
    }

    buildVertexPositionAttribute(): number {
        this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "vertexPosition");
        this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
        return this.vertexPositionAttribute
    }

    setVertices(v: number[]) {
        this.triangleVerticesBuffer = this.gl.createBuffer()!;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVerticesBuffer);
        this.triangleVerticesBufferSize = v.length / 3;
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(v), this.gl.STATIC_DRAW);
    }

    drawScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        var resolutionUniformLocation = this.gl.getUniformLocation(this.shaderProgram, "u_resolution");
        this.gl.uniform2f(resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVerticesBuffer);
        this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.triangleVerticesBufferSize);
    }


}

function getCanvas(): HTMLCanvasElement {
    return document.querySelector("canvas") ?? <HTMLCanvasElement>document.getElementById("glcanvas")
}

export {
    IRenderer, getCanvas
}