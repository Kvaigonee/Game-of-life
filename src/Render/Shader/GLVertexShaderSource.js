const vertexSource = `#version 300 es

in vec2 a_position;
in vec2 a_texcoord;

uniform vec3 u_transform;

uniform vec2 u_resolution;

out vec2 v_texcoord;

void main() {

    vec2 position = a_position * u_transform.z + vec2(u_transform.x, u_transform.y);

    vec2 zeroToOne = position / u_resolution;

    vec2 zeroToTwo = zeroToOne * 2.0;

    vec2 clipSpace = (zeroToTwo - 1.0) * vec2(1, -1);
    
    gl_Position = vec4(clipSpace, 0, 1);
    
    v_texcoord = a_texcoord;
}`;

export default vertexSource;