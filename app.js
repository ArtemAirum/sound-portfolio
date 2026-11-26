// ==================== ФИЛЬТРАЦИЯ И ОТРИСОВКА ПОРТФОЛИО ====================
const chipBaseClasses = "px-3 py-1.5 rounded-full text-xs border transition-colors cursor-pointer select-none";
const chipInactiveClasses = "bg-canvas border-borderSubtle text-zinc-400 hover:text-white hover:border-zinc-600";
const chipActiveClasses = "bg-white border-white text-canvas font-medium";

const activeFilters = {
  type: "ALL",
  genre: "ALL",
  audioEngine: "ALL",
  gameEngine: "ALL"
};

const URL_FILTER_PARAM_MAP = {
  type: "type",
  genre: "genre",
  audioEngine: "audio",
  gameEngine: "game"
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildGenreFilterChips() {
  const container = document.getElementById("genreFilterContainer");
  if (!container) return;
  const uniqueGenres = [...new Set(PROJECTS.map((p) => p.genre).filter(Boolean))];
  container.innerHTML = [
    `<button type="button" data-group="genre" data-value="ALL" class="filter-chip">Все</button>`,
    ...uniqueGenres.map(
      (genre) => `<button type="button" data-group="genre" data-value="${escapeHtml(genre)}" class="filter-chip">${escapeHtml(genre)}</button>`
    )
  ].join("");
}

function bindFilterChipEvents() {
  document.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.group;
      const val = btn.dataset.value;
      if (!group || !(group in activeFilters)) return;
      activeFilters[group] = val;
      syncFilterChipsUI();
      syncFiltersToUrl();
      renderPortfolio();
    });
  });
}

function syncFilterChipsUI() {
  document.querySelectorAll(".filter-chip").forEach((btn) => {
    const group = btn.dataset.group;
    const val = btn.dataset.value;
    const isSelected = activeFilters[group] === val;
    btn.className = `filter-chip ${chipBaseClasses} ${isSelected ? chipActiveClasses : chipInactiveClasses}`;
  });

  const hasActive = Object.values(activeFilters).some((v) => v !== "ALL");
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.classList.toggle("hidden", !hasActive);
  }
  const copyFilterBtn = document.getElementById("copyFilterLinkBtn");
  if (copyFilterBtn) {
    copyFilterBtn.classList.toggle("hidden", !hasActive);
  }
}

/**
 * Считывает предустановленные фильтры из query-параметров URL (?type=...&genre=...&audio=...&game=...)
 * и возвращает true, если в ссылке был передан хотя бы один валидный активный фильтр.
 */
function applyFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let hasUrlFilter = false;

  const validValuesByGroup = {
    type: new Set(PROJECTS.map((p) => p.type).filter(Boolean)),
    genre: new Set(PROJECTS.map((p) => p.genre).filter(Boolean)),
    audioEngine: new Set(PROJECTS.map((p) => p.audioEngine).filter(Boolean)),
    gameEngine: new Set(PROJECTS.map((p) => p.gameEngine).filter(Boolean))
  };

  Object.entries(URL_FILTER_PARAM_MAP).forEach(([group, paramKey]) => {
    const rawVal = params.get(paramKey);
    if (!rawVal) return;

    const matchedValue = [...validValuesByGroup[group]].find(
      (val) => val.toLowerCase() === rawVal.trim().toLowerCase()
    );

    if (matchedValue) {
      activeFilters[group] = matchedValue;
      hasUrlFilter = true;
    }
  });

  return hasUrlFilter;
}

/**
 * Обновляет query-параметры в адресной строке браузера при изменении фильтров.
 */
function syncFiltersToUrl() {
  if (!window.history || !window.history.replaceState) return;
  const url = new URL(window.location.href);

  Object.entries(URL_FILTER_PARAM_MAP).forEach(([group, paramKey]) => {
    const val = activeFilters[group];
    if (val && val !== "ALL") {
      url.searchParams.set(paramKey, val);
    } else {
      url.searchParams.delete(paramKey);
    }
  });

  const hasAnyFilter = Object.values(activeFilters).some((v) => v !== "ALL");
  if (hasAnyFilter) {
    url.hash = "portfolio";
  } else if (url.hash === "#portfolio") {
    url.hash = "";
  }

  window.history.replaceState(null, "", url.toString());
}

