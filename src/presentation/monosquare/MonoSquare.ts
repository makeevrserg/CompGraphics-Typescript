// Рисует зелёный треугольник

"use strict";

import BuffersInfo from "../base/BuffersInfo";
import IPresentation from "../base/IPresentation";
import { makeF32ArrayBuffer, prepareScene } from "../utils/Utils";
import { LazyMonoSquare, MonoSquareGL } from "./MonoSquareGL";

export class MonoSquarePresentation extends IPresentation<MonoSquareGL> {
    lazyWebGL = new LazyMonoSquare()

    buffers!: BuffersInfo

    onClicked(): void {
    }

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
