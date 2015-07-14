class ZoomStage extends PIXI.Container {
    constructor( canvas ) {
        super();

        this.renderer = PIXI.autoDetectRenderer(800, 600, {
            view: canvas,
            transparent: true,
            antialias: true
        });

        // Set up canvas to autoresize when window is resized
        this.setSize();
        window.addEventListener('resize', this.setSize.bind(this), false);

        // Enable mousehweel zoom
        canvas.addEventListener('DOMMouseScroll', this.onWheel.bind(this)); // Firefox
        canvas.addEventListener('mousewheel', this.onWheel.bind(this));     // Not Firefox

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this);
    }

    setSize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    onWheel( event ) {
        let factor   = 1,
            // Firefox has "detail" prop with opposite sign to std wheelDelta
            delta    = event.wheelDelta || -event.detail,
            local_pt = new PIXI.Point(),
            point    = new PIXI.Point(event.pageX, event.pageY);

        PIXI.interaction.InteractionData.prototype.getLocalPosition(this, local_pt, point);

        if ( delta > 0 ) {
            // Zoom in
            factor = 1.1;
        } else {
            // Zoom out
            factor = 1/1.1;
        }

        this.pivot = local_pt;
        this.position = point;
        this.scale.set(this.scale.x * factor);
    }
}

export default ZoomStage;
