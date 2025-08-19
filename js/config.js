window.Game = {
    app: null,
    resources: null,
    CFG: {
        SHEET_URL: "assets/img/player_sprites.png",
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

        // — ICONS: dilediğin kadar ekle —
        ICONS: [
            {
                id: "cv",
                img: "assets/img/cv.png",
                pin: "topleft",
                offsetX: 16, offsetY: 16,
                size: 40, radius: 60,
                label: "CV",   // <-- eklendi
                hint: "Press Enter - Open CV",
                action: { type: "link", url: "assets/img/cv/cv.pdf", target: "_blank" }
            },

            // Örnek: “Projects” ikonu ekranın sağ üstünde
            {
                id: "projects", img: "assets/img/projects.png",
                pin: "topright",
                offsetX: 16, offsetY: 16,
                size: 34, radius: 60,
                hint: "Press Enter – Projects",
                action: { type: "route", name: "projects" } // ileride sahne/menü açabilirsin
            }
        ]
    },
    onResizeCbs: [],
    onTickCbs:   []
};