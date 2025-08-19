(function () {
    function initBackground() {
        const { app, CFG } = window.Game;

        const bg = new PIXI.Sprite(PIXI.Texture.EMPTY);
        bg.anchor.set(0.5);
        app.stage.addChild(bg);

        function setTexture(tex) {
            bg.texture = tex;
        }

        function layoutBackground() {
            const sw = app.screen.width, sh = app.screen.height;
            bg.scale.set(CFG.BG_SCALE_X, CFG.BG_SCALE_Y);
            bg.x = sw / 2;
            bg.y = sh / 2;
        }

        function getBounds() {
            const halfW = bg.width / 2;
            const halfH = bg.height / 2;
            return {
                left:   bg.x - halfW,
                right:  bg.x + halfW,
                top:    bg.y - halfH,
                bottom: bg.y + halfH
            };
        }

        window.Game.background = { sprite: bg, setTexture, layoutBackground, getBounds };
        window.Game.onResizeCbs.push(layoutBackground);
    }

    window.GameInitBackground = initBackground;
})();