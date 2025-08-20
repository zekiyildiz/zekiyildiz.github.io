// js/icons.js
/* global PIXI */
(function () {
    function initIcons() {
        const { app } = window.Game;

        const icons = []; // { conf, sprite, highlight, hint, pulse, isNear, layout, tick }
        const byId  = {};

        function createIcon(conf, texture) {
            // 1) Sabit kutu boyu
            const BOX = conf.boxSize ?? (conf.size ?? 28);

            // 2) Bir wrapper container kullan
            const wrap = new PIXI.Container();
            const sprite = new PIXI.Sprite(texture);
            wrap.addChild(sprite);

            // Boyutlandırma (sprite’ı BOX içine sığdır)
            const texW = texture?.orig?.width  || sprite.width;
            const texH = texture?.orig?.height || sprite.height;
            const scale = (conf.size ?? BOX) / Math.max(texW, texH); // uzun kenara göre sığdır
            sprite.scale.set(scale);
            sprite.anchor.set(0, 0);

            // Sprite’ı kutunun ortasına koy
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

            // Hint: alta ortalı, parent ölçeğinden bağımsız
            // Hint: üste ortalı
            const hint = new PIXI.Text(
                conf.hint || "Press Enter",
                new PIXI.TextStyle({
                    fill: 0xffff66,
                    fontSize: conf.hintSize ?? 15,
                    fontFamily: "'Press Start 2P', monospace",
                    align: "center"
                })
            );
            hint.anchor.set(0.5, 1);  // ortala ve tabanını yukarıya yasla
            hint.x = BOX / 2;
            hint.y = -6;              // ikonun hemen üstünde
            hint.visible = false;
            // wrap ölçeklenirse sabit kalsın:
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
                    const factor = 1.0 + Math.sin(pulse) * 0.05;
                    wrap.scale.set(factor);
                    wrap.tint = 0xffffaa;
                    setHintInverseScale(); // puls sırasında da metni sabit tut
                }
            }

            // Sahneye ekle ve kaydet
            app.stage.addChild(wrap);
            const rec = { conf, sprite, highlight, hint, layout, tick, wrap };
            icons.push(rec);
            byId[conf.id] = rec;
            return rec;
        }

        // BG’ye sabitleme isteyenler için (kullanmak istemiyorsan config’te pin’i sil)
        function computePinnedXY(pin, offsetX, offsetY, w, h) {
            const b = window.Game.background.getBounds();
            switch (pin) {
                case "topleft":     return { x: b.left  + offsetX,        y: b.top    + offsetY };
                case "topright":    return { x: b.right - offsetX - w,    y: b.top    + offsetY };
                case "bottomleft":  return { x: b.left  + offsetX,        y: b.bottom - offsetY - h };
                case "bottomright": return { x: b.right - offsetX - w,    y: b.bottom - offsetY - h };
                default:            return { x: b.left + (offsetX||0), y: b.top + (offsetY||0) };
            }
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

        // Enter → en yakın ikona aksiyon
        function onKey(e) {
            if (e.code !== "Enter") return;
            const p = window.Game.player?.sprite;
            if (!p) return;

            const near = icons.filter(i => {
                const cx = i.sprite.x + i.sprite.width  / 2;
                const cy = i.sprite.y + i.sprite.height / 2;
                const dx = p.x - cx, dy = p.y - cy;
                const rad = i.conf.radius || Math.max(32, i.sprite.width * 1.5);
                return Math.hypot(dx, dy) <= rad;
            });

            if (near.length) {
                near.sort((a,b) => {
                    const ax = a.sprite.x + a.sprite.width  / 2;
                    const ay = a.sprite.y + a.sprite.height / 2;
                    const bx = b.sprite.x + b.sprite.width  / 2;
                    const by = b.sprite.y + b.sprite.height / 2;
                    const da = (p.x-ax)**2 + (p.y-ay)**2;
                    const db = (p.x-bx)**2 + (p.y-by)**2;
                    return da - db;
                });
                triggerAction(near[0].conf.action);
            }
        }
        window.addEventListener("keydown", onKey);

        // Dışa aç
        window.Game.icons = { setTextures, layoutAll, tickAll, byId };
        window.Game.onResizeCbs.push(layoutAll);
        window.Game.onTickCbs.push(tickAll);
    }

    window.GameInitIcons = initIcons;
})();