function copyFilteredUrl() {
  syncFiltersToUrl();
  const shareUrl = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl)
      .then(() => showToast("Ссылка с фильтром скопирована"))
      .catch(() => fallbackCopyWithCustomToast(shareUrl, "Ссылка с фильтром скопирована"));
  } else {
    fallbackCopyWithCustomToast(shareUrl, "Ссылка с фильтром скопирована");
  }
}

function buildWaveformSvg(seed = 1.5) {
  const bars = 38;
  let rects = "";
  for (let i = 0; i < bars; i++) {
    const raw = Math.abs(Math.sin(i * 0.42 + seed) * Math.cos(i * 0.19 - seed * 0.6));
    const h = Math.max(12, Math.round(raw * 64));
    const y = Math.round((76 - h) / 2);
    const x = i * 9 + 4;
    const isAccent = i % 7 === 2;
    rects += `<rect x="${x}" y="${y}" width="3.5" height="${h}" rx="1.75" fill="${isAccent ? "#FF4D24" : "#3F3F46"}" opacity="${isAccent ? "0.9" : "0.7"}" />`;
  }
  return `
    <svg viewBox="0 0 348 76" class="w-4/5 h-16 overflow-visible" aria-hidden="true">
      ${rects}
    </svg>
  `;
}

function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  const emptyState = document.getElementById("emptyState");
  const countBadge = document.getElementById("projectCountBadge");
  if (!grid || !emptyState || !countBadge) return;

  const filtered = PROJECTS.filter((item) => {
    const matchType = activeFilters.type === "ALL" || item.type === activeFilters.type;
    const matchGenre = activeFilters.genre === "ALL" || item.genre === activeFilters.genre;
    const matchAudio = activeFilters.audioEngine === "ALL" || item.audioEngine === activeFilters.audioEngine;
    const matchGame = activeFilters.gameEngine === "ALL" || item.gameEngine === activeFilters.gameEngine;
    return matchType && matchGenre && matchAudio && matchGame;
  });

  countBadge.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  grid.innerHTML = filtered.map((project) => {
    const isRedesign = project.type === "Редизайн";
    const typeTagClass = isRedesign
      ? "border-accent/40 text-accent bg-accent/10"
      : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10";

    const mediaPreview = project.posterUrl
      ? `<img src="${escapeHtml(project.posterUrl)}" alt="${escapeHtml(project.title)}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />`
      : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#161619] to-[#0D0D0F]">${buildWaveformSvg(project.waveSeed)}</div>`;

    return `
      <article
        onclick="openProjectModal('${escapeHtml(project.id)}')"
        class="group rounded-2xl bg-surface hover:bg-surfaceHover border border-borderSubtle hover:border-zinc-700 overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
      >
        <div class="relative aspect-video bg-canvas border-b border-borderSubtle overflow-hidden">
          ${mediaPreview}

          <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
            <div class="w-12 h-12 rounded-full bg-white/95 text-canvas flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>

          <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm font-mono text-[11px] text-zinc-200 border border-white/10">
            ${escapeHtml(project.duration)}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex flex-wrap gap-1.5 mb-3.5">
              <span class="px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${typeTagClass}">
                ${escapeHtml(project.type)}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-canvas border border-borderSubtle text-[11px] text-zinc-300">
                ${escapeHtml(project.genre)}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-canvas border border-borderSubtle font-mono text-[11px] text-zinc-300">
                ${escapeHtml(project.audioEngine)}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-canvas border border-borderSubtle font-mono text-[11px] text-zinc-400">
                ${escapeHtml(project.gameEngine)}
              </span>
            </div>

            <h3 class="text-base sm:text-lg font-semibold text-white group-hover:text-accent transition-colors leading-snug mb-2">
              ${escapeHtml(project.title)}
            </h3>

            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              ${escapeHtml(project.summary)}
            </p>
          </div>

          <div class="pt-3 border-t border-borderSubtle/80 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
            <span>Смотреть видео</span>
            <span>↗</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  activeFilters.type = "ALL";
  activeFilters.genre = "ALL";
  activeFilters.audioEngine = "ALL";
  activeFilters.gameEngine = "ALL";
  syncFilterChipsUI();
  syncFiltersToUrl();
  renderPortfolio();
}

// ==================== ОТРИСОВКА ОПЫТА РАБОТЫ ====================
function renderExperience() {
  const container = document.getElementById("experienceList");
  if (!container || !Array.isArray(EXPERIENCE)) return;

  container.innerHTML = EXPERIENCE.map((item) => {
    const badgeClass = item.isCurrent
      ? "border-accent/40 text-accent bg-accent/10"
      : "border-borderSubtle text-zinc-400 bg-surface";

    return `
      <div class="py-7 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group">
        <div class="lg:col-span-4 space-y-2">
          <div class="font-mono text-xs text-zinc-400">${escapeHtml(item.period)}</div>
          <div class="inline-flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${badgeClass}">
              ${escapeHtml(item.category)}
            </span>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-2.5">
          <div class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 class="text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors">
              ${escapeHtml(item.role)}
            </h3>
            <span class="text-sm font-medium text-zinc-400">— ${escapeHtml(item.company)}</span>
          </div>
          <p class="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            ${escapeHtml(item.description)}
          </p>
        </div>
      </div>
    `;
  }).join("");
}

// ==================== ПАРСЕР ВИДЕОИСТОЧНИКОВ И МОДАЛЬНЫЙ ПЛЕЕР ====================
const modal = document.getElementById("videoModal");
const modalTitle = document.getElementById("modalTitle");
const modalPlayerContainer = document.getElementById("modalPlayerContainer");
const modalTags = document.getElementById("modalTags");
const modalDescription = document.getElementById("modalDescription");

function parseVideoSource(rawInput, videoType = "kinescope", autoplay = true) {
  if (!rawInput || typeof rawInput !== "string") {
    return { kind: "empty", url: "", isPlaceholder: false };
  }

  let source = rawInput.trim();
  if (!source) {
    return { kind: "empty", url: "", isPlaceholder: false };
  }

  const iframeSrcMatch = source.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeSrcMatch && iframeSrcMatch[1]) {
    source = iframeSrcMatch[1].trim();
  }

  const isPlaceholder = /YOUR_(SHOWREEL_)?ID/i.test(source);

  if (videoType === "mp4" || source.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return { kind: "mp4", url: source, isPlaceholder };
  }

  const kinescopeMatch = source.match(/^https?:\/\/(?:www\.)?kinescope\.io\/(?:embed\/)?([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]+))?(\?.*)?$/i);
  if (videoType === "kinescope" || kinescopeMatch) {
    let embedUrl = source;
    if (kinescopeMatch) {
      const videoId = kinescopeMatch[1];
      const subId = kinescopeMatch[2] ? `/${kinescopeMatch[2]}` : "";
      const query = kinescopeMatch[3] || "";
      embedUrl = `https://kinescope.io/embed/${videoId}${subId}${query}`;
    }
    if (autoplay && !/[?&]autoplay=/i.test(embedUrl)) {
      embedUrl += (embedUrl.includes("?") ? "&" : "?") + "autoplay=1";
    }
    return { kind: "iframe", url: embedUrl, isPlaceholder };
  }

  const ytMatch = source.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/i);
  if (videoType === "youtube" || ytMatch) {
    let embedUrl = ytMatch ? `https://www.youtube.com/embed/${ytMatch[1]}` : source;
    if (autoplay && !/[?&]autoplay=/i.test(embedUrl)) {
      embedUrl += (embedUrl.includes("?") ? "&" : "?") + "autoplay=1&rel=0";
    }
    return { kind: "iframe", url: embedUrl, isPlaceholder };
  }

  let genericEmbedUrl = source;
  if (autoplay && !/[?&]autoplay=/i.test(genericEmbedUrl)) {
    genericEmbedUrl += (genericEmbedUrl.includes("?") ? "&" : "?") + "autoplay=1";
  }
  return { kind: "iframe", url: genericEmbedUrl, isPlaceholder };
}

