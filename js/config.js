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

        // — ICONS: sadece BG içinde dolaşılacak ikonlar —
        ICONS: [
            {
                id: "cv",
                img: "assets/img/cv.png",
                pin: "topleft",
                offsetX: 16, offsetY: 16,
                size: 40, radius: 60,
                label: "CV",
                hint: "Press Enter - Open CV",
                action: { type: "link", url: "assets/img/cv/cv.pdf", target: "_blank" }
            },
            {
                id: "projects", img: "assets/img/projects.png",
                pin: "topright",
                offsetX: 16, offsetY: 16,
                size: 34, radius: 60,
                hint: "Press Enter – Projects",
                action: { type: "route", name: "projects" }
            }
        ]
    },
    onResizeCbs: [],
    onTickCbs:   []
};