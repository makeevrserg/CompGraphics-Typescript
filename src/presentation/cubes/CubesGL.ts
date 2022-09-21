import Lazy from "../base/Lazy";
import { getCanvas, WebGlStlTP } from "../base/WebGlStlTP";

class CubesGL extends WebGlStlTP {
}

class LazyCubes extends Lazy<CubesGL> {
  // Исходный код вершинного шейдера
  VertexShader = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
    `;

  // Исходный код фрагментного шейдера
  FragmentShader = `
    varying lowp vec4 vColor;
    
    void main(void) {
      gl_FragColor = vColor;
    }
    `;

  initializer(): CubesGL {
    return new CubesGL(getCanvas(), this.VertexShader, this.FragmentShader);
  }
}
export {
  CubesGL, LazyCubes
}