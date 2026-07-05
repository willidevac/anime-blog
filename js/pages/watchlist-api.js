const { loadWatchlistData } = window.AnimePulseAniList;
const { WATCHLIST_FALLBACK } = window;

const state = {
  data: WATCHLIST_FALLBACK,
  source: "fallback",
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
};

initWatchlist();

async function initWatchlist() {
  setStatus("Live-Daten werden geladen...");
  renderWatchlist(WATCHLIST_FALLBACK);

  try {
    const liveData = await loadWatchlistData({
      seasonYear: new Date().getFullYear(),
      perPage: 9,
    });

    state.data = mergeWithFallback(liveData);
    state.source = "live";
    renderWatchlist(state.data);
    setStatus("Live-Daten von AniList geladen.");
  } catch (error) {
    state.data = WATCHLIST_FALLBACK;
    state.source = "fallback";
    renderWatchlist(state.data);
    setStatus(`AniList ist gerade nicht erreichbar. Fallback-Daten werden angezeigt. ${error.message}`);
  }
}

function renderWatchlist(data) {
  renderCounts(data);
  renderHero(data);
  renderSection("airing", data.airing);
  renderSection("upcoming", data.upcoming);
  renderSection("trending", data.trending);
  renderTrailers(data);
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
    return;
  }

  elements.heroCard.innerHTML = `
    <img
      src="${escapeAttribute(heroAnime.coverImage)}"
      alt="${escapeAttribute(heroAnime.title)}"
      width="720"
      height="960"
    />
    <div>
      <p>${state.source === "live" ? "AniList Trend" : "Fallback Pick"}</p>
      <h2>${escapeHtml(heroAnime.title)}</h2>
      <span>${escapeHtml(truncateText(heroAnime.description, 180))}</span>
      ${heroAnime.siteUrl ? `<a href="${escapeAttribute(heroAnime.siteUrl)}">Quelle öffnen</a>` : ""}
    </div>
  `;

  if (elements.heroDescription) {
    elements.heroDescription.textContent = `${heroAnime.title} ist aktuell der stärkste Pick in dieser Ansicht. Datenquelle: ${state.source === "live" ? "AniList API" : "lokaler Fallback"}.`;
  }
}

function renderSection(section, entries) {
  const container = elements.sections[section];

  if (!container) {
    return;
  }

  if (!entries?.length) {
    container.innerHTML = `
      <p class="watch-empty">Für diesen Bereich sind gerade keine Einträge vorhanden.</p>
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
        src="${escapeAttribute(anime.coverImage)}"
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
