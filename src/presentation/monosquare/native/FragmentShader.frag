#version 300 es
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