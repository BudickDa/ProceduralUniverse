Template.canvas.rendered = function () {
    var canvas = document.getElementById("canvas");
    var engine = new Engine(canvas);
    if (!engine.webGl) {
        console.error(500, 'Rendering failed.');
        return;
    }

    engine.webGl.clearColor(0.0, 0.0, 0.0, 1.0);
    engine.webGl.enable(engine.webGl.DEPTH_TEST);

    engine.draw();
};