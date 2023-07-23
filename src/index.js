import GLShader from "./Render/Shader/GLShader";
import GLShaderProgram from "./Render/Shader/GLShaderProgram";
import vertexShaderSource from "./Render/Shader/VertexShaderSource";
import fragmentShaderSource from "./Render/Shader/FragmentShaderSource";
import Mat4 from "./Math/Mat4";
import GLViewport from "./Render/GLViewport";
import Game from "./Game";



(() => {
    let canvas = document.getElementById("render-area");

    if (!canvas) {
        canvas = document.createElement("canvas");
    }

    const glViewPort = new GLViewport(canvas);

    document.body.appendChild(canvas);

    let gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }

    //console.log("Rebuild")

    window.onload = () => {
        const game = new Game();
    }

    const vertexShader = GLShader.createVertex(gl, vertexShaderSource);
    const fragmentShader = GLShader.createFragment(gl, fragmentShaderSource);

    const program = GLShaderProgram.create(gl, vertexShader, fragmentShader);

    let glTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, glTexture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        5,
        5,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
    );

    const colorData = new Uint8Array([255, 0, 0, 255]);

    gl.texSubImage2D(gl.TEXTURE_2D, 0, 1, 1,
        1, 1, gl.RGBA, gl.UNSIGNED_BYTE, colorData);

    let buffer = gl.createBuffer();
    if (buffer === null) throw new Error("Buffer was not created!");


    const bufferData = new Float32Array([
        -0.7, -0.7, 0,
        0, 1,
        -0.7, 0.7, 0,
        0, 0,
        0.7, 0.7, 0,
        1, 0,
        0.7, 0.7, 0,
        1, 0,
        0.7, -0.7, 0,
        1, 1,
        -0.7, -0.7, 0,
        0, 1,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    let attribPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(attribPosition);

    gl.vertexAttribPointer(
        attribPosition, 3, gl.FLOAT, false, 20, 0);


    let uvAttribPosition = gl.getAttribLocation(program, "a_texcoord");
    gl.enableVertexAttribArray(uvAttribPosition);

    gl.vertexAttribPointer(
        uvAttribPosition, 2, gl.FLOAT, false, 20, 12);

    // look up uniform locations

    let matrixLocation = gl.getUniformLocation(program, "u_matrix");

    let x = 0;

    setInterval(() => {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, glViewPort.width, glViewPort.height);

        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);


        let cameraMatrix = Mat4.translation(x, 0, 0);

        gl.uniformMatrix4fv(matrixLocation, false, cameraMatrix);

        let offset = 0;
        let count = 6;

        gl.drawArrays(gl.TRIANGLES, offset, count);
    }, 100);

})();


