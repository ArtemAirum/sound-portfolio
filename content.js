const SHOWREEL_CONFIG = {
      title: "Game Sound Design Showreel — Артём Емельянов",
      videoType: "kinescope",
      videoUrl: "https://kinescope.io/embed/cRmbtDYi3YESCatHBxpVHR",
      bgVideoUrl: "./assets/showreel-loop.mp4",
      bgPosterUrl: "",
      description: "Подборка работ: редизайн синематика, геймплея, интерактивная интеграция в Wwise, FMOD и Unity.",
      tags: []
    };

    const SITE_CONFIG = {
      email: "emeart.sd@gmail.com",
      pdfPath: "./assets/Artem_Emelyanov_Portfolio.pdf",
      showreel: SHOWREEL_CONFIG
    };

    const EXPERIENCE = [
      {
        period: "Сентябрь 2026 — настоящее время",
        role: "Sound Designer",
        company: "Resound Quake 1",
        category: "Game Audio",
        isCurrent: true,
        description: "Создание и интеграция всех состояний монстров, выстрелов и подбора оружия"
      },
      {
        period: "Август 2025 — настоящее время",
        role: "Drum and Bass музыкант",
        company: "Emeart",
        category: "Music Production",
        isCurrent: true,
        description: "Написание Drum & Bass и Neurofunk. Релизы на лейблах Paperfunk, Deepnas, High Resistance; готовится релиз на немецком лейбле Hanzom."
      },
      {
        period: "Сентябрь 2024 — Апрель 2026",
        role: "Арт-директор",
        company: "Дизайн-студия Воздух / VZDH",
        category: "Art Direction",
        isCurrent: false,
        description: "Управление дизайн-командой, работа с дедлайнами, продуктовое мышление, презентация работ и тесная коммуникация с клиентами и разработчиками."
      },
      {
        period: "Февраль 2019 — Сентябрь 2024",
        role: "Старший веб-дизайнер (Senior)",
        company: "Дизайн-студия Воздух / VZDH",
        category: "Design & Leadership",
        isCurrent: false,
        description: "Ведение проектов от начала до конца, распределение задач и проверка работы middle/junior-дизайнеров, презентация арт-директору и авторский надзор при передаче в разработку."
      },
      {
        period: "Февраль 2017 — Май 2020",
        role: "Trance & Progressive музыкант",
        company: "Airum",
        category: "Music Production",
        isCurrent: false,
        description: "Написание Trance и Progressive. Релизы на лейблах Tranсemission (Radio Record), 2Rock и RazNitzan (Нидерланды)."
      },
      {
        period: "Апрель 2016 — Февраль 2019",
        role: "Веб-дизайнер (Middle)",
        company: "Дизайн-студия Воздух / Интернет-агентство Emay",
        category: "Digital Design",
        isCurrent: false,
        description: "Проектирование интерфейсов, дизайн-систем и визуальных концепций для цифровых продуктов."
      },
      {
        period: "Сентябрь 2013 — Сентябрь 2015",
        role: "Младший дизайнер (Junior)",
        company: "Интернет-агентство Emay",
        category: "Digital Design",
        isCurrent: false,
        description: "Работа с рутинными дизайнерскими задачами."
      }
    ];

    const PROJECTS = [
      {
        id: "shooter-game-prototype",
        title: "Shooter Game Prototype",
        duration: "02:05",
        type: "Оригинал",
        genre: "Shooter",
        audioEngine: "Wwise",
        gameEngine: "Unity",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/iUv2FX9RZc3pWEdXf46daZ",
        posterUrl: "assets/posters/shooter-game-prototype.jpg",
        summary: "Курсовая работа с XSSR Academy по интерактивному звуку в Wwise.",
        details: "Курсовая работа с XSSR Academy по интерактивному звуку и аудиодвижкам. Проработан ряд интерактивных звуковых систем: система шагов по разным поверхностям и лужам, локомоция, выстрелы и фоли оружия, войсоверы пс и нпс, двигатель автомобиля и сменяющийся эмбиент." 
      },
      {
        id: "horror-game-prototype",
        title: "Horror Game Prototype",
        duration: "04:24",
        type: "Оригинал",
        genre: "Horror",
        audioEngine: "Wwise",
        gameEngine: "Unity",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/gss2S2XM1Bg3neh6LunRGK",
        posterUrl: "assets/posters/horror-game-prototype.jpg",
        summary: "Учебная работа с XSSR Academy по интерактивному звуку в Wwise",
        details: "Учебная работа с XSSR Academy по интерактивному звуку и аудиодвижкам. В работе проработана система комнат и порталов по всему дому, система шагов по разным поверхностям, система дыхания, войсоверы пс и нпс, система дронов и сменяющийся эмбиент с дождем." 
      },
      {
        id: "shooter-cyberpunk-game-prototype",
        title: "Cyberpunk Game Prototype",
        duration: "02:47",
        type: "Оригинал",
        genre: "Shooter",
        audioEngine: "FMOD",
        gameEngine: "Unity",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/0dUdSb7CEVCSEe1xAvFKrY",
        posterUrl: "assets/posters/cyberpunk-game-prototype.jpg",
        summary: "Учебная работа с XSSR Academy по интерактивному звуку в FMOD",
        details: "Учебная работа с XSSR Academy по интерактивному звуку и аудиодвижкам. В работе проработана самописная система дифракции на C#, система шагов по разным поверхностям и разной интенсивности, выстрелы и фоли оружия, войсоверы пс и нпс, интерактивная музыкая и сменяющийся эмбиент." 
      },
      {
        id: "quake-1-resound-weapon",
        title: "Quake 1 Resound — Weapons",
        duration: "02:23",
        type: "Редизайн",
        genre: "Shooter",
        audioEngine: "FMOD",
        gameEngine: "QuakeSpasm",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/dCwkiJ6nY3qyptKRWcicvw",
        posterUrl: "assets/posters/quake-1-resound-weapon.jpg",
        summary: "Редизайн оригинального оружия из культовой игры Quake 1 и его интеграция.",
        details: "Редизайн оригинального оружия из культовой игры Quake 1 и его интеграция." 
      },
      {
        id: "quake-1-resound-monsters",
        title: "Quake 1 Resound — Monsters",
        duration: "05:29",
        type: "Редизайн",
        genre: "Shooter",
        audioEngine: "FMOD",
        gameEngine: "QuakeSpasm",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/niikmMCeMN9z8ziVA7DAYW",
        posterUrl: "assets/posters/quake-1-resound-monsters.jpg",
        summary: "Редизайн оригинального звучания мобов из культовой игры Quake 1 и их интеграция.",
        details: "Редизайн оригинального звучания мобов из культовой игры Quake 1 и их интеграция." 
      },
      {
        id: "redesign-menu",
        title: "Interface Redesign",
        duration: "00:39",
        type: "Редизайн",
        genre: "Other",
        audioEngine: "Reaper",
        gameEngine: "Video",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/bprD9oDwaxVRpp9MESczep",
        posterUrl: "",
        summary: "Редизайн меню из God of War и Crash Racing Team.",
        details: "Редизайн меню из God of War и Crash Racing Team." 
      },
      {
        id: "redesign-see",
        title: "Redesign Serial See",
        duration: "02:34",
        type: "Редизайн",
        genre: "Other",
        audioEngine: "Reaper",
        gameEngine: "Video",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/nrLPtw5w7EEVhffVhy1mUA",
        posterUrl: "assets/posters/serial-see.jpg",
        summary: "Учебная работа с курса XSSR Academy по редизайну эпизода из сериала Видеть.",
        details: "Учебная работа с курса XSSR Academy по редизайну эпизода из сериала Видеть." 
      }

      
    ];