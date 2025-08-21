window.Game = {
    app: null,
    resources: null,
    CFG: {
        SHEET_URL: "assets/img/player_sprites.png",        // PLAYER spritesheet
        BG_URL:    "assets/img/background.png",

        SOUND_URL: "assets/snd/sound.wav",
        GRID_W: 24,
        GRID_H: 24,
        SCALE: 3,

        BG_SCALE_X: 1.0,
        BG_SCALE_Y: 1.0,
        FOOTER_H: 72,

        GITHUB_URL:   "https://github.com/zekiyildiz",
        LINKEDIN_URL: "https://www.linkedin.com/in/zekiyildiz/",
        CV_URL:       "assets/img/cv/cv.pdf",

        PLATFORM_SHEET_URL: "assets/img/texture.png",

        PLATFORM_DEFS: [
            { x: 0, y: 120, w: 220, h: 10 },
            { x: 400, y: 480, w: 220, h: 10 },
            { x: 750, y: 400, w: 260, h: 10 },
            { x: 550, y: 250, w: 200, h: 10 },
            { x: 900, y: 150, w: 100, h: 10 },
            { x: 250, y: 200, w: 200, h: 10 },


        ],

        // — ICONS: BG içinde dolaşılacak ikonlar —
        ICONS: [
            {
                id: "cv",
                img: "assets/img/cv.png",
                x: 20,   // istediğin X
                y: 60,   // istediğin Y
                size: 48,
                hint: "Open CV",
                action: { type: "link", url: "cv.pdf" }
            },
            {
                id: "github",
                img: "assets/img/github.png",
                x: 950,
                y: 100,
                size: 48,
                hint: "Visit GitHub",
                action: { type: "link", url: "https://github.com/zekiyildiz" }
            },
            {
                id: "linkedin",
                img: "assets/img/linkedin.png",
                x: 950,
                y: 350,
                size: 48,
                hint: "Visit LinkedIn",
                action: { type: "link", url: "https://linkedin.com/in/zekiyildiz/" },
            }
        ]
    },
    onResizeCbs: [],
    onTickCbs:   []
};