// Рисует зелёный треугольник

"use strict";

import BuffersInfo from "../base/BuffersInfo";
import IPresentation from "../base/IPresentation";
import Lazy from "../base/Lazy";
import { getCanvas, IRenderer } from "../base/IRenderer";
import { makeF32ArrayBuffer, prepareScene } from "../utils/Utils";
import VertexShader from "./native/VertexShader.vert";
import FragmentShader from "./native/FragmentShader.frag";
class MonoSquareGL extends IRenderer { }
export class MonoSquarePresentation extends IPresentation<MonoSquareGL> {
    lazyWebGL = new Lazy(() => new MonoSquareGL(getCanvas(), VertexShader, FragmentShader))

    buffers!: BuffersInfo

    onLoaded(): void {

        console.log("MonoSquarePresentation: onLoaded")
        const positions = [
            [-1 / 2, +1 / 2],
            [+1 / 2, +1 / 2],
            [+1 / 2, -1 / 2],
            [-1 / 2, -1 / 2]
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
