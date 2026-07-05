(() => {
const { loadWatchlistData } = window.AnimePulseDataService;
const { WATCHLIST_FALLBACK } = window;
const FALLBACK_COVER =
  "assets/images/img-anime/Top 3 Anime für Einsteiger/einstieg-templet.png";
const TRANSLATIONS = {
  de: {
    pageTitle: "Anime Pulse | Watchlist",
    menuOpen: "Menü öffnen",
    heroKicker: "Live Watchlist | Jikan Daten",
    heroTitle: "Was du als Nächstes schauen solltest",
    heroDescription:
      "Aktuelle Anime-Daten werden geladen. Falls die API nicht erreichbar ist, bleibt eine kuratierte Fallback-Watchlist sichtbar.",
    heroActionsLabel: "Watchlist Sprungmarken",
    statsLabel: "Watchlist Überblick",
    airingShort: "Läuft gerade",
    upcomingShort: "Bald verfügbar",
    airingStat: "Läuft",
    upcomingStat: "Bald",
    fallbackPick: "Fallback Pick",
    fallbackHeroText:
      "Ruhige Fantasy, starke Welt und ein sehr guter Startpunkt für die nächste Watchlist.",
    controlsKicker: "Aktuelle Auswahl",
    controlsTitle: "Watchlist filtern",
    controlsDescription:
      "Die Daten kommen primär aus Jikan/MyAnimeList. Filter und Sortierung laufen im Browser, damit keine unnötigen API-Anfragen entstehen.",
    languageLabel: "Sprache",
    filterLabel: "Watchlist Filter",
    genreLabel: "Genre",
    statusLabel: "Status",
    sortLabel: "Sortierung",
    allGenres: "Alle Genres",
    allStatus: "Alle Status",
    releasing: "Läuft gerade",
    notYetReleased: "Noch nicht gestartet",
    finished: "Abgeschlossen",
    cancelled: "Abgebrochen",
    hiatus: "Pausiert",
    scoreSort: "Bewertung",
    popularitySort: "Popularität",
    startSort: "Season/Jahr",
    airingTitle: "Läuft gerade",
    airingDescription:
      "Aktuelle Serien mit Status, Bewertung, Genres und nächster Episode, sobald die Live-API diese Daten bereitstellt.",
    fallbackCardText:
      "Wenn die API nicht erreichbar ist, bleibt diese kuratierte Empfehlung sichtbar.",
    upcomingTitle: "Bald verfügbar",
    upcomingDescription:
      "Kommende Titel, die bereits genug Aufmerksamkeit bekommen, um auf deiner Watchlist vorzumerken.",
    trendingTitle: "Gerade im Gespräch",
    trendingDescription:
      "Titel mit hoher Aktivität, Popularität oder Bewertung. Ideal, wenn du schnell sehen willst, worüber gerade gesprochen wird.",
    trailerTitle: "Aktuelle Videos",
    trailerDescription:
      "Trailer werden nur angezeigt, wenn die Datenquelle einen passenden YouTube-Trailer liefert. Sonst bleibt der Bereich ruhig.",
    sourcesKicker: "Quellen",
    sourcesTitle: "Woher die Daten kommen",
    sourcesDescription:
      "Anime-Daten werden über die Jikan API geladen. Lokale Fallbacks sorgen dafür, dass die Watchlist auch bei API-Ausfall lesbar bleibt. AniList bleibt die bessere Datenquelle für einen späteren Proxy- oder Build-Step, ist aber direkt im Browser per CORS blockiert. News-Texte werden nicht automatisch kopiert.",
    sourceLink: "Jikan API Dokumentation",
    suggestKicker: "Community Pick",
    suggestTitle: "Empfehlung einreichen",
    suggestDescription:
      "Fehlt ein Anime, der unbedingt auf die Liste gehört? Trag ihn ein und sammle kurz, warum er sich lohnt.",
    suggestAnimeTitle: "Anime-Titel",
    suggestReason: "Warum auf die Watchlist?",
    suggestSubmit: "Vormerken",
    suggestionListLabel: "Vorgemerkte Empfehlungen",
    shareText:
      "Follow me for more content like this, and share the article with your friends!",
    shareButton: "Share",
    loading: "Live-Daten werden geladen...",
    liveLoaded: "Live-Daten von Jikan geladen.",
    liveFailed:
      "Die Live-API ist gerade nicht erreichbar. Kuratierte Fallback-Daten werden angezeigt.",
    noHeroTitle: "Filter anpassen",
    noHeroKicker: "Keine Treffer",
    noHeroText: "Mit den aktuellen Filtern gibt es keinen Hero-Pick.",
    liveTrend: "Live Trend",
    sourceOpen: "Quelle öffnen",
    heroSource: "Datenquelle",
    localFallback: "lokaler Fallback",
    strongestPick: "ist aktuell der stärkste Pick in dieser Ansicht.",
    noEntries:
      "Für diesen Bereich sind mit den aktuellen Filtern keine Einträge vorhanden.",
    animePick: "Anime Pick",
    episodes: "Folgen",
    open: "offen",
    moreInfo: "Mehr Infos",
    episode: "Episode",
    appears: "erscheint",
    noTrailers: "Aktuell wurden keine Trailer-Daten geliefert.",
    filteredView: "Ansicht gefiltert",
    allGenresStatus: "alle Genres",
    allStatusStatus: "alle Status",
    sorting: "Sortierung",
    winter: "Winter",
    spring: "Frühling",
    summer: "Sommer",
    fall: "Herbst",
  },
  en: {
    pageTitle: "Anime Pulse | Watchlist",
    menuOpen: "Open menu",
    heroKicker: "Live Watchlist | Jikan Data",
    heroTitle: "What you should watch next",
    heroDescription:
      "Current anime data is loading. If the API is unavailable, a curated fallback watchlist stays visible.",
    heroActionsLabel: "Watchlist jump links",
    statsLabel: "Watchlist overview",
    airingShort: "Airing now",
    upcomingShort: "Coming soon",
    airingStat: "Airing",
    upcomingStat: "Soon",
    fallbackPick: "Fallback Pick",
    fallbackHeroText:
      "Quiet fantasy, a strong world and a very good starting point for your next watchlist.",
    controlsKicker: "Current selection",
    controlsTitle: "Filter watchlist",
    controlsDescription:
      "The data primarily comes from Jikan/MyAnimeList. Filters and sorting run in the browser, so no unnecessary API requests are made.",
    languageLabel: "Language",
    filterLabel: "Watchlist filters",
    genreLabel: "Genre",
    statusLabel: "Status",
    sortLabel: "Sorting",
    allGenres: "All genres",
    allStatus: "All status",
    releasing: "Airing now",
    notYetReleased: "Not yet aired",
    finished: "Finished",
    cancelled: "Cancelled",
    hiatus: "On hiatus",
    scoreSort: "Score",
    popularitySort: "Popularity",
    startSort: "Season/year",
    airingTitle: "Airing now",
    airingDescription:
      "Current shows with status, score, genres and next episode details when the live API provides them.",
    fallbackCardText:
      "If the API is unavailable, this curated recommendation remains visible.",
    upcomingTitle: "Coming soon",
    upcomingDescription:
      "Upcoming titles that already have enough attention to be worth saving to your watchlist.",
    trendingTitle: "Currently talked about",
    trendingDescription:
      "Titles with high activity, popularity or scores. Ideal when you quickly want to see what people are discussing.",
    trailerTitle: "Current videos",
    trailerDescription:
      "Trailers are only shown when the data source provides a matching YouTube trailer. Otherwise the area stays quiet.",
    sourcesKicker: "Sources",
    sourcesTitle: "Where the data comes from",
    sourcesDescription:
      "Anime data is loaded via the Jikan API. Local fallbacks keep the watchlist readable even if the API is unavailable. AniList remains the stronger data source for a future proxy or build step, but direct browser requests are blocked by CORS. News articles are not copied automatically.",
    sourceLink: "Jikan API documentation",
    suggestKicker: "Community Pick",
    suggestTitle: "Submit a recommendation",
    suggestDescription:
      "Missing an anime that belongs on the list? Add it and briefly explain why it is worth watching.",
    suggestAnimeTitle: "Anime title",
    suggestReason: "Why should it be on the watchlist?",
    suggestSubmit: "Save recommendation",
    suggestionListLabel: "Saved recommendations",
    shareText:
      "Follow me for more content like this, and share the article with your friends!",
    shareButton: "Share",
    loading: "Loading live data...",
    liveLoaded: "Live data loaded from Jikan.",
    liveFailed:
      "The live API is currently unavailable. Curated fallback data is shown.",
    noHeroTitle: "Adjust filters",
    noHeroKicker: "No matches",
    noHeroText: "There is no hero pick with the current filters.",
    liveTrend: "Live Trend",
    sourceOpen: "Open source",
    heroSource: "Data source",
    localFallback: "local fallback",
    strongestPick: "is currently the strongest pick in this view.",
    noEntries: "There are no entries for this section with the current filters.",
    animePick: "Anime Pick",
    episodes: "Episodes",
    open: "unknown",
    moreInfo: "More info",
    episode: "Episode",
    appears: "airs on",
    noTrailers: "No trailer data was provided for the current selection.",
    filteredView: "Filtered view",
    allGenresStatus: "all genres",
    allStatusStatus: "all status",
    sorting: "sorting",
    winter: "Winter",
    spring: "Spring",
    summer: "Summer",
    fall: "Fall",
  },
};

const state = {
  data: WATCHLIST_FALLBACK,
  source: "fallback",
  locale: getInitialLocale(),
  filters: {
    genre: "all",
    status: "all",
    sort: "trending",
  },
};

const elements = {
  status: document.querySelector("[data-watch-status]"),
  heroCard: document.querySelector("[data-watch-hero-card]"),
  heroDescription: document.querySelector("[data-watch-hero-description]"),
  trailerGrid: document.querySelector("[data-watch-trailers]"),
  counts: {
    airing: document.querySelector("[data-watch-count-airing]"),
    upcoming: document.querySelector("[data-watch-count-upcoming]"),
    trending: document.querySelector("[data-watch-count-trending]"),
  },
  sections: {
    airing: document.querySelector('[data-watch-section="airing"]'),
    upcoming: document.querySelector('[data-watch-section="upcoming"]'),
    trending: document.querySelector('[data-watch-section="trending"]'),
  },
  filters: {
    genre: document.querySelector("[data-watch-filter-genre]"),
    status: document.querySelector("[data-watch-filter-status]"),
    sort: document.querySelector("[data-watch-sort]"),
  },
  languageButtons: document.querySelectorAll("[data-watch-lang]"),
  i18nTargets: document.querySelectorAll("[data-i18n]"),
  i18nAttrTargets: document.querySelectorAll("[data-i18n-attr]"),
};

initWatchlist();

async function initWatchlist() {
  bindControls();
  applyTranslations();
  setStatus(t("loading"));
  renderWatchlist(WATCHLIST_FALLBACK);

  try {
    const liveData = await loadWatchlistData({
      seasonYear: new Date().getFullYear(),
      perPage: 9,
    });

    state.data = mergeWithFallback(liveData);
    state.source = "live";
    renderWatchlist(state.data);
    setStatus(t("liveLoaded"));
  } catch (error) {
    state.data = WATCHLIST_FALLBACK;
    state.source = "fallback";
    renderWatchlist(state.data);
    console.warn("Live-Daten konnten nicht geladen werden:", error.message);
    setStatus(t("liveFailed"));
  }
}

function renderWatchlist(data) {
  populateGenreOptions(data);

  const filteredData = {
    airing: filterAndSortEntries(data.airing),
    upcoming: filterAndSortEntries(data.upcoming),
    trending: filterAndSortEntries(data.trending),
  };

  renderCounts(filteredData);
  renderHero(filteredData);
  renderSection("airing", filteredData.airing);
  renderSection("upcoming", filteredData.upcoming);
  renderSection("trending", filteredData.trending);
  renderTrailers(filteredData);
}

function renderCounts(data) {
  Object.entries(elements.counts).forEach(([section, element]) => {
    if (element) {
      element.textContent = String(data[section]?.length || 0);
    }
  });
}

function renderHero(data) {
  const heroAnime = data.trending?.[0] || data.airing?.[0] || data.upcoming?.[0];

  if (!heroAnime || !elements.heroCard) {
    if (elements.heroCard) {
      elements.heroCard.innerHTML = `
        <div class="watch-hero__empty">
          <p>Keine Treffer</p>
          <h2>Filter anpassen</h2>
          <span>Mit den aktuellen Filtern gibt es keinen Hero-Pick.</span>
        </div>
      `;
    }
    return;
  }

  elements.heroCard.innerHTML = `
    <img
      src="${escapeAttribute(getCoverImage(heroAnime))}"
      alt="${escapeAttribute(heroAnime.title)}"
      width="720"
      height="960"
    />
    <div>
      <p>${state.source === "live" ? "Live Trend" : "Fallback Pick"}</p>
      <h2>${escapeHtml(heroAnime.title)}</h2>
      <span>${escapeHtml(truncateText(heroAnime.description, 180))}</span>
      ${heroAnime.siteUrl ? `<a href="${escapeAttribute(heroAnime.siteUrl)}">Quelle öffnen</a>` : ""}
    </div>
  `;

  if (elements.heroDescription) {
    elements.heroDescription.textContent = `${heroAnime.title} ist aktuell der stärkste Pick in dieser Ansicht. Datenquelle: ${state.source === "live" ? "Jikan API" : "lokaler Fallback"}.`;
  }
}

function renderSection(section, entries) {
  const container = elements.sections[section];

  if (!container) {
    return;
  }

  if (!entries?.length) {
    container.innerHTML = `
      <p class="watch-empty">Für diesen Bereich sind mit den aktuellen Filtern keine Einträge vorhanden.</p>
    `;
    return;
  }

  container.innerHTML = entries.map(renderAnimeCard).join("");
}

function renderAnimeCard(anime) {
  const meta = [
    formatStatus(anime.status),
    formatSeason(anime.season, anime.seasonYear),
    anime.format,
  ].filter(Boolean);

  return `
    <article class="watch-anime-card">
      <img
        src="${escapeAttribute(getCoverImage(anime))}"
        alt="${escapeAttribute(anime.title)}"
        width="480"
        height="640"
        loading="lazy"
      />
      <div>
        <p>${escapeHtml(meta.join(" | ") || "Anime Pick")}</p>
        <h3>${escapeHtml(anime.title)}</h3>
        <span>${escapeHtml(truncateText(anime.description, 160))}</span>
        <dl class="watch-anime-card__meta">
          <div>
            <dt>Score</dt>
            <dd>${formatScore(anime.averageScore)}</dd>
          </div>
          <div>
            <dt>Folgen</dt>
            <dd>${anime.episodes || "offen"}</dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd>${escapeHtml(anime.studio)}</dd>
          </div>
        </dl>
        ${renderGenres(anime.genres)}
        ${renderAiring(anime.nextAiringEpisode)}
        ${anime.siteUrl ? `<a class="watch-card-link" href="${escapeAttribute(anime.siteUrl)}">Mehr Infos</a>` : ""}
      </div>
    </article>
  `;
}

function renderGenres(genres) {
  if (!genres?.length) {
    return "";
  }

  return `
    <ul class="watch-tags" aria-label="Genres">
      ${genres.slice(0, 4).map((genre) => `<li>${escapeHtml(genre)}</li>`).join("")}
    </ul>
  `;
}

function renderAiring(nextAiringEpisode) {
  if (!nextAiringEpisode?.airingAt) {
    return "";
  }

  const date = new Date(nextAiringEpisode.airingAt * 1000);

  return `
    <p class="watch-next-episode">
      Episode ${nextAiringEpisode.episode} erscheint ${date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}.
    </p>
  `;
}

function renderTrailers(data) {
  if (!elements.trailerGrid) {
    return;
  }

  const trailers = Object.values(data)
    .flat()
    .filter((anime) => anime.trailer?.embedUrl)
    .slice(0, 4);

  if (!trailers.length) {
    elements.trailerGrid.innerHTML = `
      <p class="watch-empty">Aktuell wurden keine Trailer-Daten geliefert.</p>
    `;
    return;
  }

  elements.trailerGrid.innerHTML = trailers
    .map((anime) => {
      return `
        <article class="trailer-card">
          <iframe
            src="${escapeAttribute(anime.trailer.embedUrl)}"
            title="${escapeAttribute(`${anime.title} Trailer`)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div>
            <p>${escapeHtml(formatSeason(anime.season, anime.seasonYear) || "Trailer")}</p>
            <h3>${escapeHtml(anime.title)}</h3>
          </div>
        </article>
      `;
    })
    .join("");
}

function bindControls() {
  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLocale(button.dataset.watchLang);
    });
  });

  elements.filters.genre?.addEventListener("change", (event) => {
    state.filters.genre = event.target.value;
    renderWatchlist(state.data);
    updateFilterStatus();
  });

  elements.filters.status?.addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderWatchlist(state.data);
    updateFilterStatus();
  });

  elements.filters.sort?.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    renderWatchlist(state.data);
    updateFilterStatus();
  });
}

