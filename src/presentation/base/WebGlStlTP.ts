abstract class WebGlStlTP {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    triangleVerticesBuffer: WebGLBuffer;
    triangleVerticesBufferSize!: number; // the size of the buffer - necessary for drawing trinagleVerticesBuffer
    shaderProgram!: WebGLProgram;
    vertexPositionAttribute!: number;
    VertexShader!: string
    FragmentShader!: string
    constructor(canvas: HTMLCanvasElement, VertexShader: string, FragmentShader: string) {
        this.VertexShader = VertexShader;
        this.FragmentShader = FragmentShader
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })!;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.initShaders();
        this.triangleVerticesBuffer = this.gl.createBuffer()!;
        this.setVertices([]);
        this.drawScene();
    }

    initShaders() {
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)!;
        this.gl.shaderSource(fragmentShader, this.FragmentShader);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert("An error occurred compiling fragmentShader: " + this.gl.getShaderInfoLog(fragmentShader));
            return null;
        }
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)!;
        this.gl.shaderSource(vertexShader, this.VertexShader);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("An error occurred compiling vertexShader: " + this.gl.getShaderInfoLog(vertexShader));
            return null;
        }
        this.shaderProgram = this.gl.createProgram()!;
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);
        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(this.shaderProgram));
        }
        this.gl.useProgram(this.shaderProgram);

        this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "vertexPosition");
        this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
    }

    setVertices(v: number[]) {
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
    WebGlStlTP, getCanvas
}