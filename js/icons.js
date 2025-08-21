// js/icons.js
/* global PIXI */
(function () {
    function initIcons() {
        const { app } = window.Game;

        const icons = []; // { conf, wrap, sprite, highlight, hint, box, layout, tick, isNear }
        const byId  = {};

        function createIcon(conf, texture) {
            // 1) Sabit kutu boyu (hit/hover kutusu)
            const BOX = conf.boxSize ?? (conf.size ?? 28);

            // 2) Wrapper + sprite
            const wrap   = new PIXI.Container();
            const sprite = new PIXI.Sprite(texture);
            wrap.addChild(sprite);

            // Sprite’ı BOX içine sığdır
            const texW = texture?.orig?.width  || sprite.width;
            const texH = texture?.orig?.height || sprite.height;
            const scale = (conf.size ?? BOX) / Math.max(texW, texH); // uzun kenara göre sığdır
            sprite.scale.set(scale);
            sprite.anchor.set(0, 0);

            const sw = texW * scale, sh = texH * scale;
            sprite.x = (BOX - sw) / 2;
            sprite.y = (BOX - sh) / 2;

            // Etkileşim
            wrap.interactive = true;
            wrap.buttonMode  = true;
            wrap.on("pointertap", () => triggerAction(conf.action));

            // Highlight: daima kare (BOX x BOX)
            const highlight = new PIXI.Graphics();
            highlight.lineStyle(2, 0xffff66, 1).drawRect(0, 0, BOX, BOX);
            highlight.visible = false;
            wrap.addChild(highlight);

            // Hint: ikonun ÜSTÜNDE, parent ölçeğinden bağımsız
            const hint = new PIXI.Text(
                conf.hint || "Press Enter",
                new PIXI.TextStyle({
                    fill: 0xffff66,
                    fontSize: conf.hintSize ?? 15,
                    fontFamily: "'Press Start 2P', monospace",
                    align: "center"
                })
            );
            hint.anchor.set(0.5, 1);  // ortala ve taban yukarıda
            hint.x = BOX / 2;
            hint.y = -6;              // ikonun hemen üstünde
            hint.visible = false;
            const setHintInverseScale = () => hint.scale.set(1 / wrap.scale.x, 1 / wrap.scale.y);
            setHintInverseScale();
            wrap.addChild(hint);

            // Yerleşim (BG sol‑üst referanslı x/y)
            function layout() {
                const b = window.Game.background.getBounds();
                const ax = (conf.x || 0), ay = (conf.y || 0);
                wrap.x = b.left + ax;
                wrap.y = b.top  + ay;

                // BG içine sığdır
                const maxX = b.right  - BOX;
                const maxY = b.bottom - BOX;
                wrap.x = Math.max(b.left,  Math.min(maxX, wrap.x));
                wrap.y = Math.max(b.top,   Math.min(maxY, wrap.y));
            }

            // Yakınlık & puls
            let pulse = 0, isNear = false;
            function tick() {
                const p = window.Game.player?.sprite;
                if (!p) return;

                const cx = wrap.x + BOX / 2;
                const cy = wrap.y + BOX / 2;
                const dx = p.x - cx, dy = p.y - cy;
                const radius = conf.radius || Math.max(32, BOX * 1.5);
                const near = Math.hypot(dx, dy) <= radius;

                if (near && !isNear) {
                    isNear = true;
                    highlight.visible = true;
                    hint.visible = true;
                } else if (!near && isNear) {
                    isNear = false;
                    highlight.visible = false;
                    hint.visible = false;
                    wrap.scale.set(1, 1);
                    wrap.tint = 0xffffff;
                    setHintInverseScale();
                }

                if (isNear) {
                    pulse += 0.1;
                    const factor = 1.0 + Math.sin(pulse) * 0.05; // hafif puls
                    wrap.scale.set(factor);
                    wrap.tint = 0xffffaa;
                    setHintInverseScale(); // puls sırasında da metni sabit tut
                }
            }

            // Sahneye ekle ve kaydet
            app.stage.addChild(wrap);
            const rec = { conf, wrap, sprite, highlight, hint, layout, tick, isNear: false, box: BOX };
            icons.push(rec);
            byId[conf.id] = rec;
            return rec;
        }

        function triggerAction(action) {
            if (!action) return;
            if (action.type === "link" && action.url) {
                window.open(action.url, action.target || "_blank");
            } else if (action.type === "route") {
                console.log("route to:", action.name);
            }
        }

        function setTextures(resMap) {
            (window.Game.CFG.ICONS || []).forEach(conf => {
                const t = resMap[conf.id]?.texture;
                if (!t) return;
                createIcon(conf, t).layout();
            });
        }

        function layoutAll() { icons.forEach(i => i.layout()); }
        function tickAll()   { icons.forEach(i => i.tick()); }

        // Enter → en yakın ikona aksiyon (Ana Enter + Numpad Enter)
        function onKey(e) {
            const isEnter = (e.key === 'Enter') || (e.code === 'Enter') || (e.code === 'NumpadEnter');
            if (!isEnter) return;
            e.preventDefault();

            const p = window.Game.player?.sprite;
            if (!p) return;

            const near = icons.filter(i => {
                const cx = i.wrap.x + i.box / 2;
                const cy = i.wrap.y + i.box / 2;
                const dx = p.x - cx, dy = p.y - cy;
                const rad = i.conf.radius || Math.max(32, i.box * 1.5);
                return Math.hypot(dx, dy) <= rad;
            });

            if (near.length) {
                near.sort((a,b) => {
                    const ax = a.wrap.x + a.box / 2, ay = a.wrap.y + a.box / 2;
                    const bx = b.wrap.x + b.box / 2, by = b.wrap.y + b.box / 2;
                    const da = (p.x-ax)**2 + (p.y-ay)**2;
                    const db = (p.x-bx)**2 + (p.y-by)**2;
                    return da - db;
                });
                triggerAction(near[0].conf.action);
            }
        }
        window.addEventListener("keydown", onKey, { capture: true });

        // Dışa aç
        window.Game.icons = { setTextures, layoutAll, tickAll, byId };
        window.Game.onResizeCbs.push(layoutAll);
        window.Game.onTickCbs.push(tickAll);
    }

    window.GameInitIcons = initIcons;
})();