// Рисует зелёный треугольник

"use strict";

import BuffersInfo from "../base/BuffersInfo";
import IPresentation from "../base/IPresentation";
import { makeF32ArrayBuffer, prepareScene } from "../utils/Utils";
import VertexShader from "./native/VertexShader.vert";
import FragmentShader from "./native/FragmentShader.frag";
import { getCanvas, IRenderer } from "../base/IRenderer";
import Lazy from "../base/Lazy";
class TriangleGL extends IRenderer { }
export class TrianglePresentation extends IPresentation<TriangleGL> {
    lazyWebGL = new Lazy(() => new TriangleGL(getCanvas(), VertexShader, FragmentShader))



    buffers!: BuffersInfo

    onLoaded(): void {

        console.log("TrianglePresentation: onLoaded")
        const positions = [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ].flat()
        const positionBuffer = makeF32ArrayBuffer(this.webGL.gl, positions);
        this.buffers = {
            positionBuffer: positionBuffer,
            length: positions.length
        }
        this.drawScene()
    }

    drawScene(): void {
        const gl = this.webGL.gl;
        gl.vertexAttribPointer(
            this.webGL.vertexPositionAttribute,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.drawArrays(
            gl.TRIANGLE_FAN,
            0,
            this.buffers.length / 2
        );
    }

    prepareScene(): void {
        prepareScene(this.webGL, this.buffers);
    }
}