function populateGenreOptions(data) {
  const select = elements.filters.genre;

  if (!select) {
    return;
  }

  const currentValue = select.value || "all";
  const genres = [...new Set(Object.values(data).flat().flatMap((anime) => anime.genres || []))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "de"));

  select.innerHTML = [
    '<option value="all">Alle Genres</option>',
    ...genres.map((genre) => `<option value="${escapeAttribute(genre)}">${escapeHtml(genre)}</option>`),
  ].join("");
  select.value = genres.includes(currentValue) ? currentValue : "all";
  state.filters.genre = select.value;
}

function filterAndSortEntries(entries = []) {
  return entries
    .filter((anime) => {
      const matchesGenre =
        state.filters.genre === "all" || anime.genres?.includes(state.filters.genre);
      const matchesStatus =
        state.filters.status === "all" || anime.status === state.filters.status;

      return matchesGenre && matchesStatus;
    })
    .sort((first, second) => sortEntries(first, second, state.filters.sort));
}

function sortEntries(first, second, sortKey) {
  const sorters = {
    score: () => (second.averageScore || 0) - (first.averageScore || 0),
    popularity: () => (second.popularity || 0) - (first.popularity || 0),
    start: () =>
      (second.seasonYear || 0) - (first.seasonYear || 0) ||
      String(second.season || "").localeCompare(String(first.season || ""), "de"),
    trending: () => (second.popularity || 0) - (first.popularity || 0),
  };

  return (sorters[sortKey] || sorters.trending)();
}

