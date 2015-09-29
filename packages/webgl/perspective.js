class PerspectiveClass {

    static loadIdentity() {
        return Matrix.I(4);
    }

    static multMatrix(mvMatrix,m) {
        return mvMatrix.x(m);
    }

    static mvTranslate(mvMatrix,v) {
        Perspective.multMatrix(mvMatrix,Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
    }

    static setMatrixUniforms(context) {
        var perspectiveMatrix = context.perspectiveMatrix;
        var mvMatrix = context.mvMatrix;

        var pUniform = context.webGl.getUniformLocation(shaderProgram, "uPMatrix");
        context.webGl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

        var mvUniform = context.webGl.getUniformLocation(shaderProgram, "uMVMatrix");
        context.webGl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
    }
}
Perspective = PerspectiveClass;