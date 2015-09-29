triangleVertexPositionBuffer = {};
squareVertexPositionBuffer = {};


class EngineClass {
    constructor(canvas) {
        var webGl = {};
        try {
            webGl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            webGl.viewport(0, 0, canvas.width, canvas.height);
        } catch (e) {
            console.log(500, e);
        }
        if (!webGl) {
            console.log(500, 'Could not initialize WebGl');
        } else {
            this.webGl = webGl;
            this.initShader();
            this.initBuffer();
        }
    }

    initShader(){
        var fragmentShader = this.getShader(shaderFs);
        var vertexShader = this.getShader(shaderVs);
        shaderProgram = this.webGl.createProgram();
        this.webGl.attachShader(shaderProgram, vertexShader);
        this.webGl.attachShader(shaderProgram, fragmentShader);
        this.webGl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!this.webGl.getProgramParameter(shaderProgram, this.webGl.LINK_STATUS)) {
            console.error(500,'Unable to initialize the shader program.');
        }

        this.webGl.useProgram(shaderProgram);
        this.shaderProgram = shaderProgram;
    }

    getShader(shaderScript){
        var shader;
        if (shaderScript.type === 'x-shader/x-fragment') {
            shader = this.webGl.createShader(this.webGl.FRAGMENT_SHADER);
        } else if (shaderScript.type == 'x-shader/x-vertex') {
            shader = this.webGl.createShader(this.webGl.VERTEX_SHADER);
        } else {
            return null;
        }

        this.webGl.shaderSource(shader, shaderScript.shader);
        this.webGl.compileShader(shader);

        if (!this.webGl.getShaderParameter(shader, this.webGl.COMPILE_STATUS)) {
            console.error(500, this.webGl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    initBuffer(){
        squareVerticesBuffer = this.webGl.createBuffer();
        this.webGl.bindBuffer(this.webGl.ARRAY_BUFFER, squareVerticesBuffer);

        var vertices = [
            1.0,  1.0,  0.0,
            -1.0, 1.0,  0.0,
            1.0,  -1.0, 0.0,
            -1.0, -1.0, 0.0
        ];

        this.webGl.bufferData(this.webGl.ARRAY_BUFFER, new Float32Array(vertices), this.webGl.STATIC_DRAW);
    }

    draw() {
        var gl = this.webGl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

        this.mvMatrix = Perspective.loadIdentity();
        Perspective.mvTranslate(this.mvMatrix,[-0.0, 0.0, -6.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
        gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        Perspective.setMatrixUniforms(this);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}


Engine = EngineClass;