function updateFilterStatus() {
  const genre = state.filters.genre === "all" ? "alle Genres" : state.filters.genre;
  const status =
    state.filters.status === "all" ? "alle Status" : formatStatus(state.filters.status);

  setStatus(`Ansicht gefiltert: ${genre}, ${status}, Sortierung ${state.filters.sort}.`);
}

function mergeWithFallback(liveData) {
  return {
    airing: liveData.airing?.length ? liveData.airing : WATCHLIST_FALLBACK.airing,
    upcoming: liveData.upcoming?.length ? liveData.upcoming : WATCHLIST_FALLBACK.upcoming,
    trending: liveData.trending?.length ? liveData.trending : WATCHLIST_FALLBACK.trending,
  };
}

function setStatus(message) {
  if (elements.status) {
    elements.status.textContent = message;
  }
}

function formatStatus(status) {
  const labels = {
    RELEASING: "Läuft gerade",
    NOT_YET_RELEASED: "Bald verfügbar",
    FINISHED: "Abgeschlossen",
    CANCELLED: "Abgebrochen",
    HIATUS: "Pausiert",
  };

  return labels[status] || status || "";
}

function formatSeason(season, year) {
  const labels = {
    WINTER: "Winter",
    SPRING: "Frühling",
    SUMMER: "Sommer",
    FALL: "Herbst",
  };

  if (!season && !year) {
    return "";
  }

  return [labels[season] || season, year].filter(Boolean).join(" ");
}

