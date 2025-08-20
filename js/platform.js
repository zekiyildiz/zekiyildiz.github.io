// js/platforms.js
/* global PIXI */
(function () {
    function initPlatforms() {
        const { app, background, CFG } = window.Game;

        // 1) Container'ı background'un HEMEN ÜSTÜNE koy
        const container = new PIXI.Container();
        const bgIndex = app.stage.getChildIndex(background.sprite);
        app.stage.addChildAt(container, bgIndex + 1);

        const list = []; // { sprite, def }
        let platformTexture = null;

        // İstersen debug çerçevesini aç/kapat
        const DEBUG_OUTLINE = true;

        // --- Yerleşim (BG sol-üst referanslı x,y) ---
        function layoutOne(rec) {
            const b = background.getBounds();
            const { def, sprite } = rec;

            let x = def.x;
            let y = def.y;

            sprite.x = Math.round(x);
            sprite.y = Math.round(y);

            // Sprite ise genişlik/yükseklik ver; Graphics ise scale yerine çizim boyutu sabit
            if (sprite instanceof PIXI.Sprite) {
                sprite.width  = def.w;
                sprite.height = def.h;
            } else if (sprite.__outline && sprite.__size) {
                // Graphics debug: outline'ı def boyutuna uydur
                const { w, h } = def;
                if (sprite.__size.w !== w || sprite.__size.h !== h) {
                    sprite.__outline.clear().lineStyle(1, 0xff55ff, 1).drawRect(0, 0, w, h);
                    sprite.__size = { w, h };
                }
            }
        }
        function layoutAll() { list.forEach(layoutOne); }

        // --- Platform ekle ---
        function addPlatform(def) {
            let obj;

            if (platformTexture) {
                const spr = new PIXI.Sprite(platformTexture);
                spr.anchor.set(0, 0);
                spr.roundPixels = true;
                obj = spr;
            } else {
                // Texture henüz yoksa: görünür olması için geçici grafik
                const g = new PIXI.Container();
                const outline = new PIXI.Graphics();
                outline.lineStyle(1, 0xff55ff, 1).drawRect(0, 0, def.w, def.h);
                g.addChild(outline);
                g.__outline = outline;
                g.__size = { w: def.w, h: def.h };
                obj = g;
            }

            if (DEBUG_OUTLINE && obj instanceof PIXI.Sprite) {
                const o = new PIXI.Graphics();
                o.lineStyle(1, 0xff55ff, 1).drawRect(0, 0, def.w, def.h);
                obj.addChild(o);
            }

            container.addChild(obj);
            const rec = { sprite: obj, def };
            list.push(rec);
            layoutOne(rec);
            return obj;
        }

        function addPlatforms(defs) { return (defs || []).map(addPlatform); }

        // --- Texture set et (texture.png komple) ---
        function setTexture(tex) {
            if (!tex) return;
            platformTexture = tex;

            // Var olanlardan Graphics olanları Sprite'a çevir
            for (let i = 0; i < list.length; i++) {
                const rec = list[i];
                if (!(rec.sprite instanceof PIXI.Sprite)) {
                    // Eski graphics'i kaldır
                    const idx = container.getChildIndex(rec.sprite);
                    container.removeChildAt(idx);

                    const spr = new PIXI.Sprite(platformTexture);
                    spr.anchor.set(0, 0);
                    spr.roundPixels = true;

                    // İsteğe bağlı debug outline
                    if (DEBUG_OUTLINE) {
                        const o = new PIXI.Graphics();
                        o.lineStyle(1, 0xff55ff, 1).drawRect(0, 0, rec.def.w, rec.def.h);
                        spr.addChild(o);
                    }

                    container.addChildAt(spr, idx);
                    rec.sprite = spr;
                } else {
                    rec.sprite.texture = platformTexture;
                }
                // Genişlik/yükseklik güncel
                rec.sprite.width  = rec.def.w;
                rec.sprite.height = rec.def.h;
                layoutOne(rec);
            }
        }



        // Dışa aç
        window.Game.platforms = {
            container,
            list,
            addPlatform,
            addPlatforms,
            setTexture,     // main.js: platforms.setTexture(res.platformSheet.texture)
            layoutAll
        };

        // Resize’da BG kaydıkça yeniden hizala
        window.Game.onResizeCbs.push(layoutAll);
    }

    window.GameInitPlatforms = initPlatforms;
})();