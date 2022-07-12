const app = new PIXI.Application({
    backgroundAlpha: false,
    resolution: window.devicePixelRatio,
});

app.renderer.backgroundColor = 0x000000;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.view.style.width = window.innerWidth + "px";
app.view.style.height = window.innerHeight + "px";

export default app;
