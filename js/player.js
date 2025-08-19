(function () {
    function initPlayer() {
        // Çifte init'e karşı emniyet
        if (window.Game.player) return;

        const { app, CFG, background } = window.Game;

        // --- Frame üretici ---
        const makeFrames = (baseTexture, row, cols) => {
            const arr = [];
            for (const col of cols) {
                const rect = new PIXI.Rectangle(
                    col * CFG.GRID_W, row * CFG.GRID_H, CFG.GRID_W, CFG.GRID_H
                );
                arr.push(new PIXI.Texture(baseTexture, rect));
            }
            return arr;
        };

        // --- Sprite ---
        const player = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
        player.anchor.set(0.5);
        player.scale.set(CFG.SCALE);
        player.animationSpeed = 0.12;
        app.stage.addChild(player);

        let idleFrames = null;
        let walkFrames = null;

        function setSheet(baseTexture) {
            // Spritesheet henüz valid değilse tekrar dener
            if (!baseTexture.valid) {
                baseTexture.once("update", () => setSheet(baseTexture));
                return;
            }
            // idle: row 0, col 0-1 | walk: row 1, col 1-4
            idleFrames = makeFrames(baseTexture, 0, [0, 1]);
            walkFrames = makeFrames(baseTexture, 1, [1, 2, 3, 4]);
            setAnim("idle", true);
        }

        function layoutPlayer() {
            player.x = Math.round(app.screen.width / 2);
            player.y = Math.round((app.screen.height - CFG.FOOTER_H) / 2);
            clampToBackground();
        }

        let current = "idle";
        function setAnim(name, reset = false) {
            if (current !== name || reset) {
                current = name;
                player.textures = (name === "idle") ? idleFrames : walkFrames;
                player.animationSpeed = (name === "idle") ? 0.12 : 0.16;
                player.gotoAndPlay(0);
            }
        }

        // --- Input ---
        const keys = {};
        addEventListener("keydown", e => {
            const c = e.code;
            if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Space"].includes(c)) e.preventDefault();
            keys[c] = true;
        });
        addEventListener("keyup",   e => { keys[e.code] = false; });

        function tick() {
            const moving = keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp || keys.ArrowDown;
            setAnim(moving ? "walk" : "idle");

            let dx = 0, dy = 0;
            if (keys.ArrowLeft)  dx -= 2;
            if (keys.ArrowRight) dx += 2;
            if (keys.ArrowUp)    dy -= 2;
            if (keys.ArrowDown)  dy += 2;

            // Diagonal hız normalizasyonu (√2 artışı engelle)
            if (dx && dy) {
                const INV_SQRT2 = 0.70710678;
                dx *= INV_SQRT2; dy *= INV_SQRT2;
            }

            // Yön flip'i
            if (dx < 0) player.scale.x = -CFG.SCALE;
            if (dx > 0) player.scale.x =  CFG.SCALE;

            player.x = Math.round(player.x + dx);
            player.y = Math.round(player.y + dy);

            clampToBackground();
        }

        function clampToBackground() {
            // BG sınırları + footer üstü
            const pad = (CFG.GRID_W * CFG.SCALE) / 2;
            const b = background.getBounds();
            const footerTop = app.screen.height - CFG.FOOTER_H;

            const minX = Math.ceil(b.left  + pad);
            const maxX = Math.floor(b.right - pad);
            const minY = Math.ceil(b.top   + pad);
            const maxY = Math.floor(Math.min(b.bottom - pad, footerTop - pad));

            player.x = Math.max(minX, Math.min(maxX, player.x));
            player.y = Math.max(minY, Math.min(maxY, player.y));
        }

        // Dışa aç
        window.Game.player = { sprite: player, layoutPlayer, setSheet, tick };

        // Lifecycle kayıtları
        window.Game.onResizeCbs.push(layoutPlayer);
        window.Game.onTickCbs.push(tick);
    }

    window.GameInitPlayer = initPlayer;
})();