#version 300 es
in vec2 vertexPosition;

out vec2 vPosition;

void main() {
    gl_Position = vec4(vertexPosition, 0.0, 1.0);

    vPosition = vertexPosition;
}