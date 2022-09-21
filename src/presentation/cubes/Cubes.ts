
"use strict";
import { mat4, vec3 } from 'gl-matrix'
import BuffersInfo from "../base/BuffersInfo";
import IPresentation from "../base/IPresentation";
import Lazy from '../base/Lazy';
import { getCanvas, WebGlStlTP } from '../base/WebGlStlTP';
import { prepareScene } from "../utils/Utils";
import CubeController from "./CubeController";
import VertexShader from "./native/VertexShader.vert";
import FragmentShader from "./native/FragmentShader.frag";
export class CubesGL extends WebGlStlTP { }
// Рисует зелёный треугольник
export class CubesPresentation extends IPresentation<CubesGL> {
    lazyWebGL = new Lazy(() => new CubesGL(getCanvas(), VertexShader, FragmentShader))

    convertorRGB(R: number, G: number, B: number) {
        return [R / 255, G / 255, B / 255, 1]
    }

    controller!: CubeController

    buffers!: BuffersInfo

    onClicked(): void {
    }

    onLoaded(): void {
        this.controller = new CubeController(this.webGL);
        this.buffers = this.controller.createBuffers();
        this.drawScene();

    }

    drawScene(): void {
        const gl = this.webGL.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;

        const projectionMatrix = mat4.create();

        mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar);

        const zOffset = -10;
        const yOffset = -2.5;
        const side = 2;
        const space = 0.25;
        const center = [0, yOffset, zOffset];
        const translateList = vec3.fromValues(0, yOffset + side + space, zOffset)

        const color = this.convertorRGB(151, 181, 168)
    }


    prepareScene(): void {
        prepareScene(this.webGL, this.buffers);
    }
}