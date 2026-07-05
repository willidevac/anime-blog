import { WATCHLIST_FALLBACK } from "./watchlist-fallback.js";

const statusElement = document.querySelector("[data-watch-status]");

if (statusElement) {
  const fallbackCount = Object.values(WATCHLIST_FALLBACK).flat().length;
  statusElement.textContent = `${fallbackCount} vorbereitete Fallback-Einträge sind bereit. Live-Daten werden im nächsten Schritt angebunden.`;
}

