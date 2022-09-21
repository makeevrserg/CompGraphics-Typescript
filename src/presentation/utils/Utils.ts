import BuffersInfo from "../base/BuffersInfo"
import { WebGlStlTP } from "../base/WebGlStlTP"

export function makeF32ArrayBuffer(gl: WebGLRenderingContext, array: number[]): WebGLBuffer {
    // Создаём буфер
    const buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // Заполняем буффер массивом флоатов
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(array),
        gl.STATIC_DRAW
    )
    return buffer
}

export function prepareScene( webGL: WebGlStlTP, buffers: BuffersInfo) {
    // Чистим экран
    const gl = webGL.gl

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Подключаем VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer);

    gl.enableVertexAttribArray(
        webGL.vertexPositionAttribute
    );

    // Устанавливаем используемую программу
    gl.useProgram(webGL.shaderProgram);


}