function renderVideoContent(rawUrl, title, videoType = "kinescope") {
  const parsed = parseVideoSource(rawUrl, videoType, true);

  if (parsed.kind === "empty" || parsed.isPlaceholder) {
    return `
      <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-canvas">
        <div class="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mb-4 text-accent">
          <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <p class="text-sm font-medium text-white mb-2">${escapeHtml(title)}</p>
        <p class="text-xs text-zinc-400 max-w-md leading-relaxed">
          Укажите ссылку или код встраивания из <span class="text-white font-medium">Кинескопа</span> (например, <code class="text-accent font-mono">https://kinescope.io/embed/ID</code>) в поле <code class="text-zinc-200 font-mono">videoUrl</code> внутри <code class="text-zinc-200 font-mono">content.js</code>.
        </p>
      </div>
    `;
  }

  if (parsed.kind === "mp4") {
    return `
      <video controls autoplay playsinline class="w-full h-full object-contain bg-black">
        <source src="${escapeHtml(parsed.url)}" type="video/mp4" />
      </video>
    `;
  }

  return `
    <iframe
      src="${escapeHtml(parsed.url)}"
      title="${escapeHtml(title)}"
      class="w-full h-full border-0"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
      allowfullscreen
    ></iframe>
  `;
}

function openShowreelModal() {
  if (!modal || !modalTitle || !modalPlayerContainer || !modalDescription || !modalTags) return;
  const sr = SITE_CONFIG.showreel;
  modalTitle.textContent = sr.title;
  modalPlayerContainer.innerHTML = renderVideoContent(sr.videoUrl, sr.title, sr.videoType);
  modalDescription.textContent = sr.description;
  modalTags.innerHTML = (sr.tags || [])
    .map((t) => `<span class="px-2.5 py-1 rounded-full bg-canvas border border-borderSubtle text-xs text-zinc-300">${escapeHtml(t)}</span>`)
    .join("");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function openProjectModal(projectId) {
  if (!modal || !modalTitle || !modalPlayerContainer || !modalDescription || !modalTags) return;
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return;

  modalTitle.textContent = project.title;
  modalPlayerContainer.innerHTML = renderVideoContent(project.videoUrl, project.title, project.videoType);
  modalDescription.textContent = project.details;

  const tagsList = [
    project.type,
    project.genre,
    `Аудио: ${project.audioEngine}`,
    `Движок: ${project.gameEngine}`
  ];

  modalTags.innerHTML = tagsList
    .map((label, idx) => {
      const cls = idx === 0 && project.type === "Редизайн"
        ? "border-accent/40 text-accent bg-accent/10"
        : "border-borderSubtle text-zinc-300 bg-canvas";
      return `<span class="px-2.5 py-1 rounded-full border text-xs ${cls}">${escapeHtml(label)}</span>`;
    })
    .join("");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  if (!modal || !modalPlayerContainer) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modalPlayerContainer.innerHTML = "";
  document.body.style.overflow = "";
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    closeVideoModal();
  }
});

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("flex");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 3000);
}

