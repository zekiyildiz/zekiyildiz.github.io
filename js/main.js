// js/main.js
(function () {
    PIXI.settings.SCALE_MODE  = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    const app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
    app.stage.roundPixels = true;

    window.Game.app = app;

    // Modüller
    window.GameInitBackground();
    // (Varsa) platform modülü background'dan sonra çağrılmalı
    if (typeof window.GameInitPlatforms === "function") window.GameInitPlatforms();
    window.GameInitFooter();
    window.GameInitIcons();
    window.GameInitPlayer();



    const { CFG, background, platforms, footer, icons, player } = window.Game;

    // --- Tek loader ---
    const loader = PIXI.Loader.shared;
    const added  = new Set();
    const safeAdd = (id, url) => { if (id && !added.has(id)) { loader.add(id, url); added.add(id); } };

    // Temel kaynaklar
    safeAdd("sheet",   CFG.SHEET_URL); // player sheet
    safeAdd("bg",      CFG.BG_URL);

    // (Varsa) platform sheet
    if (CFG.PLATFORM_SHEET_URL) safeAdd("platformSheet", CFG.PLATFORM_SHEET_URL);

    // Footer ikonları
    safeAdd("github",  "assets/img/github.png");
    safeAdd("linkedin","assets/img/linkedin.png");

    // BG içi ikon görselleri
    if (Array.isArray(CFG.ICONS)) CFG.ICONS.forEach(icon => safeAdd(icon.id, icon.img));

    // Log & hata
    loader.onError.add(err => console.error("[loader error]", err?.message || err));
    loader.onLoad.add((ldr, res) => console.log("[loaded]", res.name));

    loader.load((ldr, res) => {
        // Background
        if (res.bg?.texture) {
            background.setTexture(res.bg.texture);
            background.layoutBackground();
        } else {
            console.error("[bg] texture yok! ->", CFG.BG_URL);
        }

        // Platformlar (modül ve sheet varsa)
        // Platformlar
        if (window.Game.platforms) {
            if (res.platformSheet?.texture) {
                platforms.setTexture(res.platformSheet.texture);   // setSheet değil, setTexture!
            } else {
                console.warn("[platforms] platformSheet yok ya da yüklenmedi:", CFG.PLATFORM_SHEET_URL);
            }

            if (Array.isArray(CFG.PLATFORM_DEFS)) {
                platforms.addPlatforms(CFG.PLATFORM_DEFS);         // outline'lar hemen görünür
            }
            platforms.layoutAll();
        }

        // Footer (sabit sağ-alt)
        footer.setIcons(res.github?.texture, res.linkedin?.texture);
        footer.layoutFooter();

        // BG içindeki ikonlar
        if (window.Game.icons?.setTextures) {
            icons.setTextures(res);
            icons.layoutAll();
        }

        // Player
        if (res.sheet?.texture?.baseTexture) {
            player.setSheet(res.sheet.texture.baseTexture);
            player.layoutPlayer();
        } else {
            console.error("[player] sheet baseTexture yok! ->", CFG.SHEET_URL);
        }
    });

    // lifecycle
    addEventListener("resize", () => window.Game.onResizeCbs.forEach(fn => fn && fn()));
    app.ticker.add(() => window.Game.onTickCbs.forEach(fn => fn && fn()));
})();