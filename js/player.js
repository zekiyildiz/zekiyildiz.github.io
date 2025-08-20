(function () {
    function initPlayer() {
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
            if (!baseTexture.valid) {
                baseTexture.once("update", () => setSheet(baseTexture));
                return;
            }
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
                if (name === "idle") player.textures = idleFrames;
                else if (name === "walk") player.textures = walkFrames;
                player.animationSpeed = (name === "idle") ? 0.12 : 0.16;
                player.gotoAndPlay(0);
            }
        }

        // --- Input ---
        const keys = {};
        addEventListener("keydown", e => {
            const c = e.code;
            if (["ArrowLeft","ArrowRight","Space"].includes(c)) e.preventDefault();
            keys[c] = true;
        });
        addEventListener("keyup", e => { keys[e.code] = false; });

        // --- Fizik Değişkenleri ---
        let vy = 0;
        // --- Parametreler (daha yumuşak) ---
        const SPEED        = 4.4;   // 2.0 → 1.4
        const GRAVITY      = 0.45;  // 0.8 → 0.45
        const JUMP_STRENGTH= -9.5;  // -12 → -9.5
        const MAX_FALL     = 10.0;  // terminal hız
        let onGround = false;

        function tick() {
            // dt: 60 FPS'te ~1, 30 FPS'te ~2 olur → hız sabit kalır
            const dt = app.ticker.deltaTime;

            let dx = 0;
            if (keys.ArrowLeft)  dx -= SPEED * dt;
            if (keys.ArrowRight) dx += SPEED * dt;

            if (dx < 0) player.scale.x = -CFG.SCALE;
            if (dx > 0) player.scale.x =  CFG.SCALE;

            const moving = Math.abs(dx) > 0.01;
            setAnim(moving ? "walk" : "idle");

            // Zıplama (yerdeyken)
            if (keys.Space && onGround) {
                vy = JUMP_STRENGTH;   // tek atım
                onGround = false;
            }

            // Yerçekimi
            vy += GRAVITY * dt;
            if (vy > MAX_FALL) vy = MAX_FALL;

            player.y += vy;

            // Zemin
            const pad = (CFG.GRID_W * CFG.SCALE) / 2;
            const b = background.getBounds();
            const footerTop = app.screen.height - CFG.FOOTER_H;
            const groundY = Math.floor(Math.min(b.bottom - pad, footerTop - pad));

            if (player.y >= groundY) {
                player.y = groundY;
                vy = 0;
                onGround = true;
            }

            // X hareketi + sınır
            player.x = Math.round(player.x + dx);
            clampToBackground(); // senin fonksiyonun (X’i kısıtlaması yeterli)
        }

        function clampToBackground() {
            const pad = (CFG.GRID_W * CFG.SCALE) / 2;
            const b = background.getBounds();
            const footerTop = app.screen.height - CFG.FOOTER_H;

            const minX = Math.ceil(b.left  + pad);
            const maxX = Math.floor(b.right - pad);

            player.x = Math.max(minX, Math.min(maxX, player.x));
        }

        // Dışa aç
        window.Game.player = { sprite: player, layoutPlayer, setSheet, tick };

        window.Game.onResizeCbs.push(layoutPlayer);
        window.Game.onTickCbs.push(tick);
    }

    window.GameInitPlayer = initPlayer;
})();