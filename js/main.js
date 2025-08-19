(function () {
    PIXI.settings.SCALE_MODE  = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    const app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
    app.stage.roundPixels = true;

    window.Game.app = app;

    // Modüller
    window.GameInitBackground();
    window.GameInitFooter();
    window.GameInitIcons();   // icons.js yüklü olmalı
    window.GameInitPlayer();

    const { CFG, background, footer, icons, player } = window.Game;

    // --- Tek loader burada ---
    const loader = PIXI.Loader.shared;
    const added  = new Set();

    const safeAdd = (id, url) => {
        if (!id || added.has(id)) return;
        loader.add(id, url);
        added.add(id);
    };

    // Temel kaynaklar
    safeAdd("sheet",   CFG.SHEET_URL);
    safeAdd("bg",      CFG.BG_URL);
    safeAdd("github",  "assets/img/github.png");   // footer ve ICONS ikisi de bunu kullanabilir
    safeAdd("linkedin","assets/img/linkedin.png");

    // ICONS listesindeki TÜM görselleri ekle (tekrar varsa atlanır)
    if (Array.isArray(CFG.ICONS)) {
        CFG.ICONS.forEach(icon => safeAdd(icon.id, icon.img));
    }

    // Teşhis için basit loglar
    loader.onError.add(err => console.error("[loader error]", err?.message || err));
    loader.onLoad.add((ldr, res) => console.log("[loaded]", res.name));

    loader.load((ldr, res) => {
        // background
        if (res.bg?.texture) {
            background.setTexture(res.bg.texture);
            background.layoutBackground();
        } else {
            console.error("[bg] texture yok! ->", CFG.BG_URL);
        }

        // footer
        footer.setIcons(res.github?.texture, res.linkedin?.texture);
        footer.layoutFooter();

        // Çoklu ikonlar
        if (window.Game.icons?.setTextures) {
            icons.setTextures(res);
            icons.layoutAll();
        }

        // player
        if (res.sheet?.texture?.baseTexture) {
            player.setSheet(res.sheet.texture.baseTexture);
            player.layoutPlayer();
        } else {
            console.error("[player] sheet baseTexture yok! ->", CFG.SHEET_URL);
        }
    });

    // lifecycle
    window.addEventListener("resize", () => {
        window.Game.onResizeCbs.forEach(fn => fn && fn());
    });
    app.ticker.add(() => {
        window.Game.onTickCbs.forEach(fn => fn && fn());
    });
})();