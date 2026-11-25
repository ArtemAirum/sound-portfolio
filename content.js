 /**
     * ============================================================================
     * ИНСТРУКЦИЯ ПО НАПОЛНЕНИЮ ВИДЕО С КИНЕСКОПА (KINESCOPE.IO) И ДРУГИХ ПЛОЩАДОК
     * ============================================================================
     * 1. В кабинете Кинескопа откройте нужное видео -> нажмите «Поделиться» / «Встраивание».
     * 2. Скопируйте либо прямую ссылку (например, https://kinescope.io/201234567),
     *    либо embed-ссылку (https://kinescope.io/embed/201234567),
     *    либо весь HTML-код <iframe src="..."> целиком — парсер сам извлечёт нужный URL.
     * 3. Вставьте полученную строку в поле `videoUrl` внутри `SHOWREEL_CONFIG` или в нужный
     *    объект массива `PROJECTS`.
     * 4. Также поддерживаются прямые локальные/облачные файлы `.mp4` и embed-ссылки VK / Rutube / YouTube.
     * ============================================================================
     */

    const SHOWREEL_CONFIG = {
      title: "Game Sound Design Showreel — Артём Емельянов",
      videoType: "kinescope", // 'kinescope' | 'embed' | 'youtube' | 'mp4'
      videoUrl: "https://kinescope.io/embed/cRmbtDYi3YESCatHBxpVHR",
      bgVideoUrl: "./assets/showreel-loop.mp4", // <-- Ссылка на фоновый луп без звука: "./assets/showreel-loop.mp4" или "https://kinescope.io/embed/YOUR_BG_LOOP_ID"
      bgPosterUrl: "", // <-- Опционально: статичный кадр-обложка до загрузки видео "./assets/hero-poster.jpg"
      description: "Подборка работ: интерактивная интеграция в Wwise, FMOD и Unity, синтез оружия, транспортная физика и редизайн игровых сцен.",
      tags: ["Showreel", "Wwise", "FMOD", "Unity", "REAPER"]
    };

    const SITE_CONFIG = {
      email: "artem.sound@example.com", // Замените на ваш актуальный email
      pdfPath: "./assets/Artem_Emelyanov_Portfolio.pdf", // Путь к PDF-файлу портфолио
      showreel: SHOWREEL_CONFIG
    };

    const PROJECTS = [
      {
        id: "xenolocus-vr",
        title: "Xenolocus — Sci-Fi Horror VR Atmosphere",
        duration: "02:05",
        type: "Оригинал",
        genre: "Sci-Fi Horror",
        audioEngine: "Linear (REAPER)",
        gameEngine: "VR / Video",
        waveSeed: 3.9,
        videoType: "kinescope",
        videoUrl: "https://kinescope.io/embed/YOUR_ID_1", // <-- Замените YOUR_ID_1 на ID ролика в Кинескопе
        posterUrl: "", // Опционально: путь к картинке-обложке ./assets/posters/xenolocus.jpg
        summary: "Линейный атмосферный саунд-дизайн, напряжённый эмбиент и звуки окружения для научно-фантастического хоррор VR-шутера.",
        details: "Линейный атмосферный саунд-дизайн, напряжённый эмбиент и звуки окружения для научно-фантастического хоррор VR-шутера. Особое внимание уделено тактильности интерактивных объектов, пространственной глубине станции и саспенс-текстурам."
      },
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
        videoUrl: "https://kinescope.io/embed/YOUR_ID_2", // <-- Замените YOUR_ID_2 на ID ролика в Кинескопе
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
        videoUrl: "https://kinescope.io/embed/YOUR_ID_3", // <-- Замените YOUR_ID_3 на ID ролика в Кинескопе
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
        videoUrl: "https://kinescope.io/embed/YOUR_ID_4", // <-- Замените YOUR_ID_4 на ID ролика в Кинескопе
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
        videoUrl: "https://kinescope.io/embed/YOUR_ID_5", // <-- Замените YOUR_ID_5 на ID ролика в Кинескопе
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
        videoUrl: "https://kinescope.io/embed/YOUR_ID_6", // <-- Замените YOUR_ID_6 на ID ролика в Кинескопе
        posterUrl: "",
        summary: "Техническая демонстрация: процедурное переключение передач транспорта и многослойная система выстрелов с учётом дистанции и реверберации.",
        details: "Техническая демонстрация в Wwise + Unity: процедурное переключение передач и оборотов двигателя (RPM) транспорта, а также многослойная система выстрелов с учётом дистанции, хвостов отражений и реверберации окружения."
      }
    ];