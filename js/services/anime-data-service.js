(() => {
const JIKAN_BASE_URL = "https://api.jikan.moe/v4";
const CACHE_TTL_MS = 30 * 60 * 1000;

async function loadWatchlistData(options = {}) {
  const perPage = options.perPage || 9;
  const cacheKey = `anime-pulse-watchlist-jikan-v1-${perPage}`;
  const cachedData = readCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const [airing, upcoming, trending] = await Promise.all([
    requestJikan(`/seasons/now?limit=${perPage}`),
    requestJikan(`/seasons/upcoming?limit=${perPage}`),
    requestJikan(`/top/anime?filter=airing&limit=${perPage}`),
  ]);

  const data = {
    airing: normalizeJikanList(airing),
    upcoming: normalizeJikanList(upcoming),
    trending: normalizeJikanList(trending),
  };

  writeCachedData(cacheKey, data);

  return data;
}

async function requestJikan(path) {
  const response = await fetch(`${JIKAN_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Jikan antwortet mit Status ${response.status}.`);
  }

  const payload = await response.json();

  return payload.data || [];
}

function normalizeJikanList(mediaList) {
  return mediaList.map((media) => {
    return {
      id: media.mal_id,
      title: media.title_english || media.title || media.title_japanese || "Unbekannter Titel",
      description: cleanDescription(media.synopsis),
      coverImage:
        media.images?.webp?.large_image_url ||
        media.images?.jpg?.large_image_url ||
        media.images?.webp?.image_url ||
        "",
      bannerImage: "",
      imageColor: "#27eaf5",
      genres: normalizeNamedList(media.genres),
      format: media.type || "",
      status: normalizeStatus(media.status),
      season: normalizeSeason(media.season),
      seasonYear: media.year || "",
      episodes: media.episodes,
      duration: media.duration,
      averageScore: media.score ? Math.round(media.score * 10) : null,
      popularity: media.members || media.scored_by || 0,
      studio: normalizeNamedList(media.studios)[0] || "Studio offen",
      siteUrl: media.url || "",
      nextAiringEpisode: null,
      trailer: normalizeTrailer(media.trailer),
    };
  });
}

function normalizeNamedList(items) {
  return Array.isArray(items) ? items.map((item) => item.name).filter(Boolean) : [];
}

function cleanDescription(description) {
  if (!description) {
    return "Noch keine Beschreibung vorhanden.";
  }

  return description.replace(/\s+/g, " ").trim();
}

function normalizeStatus(status) {
  const statusMap = {
    "Currently Airing": "RELEASING",
    "Not yet aired": "NOT_YET_RELEASED",
    "Finished Airing": "FINISHED",
  };

  return statusMap[status] || status || "";
}

function normalizeSeason(season) {
  const seasonMap = {
    winter: "WINTER",
    spring: "SPRING",
    summer: "SUMMER",
    fall: "FALL",
  };

  return seasonMap[String(season || "").toLowerCase()] || "";
}

function normalizeTrailer(trailer) {
  if (!trailer?.youtube_id) {
    return null;
  }

  return {
    id: trailer.youtube_id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${trailer.youtube_id}`,
    thumbnail: trailer.images?.maximum_image_url || trailer.images?.large_image_url || "",
  };
}

function readCachedData(cacheKey) {
  try {
    const cachedItem = sessionStorage.getItem(cacheKey);

    if (!cachedItem) {
      return null;
    }

    const parsedItem = JSON.parse(cachedItem);
    const isFresh = Date.now() - parsedItem.createdAt < CACHE_TTL_MS;

    return isFresh ? parsedItem.data : null;
  } catch {
    return null;
  }
}

function writeCachedData(cacheKey, data) {
  try {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({
        createdAt: Date.now(),
        data,
      }),
    );
  } catch {
    // Cache ist nur eine Optimierung. Wenn er nicht verfuegbar ist, laeuft die Seite weiter.
  }
}

window.AnimePulseDataService = {
  loadWatchlistData,
};
})();