function formatScore(score) {
  if (!score) {
    return "offen";
  }

  return `${score}%`;
}

function getCoverImage(anime) {
  return anime.coverImage || anime.bannerImage || FALLBACK_COVER;
}

function getAnimeDescription(anime) {
  return state.locale === "en" && anime.descriptionEn
    ? anime.descriptionEn
    : anime.description;
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.title = t("pageTitle");

  const menuButton = document.querySelector(".page-header__menu");
  menuButton?.setAttribute("aria-label", t("menuOpen"));

  elements.i18nTargets.forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  elements.i18nAttrTargets.forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((mapping) => {
      const [attribute, key] = mapping.split(":");

      if (attribute && key) {
        element.setAttribute(attribute.trim(), t(key.trim()));
      }
    });
  });

  updateSelectLabels();
  updateLanguageButtons();
}

function updateSelectLabels() {
  setOptionLabel(elements.filters.genre, "all", t("allGenres"));
  setOptionLabel(elements.filters.status, "all", t("allStatus"));
  setOptionLabel(elements.filters.status, "RELEASING", t("releasing"));
  setOptionLabel(elements.filters.status, "NOT_YET_RELEASED", t("notYetReleased"));
  setOptionLabel(elements.filters.status, "FINISHED", t("finished"));
  setOptionLabel(elements.filters.sort, "score", t("scoreSort"));
  setOptionLabel(elements.filters.sort, "popularity", t("popularitySort"));
  setOptionLabel(elements.filters.sort, "start", t("startSort"));
}

