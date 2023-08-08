const GLFragmentShaderSource = `#version 300 es

precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {

    vec4 texData = texture(u_texture, v_texcoord);
    
    outColor = vec4(0, texData.r * 255.0, 0, 1);
}`;

export default GLFragmentShaderSource;