function copyEmail() {
  const email = SITE_CONFIG.email;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => showToast(`Email скопирован: ${email}`))
      .catch(() => fallbackCopy(email));
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(email) {
  fallbackCopyWithCustomToast(email, `Email скопирован: ${email}`);
}

function fallbackCopyWithCustomToast(textToCopy, toastMessage) {
  const tempInput = document.createElement("textarea");
  tempInput.value = textToCopy;
  tempInput.style.position = "fixed";
  tempInput.style.opacity = "0";
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast(toastMessage);
  } catch (err) {
    showToast(textToCopy);
  }
  document.body.removeChild(tempInput);
}

function handlePdfDownload(event) {
  if (window.location.protocol === "file:") return;
  fetch(SITE_CONFIG.pdfPath, { method: "HEAD" })
    .then((res) => {
      if (!res.ok) {
        event.preventDefault();
        showToast("Положите файл портфолио по пути ./assets/Artem_Emelyanov_Portfolio.pdf");
      }
    })
    .catch(() => {});
}

// ==================== ФОНОВОЕ ВИДЕО И ЗВУКОВАЯ ВОЛНА В HERO ====================
function initHeroBackground() {
  const container = document.getElementById("heroBgMedia");
  const waveCanvas = document.getElementById("heroWaveCanvas");
  const rawBgUrl = SITE_CONFIG.showreel.bgVideoUrl;
  if (!container || !rawBgUrl) return;

  const parsed = parseVideoSource(rawBgUrl, "auto", true);
  if (parsed.kind === "empty" || parsed.isPlaceholder) return;

  if (parsed.kind === "mp4") {
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (SITE_CONFIG.showreel.bgPosterUrl) {
      video.poster = SITE_CONFIG.showreel.bgPosterUrl;
    }
    video.className = "w-full h-full object-cover opacity-80 pointer-events-none";

    const source = document.createElement("source");
    source.src = parsed.url;
    source.type = "video/mp4";
    video.appendChild(source);

    // При ошибке загрузки локального/внешнего mp4 оставляем фоновую волну без пустого места
    video.addEventListener("error", () => {
      video.remove();
      if (waveCanvas) waveCanvas.style.display = "block";
    });

    if (waveCanvas) waveCanvas.style.display = "none";
    container.prepend(video);
    video.play().catch(() => {});
    return;
  }

  if (waveCanvas) waveCanvas.style.display = "none";
  let bgEmbedUrl = parsed.url;
  const extraParams = ["muted=1", "loop=1", "controls=0", "background=1"];
  extraParams.forEach((param) => {
    const key = param.split("=")[0];
    if (!new RegExp(`[?&]${key}=`, "i").test(bgEmbedUrl)) {
      bgEmbedUrl += (bgEmbedUrl.includes("?") ? "&" : "?") + param;
    }
  });

  const wrapper = document.createElement("div");
  wrapper.className = "absolute inset-0 overflow-hidden pointer-events-none opacity-80";
  wrapper.innerHTML = `
    <iframe
      src="${escapeHtml(bgEmbedUrl)}"
      title="Showreel background"
      class="w-[140%] h-[140%] -ml-[20%] -mt-[12%] object-cover border-0 pointer-events-none"
      frameborder="0"
      allow="autoplay; fullscreen; encrypted-media"
    ></iframe>
  `;
  container.prepend(wrapper);
}

