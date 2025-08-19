(function () {
    function initIcons() {
        const { app, CFG } = window.Game;

        const icons = []; // { conf, sprite, highlight, hint, pulse, isNear, layout, tick }
        const byId = {};

        // --- Yardımcı: pin'li yerleşim (BG içinde!)
        function computePinnedXY(pin, offsetX, offsetY, size) {
            const b = window.Game.background.getBounds(); // ekran değil, BG sınırları
            switch (pin) {
                case "topleft":     return { x: b.left  + offsetX,        y: b.top    + offsetY };
                case "topright":    return { x: b.right - offsetX - size, y: b.top    + offsetY };
                case "bottomleft":  return { x: b.left  + offsetX,        y: b.bottom - offsetY - size };
                case "bottomright": return { x: b.right - offsetX - size, y: b.bottom - offsetY - size };
                default:            return null; // absolute
            }
        }

        function createIcon(conf, texture) {
            const sprite = new PIXI.Sprite(texture);

            // === Boyut ve ölçek ===
            // Konfig yoksa 28px hedeflenir
            const TARGET = (conf.size ?? 28);

            // Texture gerçek ölçüleri
            const texW = texture?.orig?.width  || sprite.width;
            const texH = texture?.orig?.height || sprite.height;

            // Ölçek (en-boy oranını koru)
            const sx = TARGET / texW;
            const sy = TARGET / texH;
            sprite.scale.set(sx, sy);

            // Taban ölçek (puls sonrası geri dönmek için)
            const baseScaleX = sx;
            const baseScaleY = sy;

            // Etkileşim
            sprite.anchor.set(0, 0);
            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.on("pointertap", () => triggerAction(conf.action));

            // === Highlight (çerçeve) ===
            // Görsel kutu boyutu (çerçevenin kapsadığı kare)
            const BOX = conf.boxSize || TARGET;

            const highlight = new PIXI.Graphics();
            highlight.lineStyle(2, 0xffff66, 1);
            highlight.drawRect(0, 0, BOX*0.4, BOX*0.4);
            highlight.visible = false;
            sprite.addChild(highlight);

            // === Hint (yazı) ===
            const hint = new PIXI.Text(
                conf.hint || "Press Enter",
                new PIXI.TextStyle({
                    fill: 0xffff66,
                    fontSize: conf.hintSize ?? 8,              // küçük ve retro
                    fontFamily: "'Press Start 2P', monospace"
                })
            );
            hint.anchor.set(0, 1);
            hint.x = 0;
            hint.y = -2;
            hint.visible = false;
            sprite.addChild(hint);

            function drawIcon(ctx, icon) {
                const img = new Image();
                img.src = icon.img;

                img.onload = () => {
                    ctx.drawImage(img, icon.offsetX, icon.offsetY, icon.size, icon.size);

                    // Altına yazı
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "#fff"; // beyaz
                    ctx.textAlign = "center";
                    ctx.fillText(
                        icon.label, // ICONS içine label ekleyeceğiz
                        icon.offsetX + icon.size / 2,
                        icon.offsetY + icon.size + 14
                    );
                };
            }

            // === Yerleşim ===
            function layout() {
                const b = window.Game.background.getBounds();

                if (conf.pin && conf.pin !== "absolute") {
                    const p = computePinnedXY(conf.pin, conf.offsetX || 0, conf.offsetY || 0, BOX);
                    sprite.x = p.x;
                    sprite.y = p.y;
                } else {
                    const ax = (conf.x || 0), ay = (conf.y || 0);
                    sprite.x = b.left + ax;
                    sprite.y = b.top  + ay;
                }

                // BG içinde tut (BOX'a göre sınırla)
                const minX = b.left,  maxX = b.right  - BOX;
                const minY = b.top,   maxY = b.bottom - BOX;
                sprite.x = Math.max(minX, Math.min(maxX, sprite.x));
                sprite.y = Math.max(minY, Math.min(maxY, sprite.y));
            }

            // === Yakınlık & puls ===
            let pulse = 0;
            let isNear = false;

            function tick() {
                const p = window.Game.player?.sprite;
                if (!p) return;

                const cx = sprite.x + (BOX / 2);
                const cy = sprite.y + (BOX / 2);
                const dx = p.x - cx, dy = p.y - cy;

                // Yakınlık yarıçapı ikon boyutuna bağlı
                const radius = conf.radius || Math.max(32, TARGET * 1.5);
                const near = Math.sqrt(dx * dx + dy * dy) <= radius;

                if (near && !isNear) {
                    isNear = true;
                    highlight.visible = true;
                    hint.visible = true;
                } else if (!near && isNear) {
                    isNear = false;
                    highlight.visible = false;
                    hint.visible = false;
                    sprite.scale.set(baseScaleX, baseScaleY);
                    sprite.tint = 0xffffff;
                }

                if (isNear) {
                    pulse += 0.1;
                    const factor = 1.0 + Math.sin(pulse) * 0.05; // hafif puls
                    sprite.scale.set(baseScaleX * factor, baseScaleY * factor);
                    sprite.tint = 0xffffaa;
                }
            }

            app.stage.addChild(sprite);

            const rec = { conf, sprite, highlight, hint, pulse, isNear: false, layout, tick };
            icons.push(rec);
            byId[conf.id] = rec;
            return rec;
        }

        function triggerAction(action) {
            if (!action) return;
            if (action.type === "link" && action.url) {
                window.open(action.url, action.target || "_blank");
            } else if (action.type === "route") {
                // geleceğe bırakılmış: sahne/panel değişimi
                console.log("route to:", action.name);
            }
        }

        function setTextures(resMap) {
            // CFG.ICONS’taki görseller loader’da eklendi; burada texture bağlanır
            CFG.ICONS.forEach(conf => {
                const t = resMap[conf.id]?.texture;
                if (!t) return;
                createIcon(conf, t).layout();
            });
        }

        function layoutAll() { icons.forEach(i => i.layout()); }
        function tickAll()   { icons.forEach(i => i.tick()); }

        // Enter → yakındaki ikona aksiyon
        function onKey(e) {
            if (e.code !== "Enter") return;
            const p = window.Game.player?.sprite;
            if (!p) return;

            const nearOnes = icons.filter(i => {
                const cx = i.sprite.x + ( (i.conf.boxSize || (i.conf.size ?? 28)) / 2 );
                const cy = i.sprite.y + ( (i.conf.boxSize || (i.conf.size ?? 28)) / 2 );
                const dx = p.x - cx, dy = p.y - cy;
                const rad = i.conf.radius || Math.max(32, (i.conf.size ?? 28) * 1.5);
                return Math.sqrt(dx*dx + dy*dy) <= rad;
            });

            if (nearOnes.length) {
                nearOnes.sort((a, b) => {
                    const ax = a.sprite.x + ((a.conf.boxSize || (a.conf.size ?? 28)) / 2);
                    const ay = a.sprite.y + ((a.conf.boxSize || (a.conf.size ?? 28)) / 2);
                    const bx = b.sprite.x + ((b.conf.boxSize || (b.conf.size ?? 28)) / 2);
                    const by = b.sprite.y + ((b.conf.boxSize || (b.conf.size ?? 28)) / 2);
                    const da = (p.x - ax) ** 2 + (p.y - ay) ** 2;
                    const db = (p.x - bx) ** 2 + (p.y - by) ** 2;
                    return da - db;
                });
                triggerAction(nearOnes[0].conf.action);
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