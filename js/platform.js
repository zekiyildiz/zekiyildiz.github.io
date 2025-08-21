// js/platforms.js
/* global PIXI */
(function () {
    function initPlatforms() {
        const { app, background, CFG } = window.Game;

        // BG'nin hemen üst katmanı (transform kilidi yok!)
        const container = new PIXI.Container();
        const bgIndex = app.stage.getChildIndex(background.sprite);
        app.stage.addChildAt(container, bgIndex + 1);

        const list = [];               // { sprite, def }
        let platformTexture = null;
        const DEBUG_OUTLINE = true;

        // --- BG referanslı tekil yerleşim ---
        function layoutOne(rec) {
            const b = background.getBounds();  // BG'nin ekrandaki sınırları
            const { def, sprite } = rec;

            // Pozisyon: BG sol-üst + relatif offset
            sprite.x = Math.round(b.left + (def.x || 0));
            sprite.y = Math.round(b.top  + (def.y || 0));

            // Boyut: sabit piksel
            sprite.width  = def.w;
            sprite.height = def.h;

            // (Opsiyonel) debug rect'i yeniden çiz
            if (sprite.__debug) {
                sprite.__debug.clear().lineStyle(1, 0xff55ff, 1).drawRect(0, 0, def.w, def.h);
            }
        }

        function layoutAll() { list.forEach(layoutOne); }

        // --- Platform ekle ---
        function addPlatform(def) {
            let spr;

            if (platformTexture) {
                spr = new PIXI.Sprite(platformTexture);
            } else {
                // texture gelene kadar görünür placeholder (mor dolu)
                const g = new PIXI.Graphics();
                g.beginFill(0x9b59b6).drawRect(0, 0, def.w, def.h).endFill();
                spr = g;
            }

            spr.anchor?.set?.(0, 0);
            spr.roundPixels = true;

            // Debug outline
            if (DEBUG_OUTLINE) {
                const o = new PIXI.Graphics();
                o.lineStyle(1, 0xff55ff, 1).drawRect(0, 0, def.w, def.h);
                spr.addChild(o);
                spr.__debug = o;
            }

            container.addChild(spr);
            const rec = { sprite: spr, def };
            list.push(rec);
            layoutOne(rec);
            return spr;
        }

        function addPlatforms(defs) { (defs || []).forEach(addPlatform); }

        // --- texture.png gelince var olanları Sprite'a çevir / güncelle ---
        function setTexture(tex) {
            if (!tex) return;
            platformTexture = tex;

            for (let i = 0; i < list.length; i++) {
                const rec = list[i];
                if (!(rec.sprite instanceof PIXI.Sprite)) {
                    const idx = container.getChildIndex(rec.sprite);
                    container.removeChildAt(idx);

                    const spr = new PIXI.Sprite(platformTexture);
                    spr.anchor.set(0, 0);
                    spr.roundPixels = true;

                    if (DEBUG_OUTLINE) {
                        const o = new PIXI.Graphics();
                        o.lineStyle(1, 0xff55ff, 1).drawRect(0, 0, rec.def.w, rec.def.h);
                        spr.addChild(o);
                        spr.__debug = o;
                    }

                    container.addChildAt(spr, idx);
                    rec.sprite = spr;
                } else {
                    rec.sprite.texture = platformTexture;
                }
                // Boyut/pozisyonları her ihtimale karşı güncelle
                rec.sprite.width  = rec.def.w;
                rec.sprite.height = rec.def.h;
                layoutOne(rec);
            }
        }

        // dışa aç
        window.Game.platforms = {
            container,
            list,
            addPlatform,
            addPlatforms,
            setTexture,
            layoutAll
        };

        // BG yeniden yerleştiğinde biz de yeniden hizalayalım
        window.Game.onResizeCbs.push(layoutAll);
    }

    window.GameInitPlatforms = initPlatforms;
})();