function initHeroWave() {
  const canvas = document.getElementById("heroWaveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let phase = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const centerY = height * 0.54;

    const waves = [
      { amp: 34, freq: 0.0045, speed: 0.014, color: "rgba(255, 77, 36, 0.24)", lineWidth: 1.5 },
      { amp: 20, freq: 0.0075, speed: -0.01, color: "rgba(255, 255, 255, 0.08)", lineWidth: 1 }
    ];

    waves.forEach((w, idx) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.lineWidth;

      for (let x = 0; x <= width; x += 4) {
        const envelope = Math.sin((x / Math.max(width, 1)) * Math.PI);
        const y =
          centerY +
          Math.sin(x * w.freq + phase * (idx === 0 ? 1 : -0.8)) * w.amp * envelope +
          Math.cos(x * w.freq * 2.1 - phase * 0.6) * (w.amp * 0.35) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    phase += 0.018;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

window.addEventListener("DOMContentLoaded", () => {
  const emailTextEl = document.getElementById("emailBtnText");
  if (emailTextEl) emailTextEl.textContent = SITE_CONFIG.email;
  buildGenreFilterChips();
  const openedWithUrlFilters = applyFiltersFromUrl();
  bindFilterChipEvents();
  syncFilterChipsUI();
  renderPortfolio();
  renderExperience();
  initHeroBackground();
  initHeroWave();

  if (openedWithUrlFilters) {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      setTimeout(() => {
        portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }
});