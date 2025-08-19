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

        const githubIcon  = new PIXI.Sprite(PIXI.Texture.EMPTY);
        const linkedinIcon= new PIXI.Sprite(PIXI.Texture.EMPTY);

        const ICON_SIZE = 28;
        githubIcon.width = githubIcon.height = ICON_SIZE;
        linkedinIcon.width = linkedinIcon.height = ICON_SIZE;

        githubIcon.interactive = githubIcon.buttonMode = true;
        linkedinIcon.interactive = linkedinIcon.buttonMode = true;

        githubIcon.on("pointertap",  () => window.open(CFG.GITHUB_URL, "_blank"));
        linkedinIcon.on("pointertap",() => window.open(CFG.LINKEDIN_URL, "_blank"));

        app.stage.addChild(footer);
        app.stage.addChild(label);
        app.stage.addChild(githubIcon);
        app.stage.addChild(linkedinIcon);

        function setIcons(texGit, texLinked) {
            if (texGit)     githubIcon.texture   = texGit;
            if (texLinked)  linkedinIcon.texture = texLinked;
        }

        function layoutFooter() {
            const sw = app.screen.width, sh = app.screen.height;

            footer.clear();
            footer.beginFill(0x0d0d10, 1).drawRect(0, sh - CFG.FOOTER_H, sw, CFG.FOOTER_H).endFill();

            label.x = Math.floor(sw / 2);
            label.y = Math.floor(sh - CFG.FOOTER_H / 2);

            linkedinIcon.x = sw - 16 - ICON_SIZE;
            githubIcon.x   = sw - 16 - ICON_SIZE*2 - 12;
            linkedinIcon.y = githubIcon.y = sh - CFG.FOOTER_H/2 - ICON_SIZE/2;
        }

        window.Game.footer = { footer, label, githubIcon, linkedinIcon, layoutFooter, setIcons };
        window.Game.onResizeCbs.push(layoutFooter);
    }

    window.GameInitFooter = initFooter;
})();