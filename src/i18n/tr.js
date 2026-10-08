export const tr = {
  profile: {
    name: "Zeki Furkan Yıldız",
    title: "Bilgisayar Mühendisi & Yazılım Geliştirici",
    location: "Ankara, Türkiye",
    phone: "+90 531 294 97 46",
    email: "fzekiyildiz@gmail.com",
    linkedin: "https://linkedin.com/in/zekiyildiz",
    github: "https://github.com/zekiyildiz",
    summary:
      "Mobil uygulamalarda cihaz üstü çıkarımdan Spring Boot backend'lerine ve çekirdek seviyesi sürücülere kadar uçtan uca ürünler ve ML sistemleri geliştiren bir Bilgisayar Mühendisi.",
  },

  education: {
    school: "Ankara Yıldırım Beyazıt Üniversitesi",
    degree: "Bilgisayar Mühendisliği Lisans",
    gpa: "3.32/4.00",
    period: "Eyl. 2021 – Haz. 2026",
    location: "Ankara, Türkiye",
  },

  experience: [
    {
      org: "Bilgi Teknolojileri ve İletişim Kurumu (BTK)",
      role: "Uzun Dönem Stajyer",
      period: "Şub. 2026 – May. 2026",
      location: "Ankara, Türkiye",
      bullets: [
        "React Native/Expo, Spring Boot, PostgreSQL, OpenRouter ve FastAPI kullanılan bir AI Companion mobil uygulamasına katkıda bulundum; finans, hedefler, hatırlatıcılar ve sağlık modüllerini geliştirdim, doğrulama, yüklenme durumları ve asenkron AI yanıtlarıyla RESTful API'leri entegre ettim.",
        "~150 Türk yemeği kategorisini kapsayan bir EfficientNet-V2-S yemek tanıma modeli, K-Means/SVD tabanlı bir öneri motoru ve TF-IDF + Lojistik Regresyon tabanlı bir içerik moderasyon filtresi geliştirdim; sağlık verisi senkronizasyonu için HealthKit ve Google Fit entegrasyonu yaptım.",
        "Beş kullanıcı rolü için RBAC, sınıf/öğrenci yönetimi, güvenli belge paylaşımı, ders planlama ve sınav takvimi oluşturma özellikleriyle Spring Boot, PostgreSQL/Supabase ve Vite tabanlı bir frontend kullanan tam yığın bir platform olan Entegre Eğitim Yönetim Sistemi'ni (IEMS) bağımsız olarak tasarladım ve geliştirdim.",
      ],
    },
    {
      org: "Bilgi Teknolojileri ve İletişim Kurumu (BTK)",
      role: "Stajyer",
      period: "Tem. 2025 – Ağu. 2025",
      location: "Ankara, Türkiye",
      bullets: [
        "Controller, Service, DTO, Model ve Repository katmanlarını kullanarak bir restoran yönetim sistemi için Spring Boot RESTful backend geliştirdim ve sürdürdüm.",
        "Stok yönetimini CRUD endpoint'leri, doğrulama ve minimum stok kontrolleriyle genişlettim; API'leri Swagger/OpenAPI ile belgeledim ve özel hata yönetimi, DTO–Entity dönüşümü ve aktivite loglama uyguladım.",
      ],
    },
    {
      org: "ASELSAN",
      role: "Stajyer",
      period: "Haz. 2025 – Tem. 2025",
      location: "Ankara, Türkiye",
      bullets: [
        "Kullanıcı alanı iletişimi için ring-buffer tabanlı depolama, IOCTL arayüzü ve karakter cihazı kaydı içeren bir Linux çekirdeği klavye karakter cihazı sürücüsü geliştirdim.",
        "ISR/IRQ işleme, work queue'lar, çekirdek hata ayıklama arayüzleri, düşük seviyeli bellek yönetimi, spinlock tabanlı senkronizasyon ve çekirdek alanında üretici-tüketici veri akışı üzerinde çalıştım.",
      ],
    },
  ],

  projects: [
    {
      name: "Akıllı Belediye Uygulaması",
      tag: "TÜBİTAK 2209-A",
      stack: "Flutter, Node.js, TypeScript, YOLOv8, Firebase",
      period: "May. 2026",
      bullets: [
        "Vatandaşların bir Flutter mobil istemci üzerinden kentsel altyapı sorunlarını bildirmesini sağlayan yapay zekâ destekli, çoklu platform bir uygulama geliştirdim.",
        "TensorFlow Lite üzerinden cihaz üstü YOLOv8 Nano çıkarımı, bir Node.js/Express backend, Firebase Authentication, Firestore, JWT tabanlı RBAC ve Zod doğrulamasını birleştiren uçtan uca bir mimari tasarladım.",
        "Bulut bağımlılığını azaltmak ve çevrimdışı, düşük gecikmeli, gizliliği koruyan raporlamayı desteklemek için çıkarımı doğrudan mobil cihazlarda çalıştırdım.",
        "TÜBİTAK'ın 2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı kapsamında desteklenmeye seçildi.",
      ],
      link: "https://github.com/zekiyildiz",
    },
    {
      name: "Müzikal Sinyallerde Akor Analizi",
      stack: "Python, PyQt5, Librosa, Matplotlib",
      period: "Ara. 2024",
      bullets: [
        "Kromagram çıkarımı, vuru takibi, BPM tahmini ve ses sinyali görselleştirmesi için bir masaüstü uygulaması geliştirdim; şablon eşleştirme ve yumuşatma kullanarak majör/minör akor tespiti uyguladım.",
      ],
      link: "https://github.com/zekiyildiz",
    },
    {
      name: "Ashy's Cursed House – VR Korku Kaçış Odası",
      stack: "Unity, C#",
      period: "Oca. 2025",
      bullets: [
        "Unity/C# ile VR bulmaca mekanikleri, nesne etkileşimleri ve gizli kod bulmacaları geliştirdim; Oculus Rift ve HTC Vive için seviye tasarımı, bulmaca mantığı ve kod entegrasyonunda işbirliği yaptım.",
      ],
      link: "https://github.com/zekiyildiz",
    },
  ],

  skills: [
    { group: "Diller", items: ["Java", "Python", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
    { group: "Backend", items: ["Spring Boot", "Node.js/Express", "FastAPI", "RESTful API'ler", "JPA/Hibernate", "Swagger/OpenAPI"] },
    { group: "Frontend/Mobil", items: ["React Native", "Expo", "React", "Flutter", "Vite", "Vue.js"] },
    { group: "Veritabanı/Bulut", items: ["PostgreSQL", "Supabase", "Firebase/Firestore"] },
    { group: "AI/ML", items: ["EfficientNet-V2-S", "YOLOv8", "TensorFlow Lite", "K-Means", "SVD", "TF-IDF", "Lojistik Regresyon", "LLM Entegrasyonu (OpenRouter)"] },
    { group: "Araçlar/Sistemler", items: ["Git", "GitHub", "Linux"] },
  ],

  programs: [
    {
      name: "Google Yapay Zeka ve Teknoloji Akademisi",
      role: "Bursiyer",
      period: "Eki. 2024 – Ağu. 2025",
      location: "Türkiye",
      bullets: [
        "Yapay zeka, teknoloji ve proje yönetimi alanlarında Coursera tabanlı öğrenim parkurlarını tamamladım ve gerçek dünya problemlerini çözmeye odaklı takım bazlı ideathon'lara katıldım.",
      ],
    },
  ],

  ui: {
    nav: { about: "Hakkımda", experience: "Deneyim", projects: "Projeler", skills: "Yetenekler", contact: "İletişim" },
    sectionTitles: {
      about: "Hakkımda",
      experience: "Deneyim",
      projects: "Projeler",
      skills: "Yetenekler",
      programs: "Programlar & Burslar",
      contact: "İletişim",
    },
    hero: { getInTouch: "İletişime Geç", github: "GitHub", linkedin: "LinkedIn" },
    cv: { button: "CV İndir", english: "İngilizce (PDF)", turkish: "Türkçe (PDF)" },
    contact: { intro: "Stajlara, iş birliklerine ve ilginç problemlere açığım." },
    misc: { gpa: "Not Ortalaması" },
  },
};
