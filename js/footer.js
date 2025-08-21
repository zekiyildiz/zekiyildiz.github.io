(function () {
    function initFooter() {
        const { app, CFG } = window.Game;

        const footer = new PIXI.Graphics();
        const label = new PIXI.Text(
            "Zeki Furkan Yıldız — Software Developer",
            new PIXI.TextStyle({
                fill: 0xffffff,
                fontSize: 16,
                fontFamily: "'Press Start 2P', monospace",
                letterSpacing: 1
            })
        );
        label.anchor.set(0.5);

        const githubIcon   = new PIXI.Sprite(PIXI.Texture.EMPTY);
        const linkedinIcon = new PIXI.Sprite(PIXI.Texture.EMPTY);
        const soundIcon    = new PIXI.Sprite(PIXI.Texture.EMPTY);

        const ICON_SIZE = 28;
        const GAP = 12;

        [githubIcon, linkedinIcon, soundIcon].forEach(s => {
            s.width = s.height = ICON_SIZE;
            s.interactive = true;
            s.buttonMode  = true;
        });

        githubIcon.on("pointertap",  () => window.open(CFG.GITHUB_URL, "_blank"));
        linkedinIcon.on("pointertap",() => window.open(CFG.LINKEDIN_URL, "_blank"));

        // ---- Ses kontrolleri (Audio burada oluşturulmuyor!) ----
        let audio = null;        // main.js -> footer.setAudio(audio) ile gelir
        let texSoundOn  = null;
        let texSoundOff = null;

        const isPlaying = () => !!audio && !audio.paused;
        function updateSoundIconTexture() {
            if (!soundIcon) return;
            soundIcon.texture = (isPlaying() ? texSoundOn : texSoundOff) || PIXI.Texture.EMPTY;
        }

        function toggleSound() {
            if (!audio) return;
            if (audio.paused) {
                audio.play().catch(() => {}); // tarayıcı engellerse sessizce geç
            } else {
                audio.pause();
            }
            updateSoundIconTexture();
        }
        soundIcon.on("pointertap", toggleSound);
        window.addEventListener("keydown", e => { if (e.code === "KeyM") toggleSound(); });

        app.stage.addChild(footer);
        app.stage.addChild(label);
        app.stage.addChild(githubIcon);
        app.stage.addChild(linkedinIcon);
        app.stage.addChild(soundIcon);

        // Eski API
        function setIcons(texGit, texLinked) {
            if (texGit)     githubIcon.texture   = texGit;
            if (texLinked)  linkedinIcon.texture = texLinked;
        }
        // Yeni: ses ikon görselleri
        function setSoundIcons(texOn, texOff) {
            if (texOn)  texSoundOn  = texOn;
            if (texOff) texSoundOff = texOff;
            updateSoundIconTexture();
        }
        // Yeni: dışarıdan tekil Audio nesnesi bağla
        function setAudio(a) {
            if (audio && audio !== a) {
                // Eskiyi durdur (olası çift sesin kökünü keser)
                try { audio.pause(); } catch {}
            }
            audio = a || null;
            updateSoundIconTexture();
        }

        function layoutFooter() {
            const sw = app.screen.width, sh = app.screen.height;

            footer.clear();
            footer.beginFill(0x0d0d10, 1).drawRect(0, sh - CFG.FOOTER_H, sw, CFG.FOOTER_H).endFill();

            label.x = Math.floor(sw / 2);
            label.y = Math.floor(sh - CFG.FOOTER_H / 2);

            const baseY = sh - CFG.FOOTER_H/2 - ICON_SIZE/2;
            linkedinIcon.x = sw - 16 - ICON_SIZE;
            linkedinIcon.y = baseY;

            githubIcon.x   = linkedinIcon.x - GAP - ICON_SIZE;
            githubIcon.y   = baseY;

            soundIcon.x    = githubIcon.x - GAP - ICON_SIZE;
            soundIcon.y    = baseY;
        }

        window.Game.footer = {
            footer, label,
            githubIcon, linkedinIcon, soundIcon,
            layoutFooter,
            setIcons,
            setSoundIcons,
            setAudio
        };

        window.Game.onResizeCbs.push(layoutFooter);
    }

    window.GameInitFooter = initFooter;
})();