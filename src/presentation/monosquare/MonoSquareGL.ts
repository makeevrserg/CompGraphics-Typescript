import Lazy from "../base/Lazy";
import { getCanvas, WebGlStlTP } from "../base/WebGlStlTP";

class MonoSquareGL extends WebGlStlTP {
}

class LazyMonoSquare extends Lazy<MonoSquareGL> {


    // Исходный код вершинного шейдера
    VertexShader = `#version 300 es
    // Координаты вершины. Атрибут, инициализируется через буфер.
    in vec2 vertexPosition;
    
    // Выходной параметр с координатами вершины, интерполируется и передётся во фрагментный шейдер 
    out vec2 vPosition;
    
    void main() {
        gl_Position = vec4(vertexPosition, 0.0, 1.0);
    
        vPosition = vertexPosition;
    }
`;

    // Исходный код фрагментного шейдера
    FragmentShader = `#version 300 es
    // WebGl требует явно установить точность флоатов, так что ставим 32 бита
    precision mediump float;
    
    // Интерполированные координаты вершины, передаются из вершинного шейдера
    in vec2 vPosition;
    
    // Цвет, который будем отрисовывать
    out vec4 color; 
    
    int colorPrefer = 1; 
    void main() {
    
        int sum; 
        float k = 12.0;
    
        if (vPosition.x>=0.0){ sum = int(vPosition.x * k)+1;}
        else {sum = int(vPosition.x * k);}
    
        if (abs(sum % 2) == 1 ){color = vec4(0.9, 0.56, 0.6, 1);} //pink
        else {color = vec4(0.7, 0.0, 0, 1);}
    }
`;

    initializer(): MonoSquareGL {
        return new MonoSquareGL(getCanvas(), this.VertexShader, this.FragmentShader);
    }
}
export {
    MonoSquareGL,
    LazyMonoSquare
}