// js/player.js
(function () {
    function initPlayer() {
        if (window.Game.player) return;

        const { app, CFG, background } = window.Game;

        // ------------ Anim frame üretici ------------
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

        // ------------ Hitbox / çarpışma yardımcıları ------------
        const HITBOX = { top: 4, bottom: 10, left: 6, right: 6 }; // ince ayar yapabilirsin
        const EPS = 0.001;

        function getHalfSizes() {
            const hw = (CFG.GRID_W * CFG.SCALE) / 2;
            const hh = (CFG.GRID_H * CFG.SCALE) / 2;
            return { hw, hh };
        }

        // Oyuncunun inset'li AABB'si (sprite'tan küçük)
        function getPlayerAABBAt(x, y) {
            const { hw, hh } = getHalfSizes();
            return {
                left:   x - hw + HITBOX.left,
                right:  x + hw - HITBOX.right,
                top:    y - hh + HITBOX.top,
                bottom: y + hh - HITBOX.bottom
            };
        }

        function platformRects() {
            const out = [];
            const list = window.Game.platforms?.list || [];
            for (const rec of list) {
                const s = rec.sprite;
                if (!s || !s.visible || s.worldAlpha === 0) continue;
                out.push({ left: s.x, right: s.x + s.width, top: s.y, bottom: s.y + s.height });
            }
            return out;
        }

        function overlaps(a, b) {
            return (a.left < b.right - EPS) && (a.right > b.left + EPS) &&
                (a.top  < b.bottom - EPS) && (a.bottom > b.top + EPS);
        }

        // ------------ Sprite ------------
        const player = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
        player.anchor.set(0.5);
        player.scale.set(CFG.SCALE);
        player.animationSpeed = 0.12;
        app.stage.addChild(player);

        // Anim setleri
        let idleFrames = null;
        let walkFrames = null;

        function setSheet(baseTexture) {
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
            clampToBackground(); // X sınırı
        }

        let currentAnim = "idle";
        function setAnim(name, reset = false) {
            if (currentAnim !== name || reset) {
                currentAnim = name;
                if (name === "idle") {
                    player.textures = idleFrames; player.animationSpeed = 0.12; player.loop = true;
                } else { // walk ya da jump yoksa da yürüyüşle idare
                    player.textures = walkFrames; player.animationSpeed = 0.14; player.loop = true;
                }
                player.gotoAndPlay(0);
            }
        }

        // ------------ Input ------------
        const keys = {};
        addEventListener("keydown", e => {
            const c = e.code;
            if (["ArrowLeft","ArrowRight","ArrowUp","Space"].includes(c)) e.preventDefault();
            keys[c] = true;
        });
        addEventListener("keyup", e => { keys[e.code] = false; });

        // ------------ Fizik ------------
        let vy = 0;
        const SPEED = 4.6;
        const GRAVITY = 0.5;
        const JUMP_STRENGTH = -9.5;
        const MAX_FALL = 10.0;
        let onGround = false;

        function tick() {
            const dt = app.ticker.deltaTime;

            const { hw, hh } = getHalfSizes();
            const b = background.getBounds();
            const floorY = Math.floor(Math.min(b.bottom - hh, (app.screen.height - CFG.FOOTER_H) - hh));
            const ceilY  = Math.ceil(b.top + hh);

            // --- X hareketi
            let dx = 0;
            if (keys.ArrowLeft)  dx -= SPEED * dt;
            if (keys.ArrowRight) dx += SPEED * dt;

            if (dx < 0) player.scale.x = -CFG.SCALE;
            if (dx > 0) player.scale.x =  CFG.SCALE;

            // yerdeyken anim
            const moving = Math.abs(dx) > 0.01;
            if (onGround) setAnim(moving ? "walk" : "idle");

            // --- Zıplama + yerçekimi
            if ((keys.Space || keys.ArrowUp) && onGround) {
                vy = JUMP_STRENGTH; onGround = false;
            }
            vy += GRAVITY * dt;
            if (vy > MAX_FALL) vy = MAX_FALL;

            // 1) X çöz
            const prevX = player.x;
            player.x = Math.round(player.x + dx);
            clampToBackground();            // BG dışına çıkma
            resolveX(prevX, player.x);      // platform yan çarpışmaları

            // 2) Y çöz
            const prevY = player.y;
            player.y += vy;

            // tavan
            if (player.y < ceilY) { player.y = ceilY; if (vy < 0) vy = 0; }

            const landed = resolveY(prevY, player.y);

            // taban (BG zemini)
            if (!landed && player.y >= floorY) {
                player.y = floorY; vy = 0; onGround = true;
            } else if (!landed) {
                // walk-off: platformdan ayrıldıysan havadasın
                onGround = false;
            }

            if (!onGround) setAnim("walk"); // ayrı jump setin yok; yürüyüşle dönsün
        }

        // --- Yan çarpışma ---
        function resolveX(prevX, curX) {
            const rects = platformRects();
            if (!rects.length) return;

            let a = getPlayerAABBAt(player.x, player.y);
            for (const r of rects) {
                if (!overlaps(a, r)) continue;

                if (curX > prevX) {
                    const pen = a.right - r.left;
                    player.x -= pen + EPS;
                } else if (curX < prevX) {
                    const pen = r.right - a.left;
                    player.x += pen + EPS;
                }
                a = getPlayerAABBAt(player.x, player.y); // güncelle
            }
        }

        // --- Dikey çarpışma (üst/alt) ---
        function resolveY(prevY, curY) {
            const rects = platformRects();
            if (!rects.length) return false;

            let a = getPlayerAABBAt(player.x, player.y);
            let landed = false;

            for (const r of rects) {
                if (!overlaps(a, r)) continue;

                if (curY > prevY) { // aşağı inerken
                    const pen = a.bottom - r.top;
                    player.y -= pen + EPS;
                    vy = 0; onGround = true; landed = true;
                } else if (curY < prevY) { // yukarı zıplarken
                    const pen = r.bottom - a.top;
                    player.y += pen + EPS;
                    vy = 0;
                }
                a = getPlayerAABBAt(player.x, player.y);
            }
            return landed;
        }

        // --- Sadece X sınırı (hitbox'a göre pad) ---
        function clampToBackground() {
            const { hw } = getHalfSizes();
            const pad = hw - Math.max(HITBOX.left, HITBOX.right);
            const b = background.getBounds();
            const minX = Math.ceil(b.left  + pad);
            const maxX = Math.floor(b.right - pad);
            player.x = Math.max(minX, Math.min(maxX, player.x));
        }

        // ------------ Dışa aç ------------
        window.Game.player = { sprite: player, layoutPlayer, setSheet, tick };

        window.Game.onResizeCbs.push(layoutPlayer);
        window.Game.onTickCbs.push(tick);
    }

    window.GameInitPlayer = initPlayer;
})();