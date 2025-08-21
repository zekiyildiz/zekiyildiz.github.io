// js/main.js
(function () {
    // PIXI ayarları
    PIXI.settings.SCALE_MODE   = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    const app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
    app.stage.roundPixels = true;

    // Canvas'ı viewport'a sabitle (DevTools aç/kapat sapmalarını azaltır)
    Object.assign(app.view.style, {
        position: 'fixed',
        left: '0', top: '0', width: '100vw', height: '100vh', margin: '0'
    });

    // Global Game objesine ekle
    window.Game.app = app;

    // --- Modüller (sıra önemli) ---
    window.GameInitBackground();
    if (typeof window.GameInitPlatforms === "function") window.GameInitPlatforms();
    window.GameInitFooter();
    window.GameInitIcons();
    window.GameInitPlayer();

    const { CFG, background, platforms, footer, icons, player } = window.Game;

    // --- Ses (autoplay kilidine hazırlık) ---
    const audio = new Audio('assets/snd/sound.wav'); // yol doğru olmalı!
    audio.loop = true;
    audio.volume = 0.6;
    window.Game.audio = audio;

    // İlk kullanıcı etkileşimi ile sesi başlat (autoplay politikası)
    function unlockAudioOnce() {
        const tryPlay = () => { audio.play().catch(() => {}); };
        const kick = () => { tryPlay(); window.removeEventListener('pointerdown', kick);
            window.removeEventListener('keydown', kick); };
        window.addEventListener('pointerdown', kick, { once: true });
        window.addEventListener('keydown', kick, { once: true });
    }
    unlockAudioOnce();

    // --- Loader ---
    const loader = PIXI.Loader.shared;
    const added  = new Set();
    const safeAdd = (id, url) => { if (id && url && !added.has(id)) { loader.add(id, url); added.add(id); } };

    // Kaynaklar
    safeAdd("sheet",   CFG.SHEET_URL);
    safeAdd("bg",      CFG.BG_URL);
    if (CFG.PLATFORM_SHEET_URL) safeAdd("platformSheet", CFG.PLATFORM_SHEET_URL);

    // Footer ikonları
    safeAdd("github",   "assets/img/github.png");
    safeAdd("linkedin", "assets/img/linkedin.png");
    // Ses ikonları
    safeAdd("soundOn",  "assets/img/soundon.png");
    safeAdd("soundOff", "assets/img/soundoff.png");

    // BG içi ikon görselleri
    if (Array.isArray(CFG.ICONS)) CFG.ICONS.forEach(icon => safeAdd(icon.id, icon.img));

    loader.onError.add(err => console.error("[loader error]", err?.message || err));
    loader.onLoad.add((ldr, res) => console.log("[loaded]", res.name));

    // --- Yükleme sonrası ---
    loader.load((ldr, res) => {
        // Background
        if (res.bg?.texture) {
            background.setTexture(res.bg.texture);
            background.layoutBackground();
        } else {
            console.error("[bg] texture yok! ->", CFG.BG_URL);
        }

        // Platformlar
        if (window.Game.platforms) {
            if (Array.isArray(CFG.PLATFORM_DEFS)) platforms.addPlatforms(CFG.PLATFORM_DEFS);
            if (res.platformSheet?.texture) {
                platforms.setTexture(res.platformSheet.texture);
            } else {
                console.warn("[platforms] platformSheet yok ya da yüklenmedi:", CFG.PLATFORM_SHEET_URL);
            }
            platforms.layoutAll();
        }

        // Footer (ikonlar + ses ikonları + audio referansı)
        footer.setIcons(res.github?.texture, res.linkedin?.texture);
        if (footer.setSoundIcons) footer.setSoundIcons(res.soundOn?.texture, res.soundOff?.texture);
        if (footer.setAudio)      footer.setAudio(audio); // footer butonu bu audio'yu kontrol edebilsin
        footer.layoutFooter();

        // Icons (BG içi)
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

        // İlk layout’tan sonra bir kez daha resize’ı zorla (DevTools vs)
        forceResize();
    });

    // --- Robust resize fix (DevTools aç/kapat vb.) ---
    function forceResize() {
        const w = Math.floor(window.innerWidth);
        const h = Math.floor(window.innerHeight);
        if (app.renderer.width !== w || app.renderer.height !== h) {
            app.renderer.resize(w, h);
            try { window.Game.onResizeCbs.forEach(fn => fn && fn()); } catch (_) {}
        }
    }
    window.addEventListener('resize', forceResize);
    window.addEventListener('orientationchange', forceResize);
    document.addEventListener('visibilitychange', forceResize);
    const _resizeWatch = setInterval(forceResize, 250);

    // lifecycle ticker
    app.ticker.add(() => window.Game.onTickCbs.forEach(fn => fn && fn()));
})();