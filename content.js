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
        description: "Создание и интеграция озвучки всех состояний монстров, выстрелов и подбора оружия"
      },
      {
        period: "Август 2025 — настоящее время",
        role: "Drum and Bass музыкант",
        company: "Emeart",
        category: "Music Production",
        isCurrent: true,
        description: "Написание Drum & Bass и Neurofunk треков. Релизы на лейблах Paperfunk, High Resistance; готовится релиз на немецком лейбле Hanzom."
      },
      {
        period: "Сентябрь 2024 — Апрель 2026",
        role: "Арт-директор",
        company: "Дизайн-студия Воздух / VZDH",
        category: "Art Direction",
        isCurrent: false,
        description: "Управление дизайн-отделом, контроль пайплайнов, работа с дедлайнами, продуктовое мышление, презентация работ и тесная коммуникация с клиентами и разработчиками."
      },
      {
        period: "Февраль 2019 — Сентябрь 2024",
        role: "Старший веб-дизайнер (Senior)",
        company: "Дизайн-студия Воздух / VZDH",
        category: "Design & Leadership",
        isCurrent: false,
        description: "Ведение проектов от старта до релиза, распределение задач и проверка работы middle/junior-дизайнеров, презентация арт-директору и авторский надзор при передаче в разработку."
      },
      {
        period: "Февраль 2017 — Май 2020",
        role: "Trance & Progressive музыкант",
        company: "Airum",
        category: "Music Production",
        isCurrent: false,
        description: "Написание Trance и Progressive музыки. Официальные релизы на международных лейблах Transmission, 2rock и RazNitzan (Нидерланды)."
      },
      {
        period: "Апрель 2016 — Февраль 2019",
        role: "Веб-дизайнер (Middle) / Младший дизайнер (Junior)",
        company: "Дизайн-студия Воздух / Интернет-агентство Emay",
        category: "Digital Design",
        isCurrent: false,
        description: "Проектирование интерфейсов, дизайн-систем и визуальных концепций для цифровых продуктов (Emay: сентябрь 2013 — сентябрь 2015; ВЗДХ: с апреля 2016)."
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
        summary: "Курсовая работа с XSSR Academy по интерактивному звуку и аудиодвижкам.",
        details: "Курсовая работа с XSSR Academy по интерактивному звуку и аудиодвижкам. Проработан ряд интерактивных звуковых систем: система шагов по разным поверхностям и лужам, локомоция, выстрелы и фоли оружия, войсоверы пс и нпс, двигатель автомобиля и сменяющийся эмбиент." 
      }
      /*
      {
        id: "cyberpunk-street",
        title: "Cyberpunk Street — Interactive Audio Prototype",
        duration: "01:42",
        type: "Оригинал",
        genre: "Cyberpunk",
        audioEngine: "Wwise",
        gameEngine: "Unity",
        waveSeed: 1.2,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_2",
        posterUrl: "",
        summary: "Интерактивная звуковая система города: пространственные порталы, динамическая смена окружения, шаги по разным поверхностям и генеративный саундскейп.",
        details: "Интерактивная звуковая система города: пространственные порталы (Spatial Audio Rooms & Portals), динамическая смена окружения, система шагов по разным поверхностям с привязкой к физике и генеративный саундскейп в Wwise + Unity."
      },
      {
        id: "quake-fmod",
        title: "Quake (1996) — Audio Overhaul & FMOD Port",
        duration: "01:54",
        type: "Редизайн",
        genre: "Retro FPS",
        audioEngine: "FMOD",
        gameEngine: "QuakeSpasm",
        waveSeed: 5.3,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_3",
        posterUrl: "",
        summary: "Переосмысление звукового дизайна классического шутера: новое звучание оружия, монстров, окружения и интерактивная интеграция через FMOD.",
        details: "Переосмысление звукового дизайна классического шутера: новое звучание оружия, монстров, окружения и интерактивная интеграция через FMOD Studio в порт QuakeSpasm с динамической реверберацией и вариативностью выстрелов."
      },
      {
        id: "dead-space-redesign",
        title: "Dead Space — Combat & Foley Redesign",
        duration: "01:18",
        type: "Редизайн",
        genre: "Sci-Fi Horror",
        audioEngine: "Linear (REAPER)",
        gameEngine: "Video",
        waveSeed: 2.7,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_4",
        posterUrl: "",
        summary: "Детальный линейный редизайн боевой сцены: синтез плазменного оружия, металлические деформации, фоли костюма и саспенс-текстуры.",
        details: "Детальный линейный редизайн боевой сцены: синтез плазменного оружия, металлические деформации обшивки, тяжёлое фоли инженерного костюма и многослойные саспенс-текстуры."
      },
      {
        id: "starcraft-redesign",
        title: "StarCraft — Unit & Sci-Fi UI Sound Redesign",
        duration: "01:10",
        type: "Редизайн",
        genre: "RTS",
        audioEngine: "Linear (REAPER)",
        gameEngine: "Video",
        waveSeed: 4.5,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_5",
        posterUrl: "",
        summary: "Редизайн звуков юнитов, техники, взрывов и тактического интерфейса в эстетике научной фантастики.",
        details: "Редизайн звуков юнитов, тяжёлой техники, взрывов и тактического интерфейса в эстетике научной фантастики: сервоприводы, радиофильтрация реплик и читаемые UI-сигналы."
      },
      {
        id: "vehicle-weapon-system",
        title: "Interactive Vehicle & Multi-Layer Weapon System",
        duration: "01:26",
        type: "Оригинал",
        genre: "Action / Sim",
        audioEngine: "Wwise",
        gameEngine: "Unity",
        waveSeed: 6.1,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_6",
        posterUrl: "",
        summary: "Техническая демонстрация: процедурное переключение передач транспорта и многослойная система выстрелов с учётом дистанции и реверберации.",
        details: "Техническая демонстрация в Wwise + Unity: процедурное переключение передач и оборотов двигателя (RPM) транспорта, а также многослойная система выстрелов с учётом дистанции, хвостов отражений и реверберации окружения."
      }*/
    ];