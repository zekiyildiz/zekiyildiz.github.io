export const en = {
  profile: {
    name: "Zeki Furkan Yıldız",
    title: "Computer Engineer & Software Developer",
    location: "Ankara, Turkey",
    phone: "+90 531 294 97 46",
    email: "fzekiyildiz@gmail.com",
    linkedin: "https://linkedin.com/in/zekiyildiz",
    github: "https://github.com/zekiyildiz",
    summary:
      "Computer Engineer building full-stack products and ML systems — from mobile apps with on-device inference to Spring Boot backends and kernel-level drivers.",
  },

  education: {
    school: "Ankara Yıldırım Beyazıt University",
    degree: "B.Sc. in Computer Engineering",
    gpa: "3.32/4.00",
    period: "Sep. 2021 – Jun. 2026",
    location: "Ankara, Turkey",
  },

  experience: [
    {
      org: "Bilgi Teknolojileri ve İletişim Kurumu (BTK)",
      role: "Long-Term Intern",
      period: "Feb. 2026 – May. 2026",
      location: "Ankara, Turkey",
      bullets: [
        "Contributed to an AI Companion mobile application using React Native/Expo, Spring Boot, PostgreSQL, OpenRouter, and FastAPI; developed finance, goals, reminders, and health modules and integrated RESTful APIs with validation, loading states, and asynchronous AI responses.",
        "Built an EfficientNet-V2-S food-recognition model spanning ~150 Turkish food categories, a K-Means/SVD-based recommendation engine, and a TF-IDF + Logistic Regression content-moderation filter; integrated HealthKit and Google Fit for health-data synchronization.",
        "Independently designed and developed the Integrated Education Management System (IEMS), a full-stack platform using Spring Boot, PostgreSQL/Supabase, and a Vite-based frontend, with RBAC across five user roles, class/student administration, secure document exchange, lesson scheduling, and exam-calendar generation.",
      ],
    },
    {
      org: "Bilgi Teknolojileri ve İletişim Kurumu (BTK)",
      role: "Intern",
      period: "Jul. 2025 – Aug. 2025",
      location: "Ankara, Turkey",
      bullets: [
        "Developed and maintained a Spring Boot RESTful backend for a restaurant management system using Controller, Service, DTO, Model, and Repository layers.",
        "Extended stock management with CRUD endpoints, validation and minimum-stock checks; documented APIs with Swagger/OpenAPI and implemented custom exception handling, DTO–Entity conversion, and activity logging.",
      ],
    },
    {
      org: "ASELSAN",
      role: "Intern",
      period: "Jun. 2025 – Jul. 2025",
      location: "Ankara, Turkey",
      bullets: [
        "Developed a Linux kernel keyboard character-device driver with ring-buffer-based storage, an IOCTL interface, and character-device registration for user-space communication.",
        "Worked with ISR/IRQ handling, workqueues, kernel debugging interfaces, low-level memory management, spinlock-based synchronization, and producer-consumer data flow in kernel space.",
      ],
    },
  ],

  projects: [
    {
      name: "Smart Municipality Application",
      tag: "TÜBİTAK 2209-A",
      stack: "Flutter, Node.js, TypeScript, YOLOv8, Firebase",
      period: "May. 2026",
      bullets: [
        "Developed an AI-powered cross-platform application enabling citizens to report urban infrastructure problems through a Flutter mobile client.",
        "Designed an end-to-end architecture combining on-device YOLOv8 Nano inference via TensorFlow Lite, a Node.js/Express backend, Firebase Authentication, Firestore, JWT-based RBAC, and Zod validation.",
        "Executed edge inference directly on mobile devices to reduce cloud dependency and support offline, low-latency, privacy-preserving reporting.",
        "Selected for support under TÜBİTAK's 2209-A University Students Research Projects Support Program.",
      ],
      link: "https://github.com/zekiyildiz",
    },
    {
      name: "Chord Analysis in Musical Signals",
      stack: "Python, PyQt5, Librosa, Matplotlib",
      period: "Dec. 2024",
      bullets: [
        "Built a desktop application for chromagram extraction, beat tracking, BPM estimation, and audio-signal visualization; implemented major/minor chord detection using template matching and smoothing.",
      ],
      link: "https://github.com/zekiyildiz",
    },
    {
      name: "Ashy's Cursed House – VR Horror Escape Room",
      stack: "Unity, C#",
      period: "Jan. 2025",
      bullets: [
        "Built VR puzzle mechanics, object interactions, and hidden-code challenges in Unity/C#, collaborating on level design, puzzle logic, and code integration for Oculus Rift and HTC Vive.",
      ],
      link: "https://github.com/zekiyildiz",
    },
  ],

  skills: [
    { group: "Languages", items: ["Java", "Python", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
    { group: "Backend", items: ["Spring Boot", "Node.js/Express", "FastAPI", "RESTful APIs", "JPA/Hibernate", "Swagger/OpenAPI"] },
    { group: "Frontend/Mobile", items: ["React Native", "Expo", "React", "Flutter", "Vite", "Vue.js"] },
    { group: "Databases/Cloud", items: ["PostgreSQL", "Supabase", "Firebase/Firestore"] },
    { group: "AI/ML", items: ["EfficientNet-V2-S", "YOLOv8", "TensorFlow Lite", "K-Means", "SVD", "TF-IDF", "Logistic Regression", "LLM Integration (OpenRouter)"] },
    { group: "Tools/Systems", items: ["Git", "GitHub", "Linux"] },
  ],

  programs: [
    {
      name: "Google Yapay Zeka ve Teknoloji Akademisi",
      role: "Scholar",
      period: "Oct. 2024 – Aug. 2025",
      location: "Turkey",
      bullets: [
        "Completed Coursera-based learning tracks in artificial intelligence, technology, and project management and participated in team-based ideathons focused on real-world problem solving.",
      ],
    },
  ],

  ui: {
    nav: { about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    sectionTitles: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      programs: "Programs & Scholarships",
      contact: "Contact",
    },
    hero: { getInTouch: "Get in touch", github: "GitHub", linkedin: "LinkedIn" },
    cv: { button: "Download CV", english: "English (PDF)", turkish: "Turkish (PDF)" },
    contact: { intro: "Open to internships, collaborations, and interesting problems." },
    misc: { gpa: "GPA" },
  },
};