function setOptionLabel(select, value, label) {
  const option = select?.querySelector(`option[value="${value}"]`);

  if (option) {
    option.textContent = label;
  }
}

function updateLanguageButtons() {
  elements.languageButtons.forEach((button) => {
    const isActive = button.dataset.watchLang === state.locale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setLocale(locale) {
  if (!TRANSLATIONS[locale] || locale === state.locale) {
    return;
  }

  state.locale = locale;
  localStorage.setItem("anime-pulse-watchlist-lang", locale);
  applyTranslations();
  renderWatchlist(state.data);
  setStatus(state.source === "live" ? t("liveLoaded") : t("liveFailed"));
}

function getInitialLocale() {
  const savedLocale = localStorage.getItem("anime-pulse-watchlist-lang");

  if (TRANSLATIONS[savedLocale]) {
    return savedLocale;
  }

  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "de";
}

function getLocaleDateCode() {
  return state.locale === "en" ? "en-US" : "de-DE";
}

function t(key) {
  return TRANSLATIONS[state.locale]?.[key] || TRANSLATIONS.de[key] || key;
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text || "";
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value || "");
}

function renderHero(data) {
  const heroAnime = data.trending?.[0] || data.airing?.[0] || data.upcoming?.[0];

  if (!heroAnime || !elements.heroCard) {
    if (elements.heroCard) {
      elements.heroCard.innerHTML = `
        <div class="watch-hero__empty">
          <p>${escapeHtml(t("noHeroKicker"))}</p>
          <h2>${escapeHtml(t("noHeroTitle"))}</h2>
          <span>${escapeHtml(t("noHeroText"))}</span>
        </div>
      `;
    }
    return;
  }

  elements.heroCard.innerHTML = `
    <img
      src="${escapeAttribute(getCoverImage(heroAnime))}"
      alt="${escapeAttribute(heroAnime.title)}"
      width="720"
      height="960"
    />
    <div>
      <p>${state.source === "live" ? escapeHtml(t("liveTrend")) : escapeHtml(t("fallbackPick"))}</p>
      <h2>${escapeHtml(heroAnime.title)}</h2>
      <span>${escapeHtml(truncateText(getAnimeDescription(heroAnime), 180))}</span>
      ${heroAnime.siteUrl ? `<a href="${escapeAttribute(heroAnime.siteUrl)}">${escapeHtml(t("sourceOpen"))}</a>` : ""}
    </div>
  `;

  if (elements.heroDescription) {
    elements.heroDescription.textContent = `${heroAnime.title} ${t("strongestPick")} ${t("heroSource")}: ${state.source === "live" ? "Jikan API" : t("localFallback")}.`;
  }
}

function renderSection(section, entries) {
  const container = elements.sections[section];

  if (!container) {
    return;
  }

  if (!entries?.length) {
    container.innerHTML = `
      <p class="watch-empty">${escapeHtml(t("noEntries"))}</p>
    `;
    return;
  }

  container.innerHTML = entries.map(renderAnimeCard).join("");
}

function renderAnimeCard(anime) {
  const meta = [
    formatStatus(anime.status),
    formatSeason(anime.season, anime.seasonYear),
    anime.format,
  ].filter(Boolean);

  return `
    <article class="watch-anime-card">
      <img
        src="${escapeAttribute(getCoverImage(anime))}"
        alt="${escapeAttribute(anime.title)}"
        width="480"
        height="640"
        loading="lazy"
      />
      <div>
        <p>${escapeHtml(meta.join(" | ") || t("animePick"))}</p>
        <h3>${escapeHtml(anime.title)}</h3>
        <span>${escapeHtml(truncateText(getAnimeDescription(anime), 160))}</span>
        <dl class="watch-anime-card__meta">
          <div>
            <dt>Score</dt>
            <dd>${formatScore(anime.averageScore)}</dd>
          </div>
          <div>
            <dt>${escapeHtml(t("episodes"))}</dt>
            <dd>${anime.episodes || escapeHtml(t("open"))}</dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd>${escapeHtml(anime.studio)}</dd>
          </div>
        </dl>
        ${renderGenres(anime.genres)}
        ${renderAiring(anime.nextAiringEpisode)}
        ${anime.siteUrl ? `<a class="watch-card-link" href="${escapeAttribute(anime.siteUrl)}">${escapeHtml(t("moreInfo"))}</a>` : ""}
      </div>
    </article>
  `;
}

function renderAiring(nextAiringEpisode) {
  if (!nextAiringEpisode?.airingAt) {
    return "";
  }

  const date = new Date(nextAiringEpisode.airingAt * 1000);

  return `
    <p class="watch-next-episode">
      ${escapeHtml(t("episode"))} ${nextAiringEpisode.episode} ${escapeHtml(t("appears"))} ${date.toLocaleDateString(getLocaleDateCode(), {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}.
    </p>
  `;
}

function renderTrailers(data) {
  if (!elements.trailerGrid) {
    return;
  }

  const trailers = Object.values(data)
    .flat()
    .filter((anime) => anime.trailer?.embedUrl)
    .slice(0, 4);

  if (!trailers.length) {
    elements.trailerGrid.innerHTML = `
      <p class="watch-empty">${escapeHtml(t("noTrailers"))}</p>
    `;
    return;
  }

  elements.trailerGrid.innerHTML = trailers
    .map((anime) => {
      return `
        <article class="trailer-card">
          <iframe
            src="${escapeAttribute(anime.trailer.embedUrl)}"
            title="${escapeAttribute(`${anime.title} Trailer`)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div>
            <p>${escapeHtml(formatSeason(anime.season, anime.seasonYear) || "Trailer")}</p>
            <h3>${escapeHtml(anime.title)}</h3>
          </div>
        </article>
      `;
    })
    .join("");
}

function populateGenreOptions(data) {
  const select = elements.filters.genre;

  if (!select) {
    return;
  }

  const currentValue = select.value || "all";
  const genres = [...new Set(Object.values(data).flat().flatMap((anime) => anime.genres || []))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, state.locale));

  select.innerHTML = [
    `<option value="all">${escapeHtml(t("allGenres"))}</option>`,
    ...genres.map((genre) => `<option value="${escapeAttribute(genre)}">${escapeHtml(genre)}</option>`),
  ].join("");
  select.value = genres.includes(currentValue) ? currentValue : "all";
  state.filters.genre = select.value;
}

function updateFilterStatus() {
  const genre = state.filters.genre === "all" ? t("allGenresStatus") : state.filters.genre;
  const status =
    state.filters.status === "all" ? t("allStatusStatus") : formatStatus(state.filters.status);

  setStatus(`${t("filteredView")}: ${genre}, ${status}, ${t("sorting")} ${state.filters.sort}.`);
}

function formatStatus(status) {
  const labels = {
    RELEASING: t("releasing"),
    NOT_YET_RELEASED: t("notYetReleased"),
    FINISHED: t("finished"),
    CANCELLED: t("cancelled"),
    HIATUS: t("hiatus"),
  };

  return labels[status] || status || "";
}

function formatSeason(season, year) {
  const labels = {
    WINTER: t("winter"),
    SPRING: t("spring"),
    SUMMER: t("summer"),
    FALL: t("fall"),
  };

  if (!season && !year) {
    return "";
  }

  return [labels[season] || season, year].filter(Boolean).join(" ");
}
})();
