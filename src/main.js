import ZoomStage from './ZoomStage';

function getRandCoords() {
    return {
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight)
    };
}

document.addEventListener('DOMContentLoaded', function ( event ) {
    let stage = new ZoomStage(document.getElementById('the_canvas')),
        gfx   = new PIXI.Graphics(),
        last  = getRandCoords();

    gfx.lineStyle(10, 0x333333)
       .beginFill(0xFC0065)
       .drawCircle(last.x, last.y, 50);

    for ( let i = 0; i < 20; i++ ) {
        let new_ = getRandCoords();
        gfx.moveTo(last.x, last.y)
           .lineTo(new_.x, new_.y)
           .drawCircle(new_.x, new_.y, 50);
        last = new_;
    }

    gfx.lineStyle(0).endFill();

    stage.addChild(gfx);
});
