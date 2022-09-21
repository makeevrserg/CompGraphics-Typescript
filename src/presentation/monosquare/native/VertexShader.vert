#version 300 es
// Координаты вершины. Атрибут, инициализируется через буфер.
in vec2 vertexPosition;

// Выходной параметр с координатами вершины, интерполируется и передётся во фрагментный шейдер 
out vec2 vPosition;

void main() {
    gl_Position = vec4(vertexPosition, 0.0, 1.0);

    vPosition = vertexPosition;
}