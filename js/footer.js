(function () {
    function initFooter() {
        const { app, CFG } = window.Game;

        const footer = new PIXI.Graphics();
        const label  = new PIXI.Text(
            "Zeki Furkan Yıldız — Software Developer",
            new PIXI.TextStyle({
                fill: 0xffffff,
                fontSize: 16,
                fontFamily: "'Press Start 2P', monospace",
                letterSpacing: 1
            })
        );
        label.anchor.set(0.5);

        // mevcut ikonlar
        const githubIcon   = new PIXI.Sprite(PIXI.Texture.EMPTY);
        const linkedinIcon = new PIXI.Sprite(PIXI.Texture.EMPTY);

        // yeni: ses ikonu
        const soundIcon = new PIXI.Sprite(PIXI.Texture.EMPTY);

        const ICON_SIZE = 28;
        const GAP = 12;

        // ortak ikon ayarları
        [githubIcon, linkedinIcon, soundIcon].forEach(s => {
            s.width = s.height = ICON_SIZE;
            s.interactive = true;
            s.buttonMode  = true;
        });

        // mevcut tıklamalar
        githubIcon.on("pointertap",  () => window.open(CFG.GITHUB_URL, "_blank"));
        linkedinIcon.on("pointertap",() => window.open(CFG.LINKEDIN_URL, "_blank"));

        // yeni: ses — tarayıcı politikaları için kullanıcı tıklamasıyla başlat
        const audio = new Audio(CFG.SOUND_URL || "assets/snd/sound.wav");
        audio.loop   = true;
        audio.volume = 0.6;
        let isMuted  = true;
        let texSoundOn  = null;
        let texSoundOff = null;

        function updateSoundIconTexture() {
            if ((isMuted || audio.paused) && texSoundOff) soundIcon.texture = texSoundOff;
            else if (texSoundOn) soundIcon.texture = texSoundOn;
        }
        function toggleSound() {
            if (audio.paused || isMuted) {
                audio.play().then(() => { isMuted = false; updateSoundIconTexture(); })
                    .catch(()=>{ isMuted = true; updateSoundIconTexture(); });
            } else {
                audio.pause();
                isMuted = true;
                updateSoundIconTexture();
            }
        }
        soundIcon.on("pointertap", toggleSound);
        window.addEventListener("keydown", e => { if (e.code === "KeyM") toggleSound(); });

        app.stage.addChild(footer);
        app.stage.addChild(label);
        app.stage.addChild(githubIcon);
        app.stage.addChild(linkedinIcon);
        app.stage.addChild(soundIcon);

        // MEVCUT API: değiştirmiyoruz
        function setIcons(texGit, texLinked) {
            if (texGit)     githubIcon.texture   = texGit;
            if (texLinked)  linkedinIcon.texture = texLinked;
        }

        // YENİ (opsiyonel): ses ikonlarının texture’larını vermek için
        function setSoundIcons(texOn, texOff) {
            texSoundOn  = texOn  || texSoundOn;
            texSoundOff = texOff || texSoundOff;
            updateSoundIconTexture();
        }

        function layoutFooter() {
            const sw = app.screen.width, sh = app.screen.height;

            footer.clear();
            footer.beginFill(0x0d0d10, 1)
                .drawRect(0, sh - CFG.FOOTER_H, sw, CFG.FOOTER_H)
                .endFill();

            label.x = Math.floor(sw / 2);
            label.y = Math.floor(sh - CFG.FOOTER_H / 2);

            // sağ altta sıralama: [sound] [github] [linkedin] (linkedin en sağda kalır)
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
            setIcons,          // aynen duruyor
            setSoundIcons      // yeni, opsiyonel
        };

        window.Game.onResizeCbs.push(layoutFooter);
    }

    window.GameInitFooter = initFooter;
})();