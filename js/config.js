window.Game = {
    app: null,
    resources: null,
    CFG: {
        SHEET_URL: "assets/img/player_sprites.png",        // PLAYER spritesheet
        BG_URL:    "assets/img/background.png",

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
            { x: 250, y: 220, w: 220, h: 10 },
            { x: 340, y: 380, w: 220, h: 10 },
            { x: 620, y: 540, w: 160, h: 10 },
            { x: 780, y: 620, w: 200, h: 10 },
            { x: 1040, y: 520, w: 200, h: 10 },
            { x: 1040, y: 320, w: 200, h: 10 },
            { x: 780, y: 420, w: 200, h: 10 },
            { x: 680, y: 260, w: 200, h: 10 },
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
                y: 150,
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