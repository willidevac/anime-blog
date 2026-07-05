(() => {
const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const CACHE_TTL_MS = 30 * 60 * 1000;

const MEDIA_FIELDS = `
  id
  siteUrl
  title {
    romaji
    english
    native
  }
  description(asHtml: false)
  coverImage {
    extraLarge
    large
    color
  }
  bannerImage
  genres
  format
  status
  season
  seasonYear
  episodes
  duration
  averageScore
  popularity
  trailer {
    id
    site
    thumbnail
  }
  studios(isMain: true) {
    nodes {
      name
    }
  }
  nextAiringEpisode {
    episode
    airingAt
  }
`;

const WATCHLIST_QUERIES = {
  airing: `
    query WatchlistAiring($page: Int, $perPage: Int, $seasonYear: Int) {
      Page(page: $page, perPage: $perPage) {
        media(
          type: ANIME
          status: RELEASING
          seasonYear: $seasonYear
          sort: TRENDING_DESC
        ) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `,
  upcoming: `
    query WatchlistUpcoming($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(
          type: ANIME
          status: NOT_YET_RELEASED
          sort: POPULARITY_DESC
        ) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `,
  trending: `
    query WatchlistTrending($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: TRENDING_DESC) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `,
};

async function loadWatchlistData(options = {}) {
  const seasonYear = options.seasonYear || new Date().getFullYear();
  const perPage = options.perPage || 9;
  const cacheKey = `anime-pulse-watchlist-v1-${seasonYear}-${perPage}`;
  const cachedData = readCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const [airing, upcoming, trending] = await Promise.all([
    requestAniList(WATCHLIST_QUERIES.airing, {
      page: 1,
      perPage,
      seasonYear,
    }),
    requestAniList(WATCHLIST_QUERIES.upcoming, {
      page: 1,
      perPage,
    }),
    requestAniList(WATCHLIST_QUERIES.trending, {
      page: 1,
      perPage,
    }),
  ]);

  const data = {
    airing: normalizeMediaList(airing),
    upcoming: normalizeMediaList(upcoming),
    trending: normalizeMediaList(trending),
  };

  writeCachedData(cacheKey, data);

  return data;
}

async function requestAniList(query, variables) {
  const response = await fetch(ANILIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`AniList antwortet mit Status ${response.status}.`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "AniList Anfrage fehlgeschlagen.");
  }

  return payload.data?.Page?.media || [];
}

function normalizeMediaList(mediaList) {
  return mediaList.map((media) => {
    const title = media.title?.english || media.title?.romaji || media.title?.native || "Unbekannter Titel";

    return {
      id: media.id,
      title,
      description: cleanDescription(media.description),
      coverImage: media.coverImage?.extraLarge || media.coverImage?.large || "",
      bannerImage: media.bannerImage || "",
      imageColor: media.coverImage?.color || "#27eaf5",
      genres: media.genres || [],
      format: media.format || "",
      status: media.status || "",
      season: media.season || "",
      seasonYear: media.seasonYear || "",
      episodes: media.episodes,
      duration: media.duration,
      averageScore: media.averageScore,
      popularity: media.popularity,
      studio: media.studios?.nodes?.[0]?.name || "Studio offen",
      siteUrl: media.siteUrl || "",
      nextAiringEpisode: media.nextAiringEpisode || null,
      trailer: normalizeTrailer(media.trailer),
    };
  });
}

function cleanDescription(description) {
  if (!description) {
    return "Noch keine Beschreibung vorhanden.";
  }

  return description
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTrailer(trailer) {
  if (!trailer?.id || trailer.site !== "youtube") {
    return null;
  }

  return {
    id: trailer.id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${trailer.id}`,
    thumbnail: trailer.thumbnail || "",
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

window.AnimePulseAniList = {
  loadWatchlistData,
};
})();
