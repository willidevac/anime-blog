# Aufgabenliste: Watchlist modernisieren

Stand: 05.07.2026

Ziel: Die Watchlist soll von einer statischen Empfehlungsseite zu einer aktuellen Anime-Uebersichtsseite werden. Nutzer sollen dort sehen koennen, welche Anime gerade relevant sind, was neu laeuft, was bald erscheint, welche Trailer/Poster dazu gehoeren und welche Titel sich fuer die eigene Watchlist lohnen.

Diese Aufgabenliste ist bewusst als Senior-Developer-Plan geschrieben: erst die beste Datenquelle waehlen, dann die Architektur sauber planen, danach UI und technische Umsetzung schrittweise umbauen.

## 1. Beste API-Strategie

### Empfehlung

Die beste Grundlage fuer dieses Projekt ist:

1. AniList GraphQL API als Hauptdatenquelle
2. Optional AnimeSchedule.net API fuer genaue Ausstrahlungszeiten
3. Optional News-/RSS-Quellen nur als Inspiration und Quellenverweis

### Warum AniList als Haupt-API?

- Offizielle und gut dokumentierte GraphQL API
- Oeffentliche Anime-Daten koennen ohne Login abgefragt werden
- Liefert viele Daten, die fuer die Watchlist wichtig sind:
  - Titel
  - Coverbilder
  - Bannerbilder
  - Beschreibungen
  - Genres
  - Tags
  - Season
  - Startdatum
  - Airing-Informationen
  - Popularitaet
  - Durchschnittsbewertung
  - Episodenzahl
  - Status
  - Trailer-Informationen
  - offizielle Links
- GraphQL erlaubt gezielte Abfragen, statt unnoetig grosse REST-Antworten zu laden.

Quellen:

- https://docs.anilist.co/
- https://github.com/AniList/docs

### Warum nicht Jikan als Haupt-API?

Jikan ist einfach zu nutzen und liefert MyAnimeList-nahe Daten. Es ist aber inoffiziell und die oeffentliche API soll laut aktuellem Hinweis zum 01.10.2026 eingestellt werden. Fuer ein langlebigeres Projekt ist das ein Risiko.

Quelle:

- https://jikan.moe/

### Warum AnimeSchedule nur optional?

AnimeSchedule ist besonders nuetzlich fuer genaue Airing-Zeiten und Wochenplaene. Fuer die komplette Watchlist ist AniList flexibler. AnimeSchedule kann spaeter ergaenzt werden, wenn die Watchlist eine echte "Heute laeuft" oder "Diese Woche" Sektion bekommen soll.

Quelle:

- https://img.animeschedule.net/api/v3/documentation

## 2. Zielbild fuer die neue Watchlist

Die Watchlist soll folgende Bereiche enthalten:

1. Hero-Bereich mit aktuellem Top-Anime
2. "Airing Now" Bereich fuer aktuell laufende Serien
3. "Upcoming" Bereich fuer bald startende Anime
4. "Top Rated" oder "Trending" Bereich
5. Filter nach Genre, Season und Status
6. Detailkarten mit allen wichtigen Infos
7. Trailer- oder Video-Bereich, falls ein Trailer vorhanden ist
8. Quellen- und Update-Hinweis
9. Optional: lokale Favoritenliste im Browser speichern

## 3. Daten, die pro Anime angezeigt werden sollen

Jede Anime-Karte sollte mindestens diese Informationen anzeigen:

- Coverbild
- Titel auf Deutsch/Englisch oder Romaji
- Kurzbeschreibung
- Genres
- Status
- Season und Jahr
- Startdatum
- naechste Episode, falls vorhanden
- durchschnittliche Bewertung
- Popularitaet
- Episodenanzahl, falls bekannt
- Link zur Quelle

Optional:

- Trailer-Link
- Studio
- Format, z. B. TV, Movie, OVA
- Dauer pro Episode
- Altersfreigabe, falls vorhanden
- Tags wie Action, Fantasy, Slice of Life

## 4. Technische Architektur

### Aktueller Zustand

Die Watchlist ist aktuell statisch in `watchlist.html` aufgebaut. Bilder, Texte und Trailer sind fest im HTML gepflegt.

### Zielzustand

Die Watchlist sollte dynamische Daten laden, aber trotzdem stabil bleiben.

Empfohlener Aufbau:

- `watchlist.html`
  - enthaelt Layout, leere Container und Fallback-Inhalte
- `js/pages/watchlist-api.js`
  - laedt Daten von AniList
  - bereitet Daten fuer die UI auf
  - rendert Anime-Karten
- `js/services/anilist-service.js`
  - enthaelt GraphQL-Abfragen
  - kapselt API-Details
- `js/utils/formatters.js`
  - formatiert Datum, Bewertung, Episoden, Status
- `css/pages/watchlist.css`
  - enthaelt nur Layout und Styling fuer die Watchlist

Bei einem rein statischen Hosting ohne Backend ist das machbar, weil AniList oeffentliche Daten clientseitig liefern kann.

## 5. Wichtige Entscheidung: Clientseitig oder mit Build-Schritt?

### Option A: Clientseitig im Browser laden

Vorteile:

- Einfach umzusetzen
- Kein Backend notwendig
- Funktioniert mit statischem Hosting
- Daten sind beim Seitenaufruf aktuell

Nachteile:

- Nutzer sieht eventuell Ladezustand
- API-Ausfall wirkt direkt auf die Seite
- Caching ist begrenzt

### Option B: Beim Build Daten ziehen und statisch einbauen

Vorteile:

- Seite laedt schneller
- Keine API-Abhaengigkeit beim Nutzer
- SEO-freundlicher
- Weniger Risiko durch Rate Limits

Nachteile:

- Braucht Build-Prozess oder Deployment-Job
- Daten sind nur so aktuell wie der letzte Build

### Senior-Dev-Empfehlung

Fuer dieses Lernprojekt zuerst Option A bauen, aber so strukturieren, dass spaeter Option B moeglich bleibt.

Das bedeutet:

- API-Zugriff in eigene Service-Datei auslagern
- Rendering von Daten trennen
- Fallback-Daten lokal bereithalten
- Keine API-Logik direkt in `watchlist.html` schreiben

## 6. Konkrete Aufgaben fuer den Umbau

### Phase 1: Vorbereitung

- Bestehende Watchlist-Struktur analysieren
- Entscheiden, welche statischen Bereiche bleiben sollen
- Alte hardcodierte Anime-Listen markieren
- Bestehende Trailer-Sektion pruefen
- Ziel-Datenmodell fuer Anime-Karten definieren
- Fallback-Daten fuer API-Ausfall vorbereiten

### Phase 2: AniList-Anbindung

- Neue Datei `js/services/anilist-service.js` planen
- GraphQL-Query fuer aktuell laufende Anime erstellen
- GraphQL-Query fuer kommende Anime erstellen
- GraphQL-Query fuer Trending Anime erstellen
- Fehlerbehandlung definieren
- Loading-State definieren
- Empty-State definieren
- Rate-Limit-schonendes Laden planen

### Phase 3: Datenmodell

Ein internes Datenmodell definieren, damit die UI nicht direkt vom API-Format abhaengt.

Beispiel:

```js
{
  id: 1,
  title: "Anime Titel",
  description: "Kurze Beschreibung",
  coverImage: "https://...",
  bannerImage: "https://...",
  genres: ["Action", "Fantasy"],
  season: "SPRING",
  seasonYear: 2026,
  status: "RELEASING",
  episodes: 12,
  nextAiringEpisode: {
    episode: 4,
    airingAt: 1780000000
  },
  averageScore: 82,
  popularity: 120000,
  siteUrl: "https://anilist.co/anime/..."
}
```

### Phase 4: Watchlist-UI umbauen

- Hero-Bereich dynamisch mit Top-Trending-Anime befuellen
- Sektion "Aktuell laufend" erstellen
- Sektion "Bald verfuegbar" erstellen
- Sektion "Top Trends" erstellen
- Anime-Karten als wiederverwendbares Markup definieren
- Loading-Skeleton oder Ladezustand einbauen
- Fehlermeldung bei API-Ausfall anzeigen
- Fallback-Liste anzeigen, wenn API nicht antwortet

### Phase 5: Filter und Bedienung

- Filter nach Genre einbauen
- Filter nach Status einbauen:
  - Releasing
  - Not yet released
  - Finished
- Sortierung einbauen:
  - Trending
  - Popularity
  - Score
  - Start date
- Mobile Bedienung pruefen
- Tastaturbedienung pruefen
- Fokus-Stile pruefen

### Phase 6: Trailer und Medien

- AniList-Trailerdaten pruefen
- Trailer nur anzeigen, wenn Daten vorhanden sind
- YouTube-NoCookie bevorzugen
- Iframes lazy laden
- Fallback anzeigen, falls kein Trailer vorhanden ist
- Keine automatisch startenden Videos einsetzen

### Phase 7: Performance

- Bilder mit `loading="lazy"` laden
- Bilddimensionen setzen, wenn moeglich
- Layout Shift vermeiden
- API-Antworten schlank halten
- Nur benoetigte GraphQL-Felder abfragen
- Optional Session Storage Cache fuer API-Daten nutzen
- Grosse lokale GIFs/MP4s pruefen und reduzieren

### Phase 8: Accessibility

- Karten als echte Links oder Buttons sauber unterscheiden
- Jede Karte muss einen sinnvollen Linktext haben
- Filter muessen per Tastatur nutzbar sein
- Aktive Filter visuell und semantisch kennzeichnen
- Loading-State per `aria-live` melden
- Fehlerzustand verstaendlich ausgeben
- Trailer-Iframes mit aussagekraeftigem `title` versehen

### Phase 9: SEO und Inhalte

- Watchlist-Seite mit Meta-Description ausstatten
- OpenGraph-Daten ergaenzen
- Canonical-URL ergaenzen
- Statische Fallback-Inhalte behalten, damit die Seite ohne JavaScript nicht leer ist
- Quellenhinweis sichtbar machen:
  - Anime-Daten via AniList
  - Airing-Daten optional via AnimeSchedule

### Phase 10: Testing

- Desktop pruefen
- Tablet pruefen
- Mobile bis 320 px pruefen
- API-Ausfall simulieren
- Langsame Verbindung simulieren
- Tastaturbedienung testen
- Screenreader-Grundstruktur pruefen
- Lighthouse Performance pruefen
- Lighthouse Accessibility pruefen

## 7. GraphQL-Abfragen, die vorbereitet werden sollten

### Aktuell laufende Anime

Ziel:

- Status `RELEASING`
- aktuelle Season/Jahr
- sortiert nach Trending oder Popularity

### Kommende Anime

Ziel:

- Status `NOT_YET_RELEASED`
- kommende Season oder aktuelles Jahr
- sortiert nach Popularity oder Startdatum

### Trending Anime

Ziel:

- sortiert nach `TRENDING_DESC`
- Limit z. B. 10 oder 12
- nur notwendige Felder laden

## 8. UX-Regeln fuer die neue Watchlist

- Die Seite darf nicht wie eine reine Datenbank wirken.
- Die wichtigsten Infos muessen auf einen Blick sichtbar sein.
- Jede Karte braucht klare Hierarchie:
  - Bild
  - Titel
  - Status/Season
  - Bewertung/Popularitaet
  - Kurzbeschreibung
  - Link zur Detailquelle
- Mobile Karten duerfen nicht zu lang werden.
- Filter muessen einfach bleiben.
- Keine ueberladene Tabelle als Hauptansicht.
- Trailer sind Zusatzinhalt, nicht der Kern der Seite.

## 9. Risiken

1. API-Verfuegbarkeit
   - Wenn AniList nicht erreichbar ist, darf die Seite nicht kaputt aussehen.
   - Fallback-Daten sind Pflicht.

2. Rate Limits
   - Nicht bei jedem kleinen UI-Klick neue API-Requests senden.
   - Daten einmal laden und lokal filtern.

3. Rechtliche Inhalte
   - Keine fremden News-Artikel kopieren.
   - Beschreibungen aus APIs nur im erlaubten Rahmen nutzen.
   - Quellen verlinken.

4. SEO bei clientseitigen Daten
   - Wenn alle Inhalte erst per JavaScript kommen, ist SEO schwaecher.
   - Deshalb Fallback-Inhalte oder spaeter Build-Schritt einplanen.

5. Design-Bruch
   - Die Watchlist muss zum bestehenden Anime-Pulse-Stil passen.
   - Keine generische Dashboard-Optik.

## 10. Empfohlene Reihenfolge

1. Datenmodell definieren.
2. AniList-Service planen.
3. Watchlist-HTML auf dynamische Container vorbereiten.
4. Fallback-Daten erstellen.
5. Aktuell laufende Anime laden und rendern.
6. Upcoming- und Trending-Bereiche ergaenzen.
7. Filter und Sortierung einbauen.
8. Trailer optional einbinden.
9. Performance und Accessibility verbessern.
10. SEO und Quellenhinweise ergaenzen.
11. Mobile und Desktop per Screenshot pruefen.
12. Spaeter entscheiden, ob ein Build-Schritt statt Client-Fetching genutzt wird.

## 11. Definition of Done

Die Watchlist gilt erst als fertig, wenn:

- aktuelle Anime-Daten automatisch geladen werden
- API-Ausfall sauber abgefangen wird
- Fallback-Inhalte sichtbar bleiben
- alle Karten klickbar und verstaendlich sind
- Filter mobil und per Tastatur funktionieren
- keine horizontale Scrollbar entsteht
- keine globalen Overflow-Hacks genutzt werden
- Bilder performant geladen werden
- Quellen sichtbar sind
- SEO-Basis vorhanden ist
- Lighthouse Accessibility keine kritischen Fehler meldet
- `pnpm run build:css` sauber laeuft

## 12. Realistische Zeiteinschaetzung

Die folgenden Zeiten sind bewusst realistisch angesetzt. Sie gehen von einer Person aus, die sauber arbeitet, zwischendurch testet, kleinere Fehler behebt und nicht nur schnell Code heruntertippt. Je nach Erfahrung, API-Problemen und Design-Anspruch koennen die Zeiten nach oben oder unten abweichen.

### Gesamtaufwand

Fuer einen soliden Umbau der Watchlist mit AniList-Anbindung, Fallbacks, responsivem UI, Filtern, Performance-Optimierung und Grundtests sollte man realistisch mit etwa **4 bis 7 Arbeitstagen** rechnen.

Wenn alles sehr sauber inklusive Accessibility, SEO, Testing und Feinschliff umgesetzt wird, sind **6 bis 9 Arbeitstage** realistischer.

### Schaetzung nach Aufgabenblock

| Aufgabe | Realistische Zeit |
| --- | ---: |
| Bestehende Watchlist analysieren | 1 bis 2 Stunden |
| API-Strategie final entscheiden | 1 bis 2 Stunden |
| AniList-Dokumentation lesen und passende Queries planen | 2 bis 4 Stunden |
| Datenmodell fuer Anime-Karten definieren | 1 bis 2 Stunden |
| Fallback-Datenstruktur vorbereiten | 1 bis 2 Stunden |
| `anilist-service.js` planen und Grundstruktur schreiben | 2 bis 3 Stunden |
| GraphQL-Query fuer aktuell laufende Anime bauen | 1 bis 2 Stunden |
| GraphQL-Query fuer kommende Anime bauen | 1 bis 2 Stunden |
| GraphQL-Query fuer Trending Anime bauen | 1 bis 2 Stunden |
| API-Fehlerbehandlung einbauen | 1 bis 2 Stunden |
| Loading-State und Empty-State planen | 1 bis 2 Stunden |
| Watchlist-HTML auf dynamische Container vorbereiten | 2 bis 4 Stunden |
| Rendering-Funktionen fuer Anime-Karten bauen | 3 bis 5 Stunden |
| Hero-Bereich dynamisch befuellen | 2 bis 3 Stunden |
| Bereich "Aktuell laufend" bauen | 2 bis 4 Stunden |
| Bereich "Bald verfuegbar" bauen | 2 bis 4 Stunden |
| Bereich "Top Trends" bauen | 2 bis 4 Stunden |
| Filter nach Genre einbauen | 2 bis 4 Stunden |
| Filter nach Status einbauen | 1 bis 3 Stunden |
| Sortierung nach Trending, Popularity, Score und Startdatum | 2 bis 4 Stunden |
| Trailer-Logik einbauen | 2 bis 4 Stunden |
| Fallback fuer fehlende Trailer bauen | 1 bis 2 Stunden |
| Bilder lazy laden und Layout Shift reduzieren | 2 bis 4 Stunden |
| Optionales Session-Storage-Caching | 2 bis 4 Stunden |
| Mobile Layout bis 320 px pruefen und korrigieren | 3 bis 6 Stunden |
| Tablet/Desktop Layout pruefen und korrigieren | 2 bis 4 Stunden |
| Tastaturbedienung pruefen und verbessern | 2 bis 4 Stunden |
| ARIA-/Accessibility-Feinschliff | 3 bis 6 Stunden |
| SEO-Basis fuer Watchlist ergaenzen | 1 bis 2 Stunden |
| Quellenhinweis sichtbar und sauber einbauen | 30 Minuten bis 1 Stunde |
| API-Ausfall simulieren und Fallback testen | 1 bis 2 Stunden |
| Langsame Verbindung testen | 1 bis 2 Stunden |
| Lighthouse-Check und Korrekturen | 2 bis 4 Stunden |
| Finaler visueller Feinschliff | 3 bis 6 Stunden |
| Abschlusspruefung und kleine Bugfixes | 2 bis 5 Stunden |

### Schaetzung nach Phasen

| Phase | Inhalt | Realistische Zeit |
| --- | --- | ---: |
| Phase 1 | Analyse, Zielbild, Datenmodell | 0,5 bis 1 Tag |
| Phase 2 | AniList-Anbindung und Service-Struktur | 0,5 bis 1 Tag |
| Phase 3 | Dynamisches Rendering der Watchlist | 1 bis 1,5 Tage |
| Phase 4 | Filter, Sortierung und Interaktion | 0,5 bis 1 Tag |
| Phase 5 | Trailer, Fallbacks und Fehlerzustaende | 0,5 bis 1 Tag |
| Phase 6 | Responsive Design und visuelle Korrekturen | 1 bis 1,5 Tage |
| Phase 7 | Accessibility, SEO und Performance | 1 bis 1,5 Tage |
| Phase 8 | Testing, Feinschliff und Bugfixes | 0,5 bis 1 Tag |

### Minimal-Version

Eine kleinere erste Version ist in etwa **1,5 bis 2,5 Tagen** machbar.

Umfang:

- AniList-Daten laden
- drei dynamische Bereiche anzeigen
- einfache Karten rendern
- einfacher Fallback bei Fehler
- grobe mobile Anpassung

Nicht enthalten:

- ausgereifte Filter
- perfekter Accessibility-Feinschliff
- vollstaendige SEO-Aufbereitung
- tiefe Performance-Optimierung
- umfangreiche Tests

### Solide Projekt-Version

Eine gute, praesentierbare Version braucht realistisch **4 bis 7 Tage**.

Umfang:

- saubere Service-Struktur
- aktuelle Anime, kommende Anime und Trends
- Filter und Sortierung
- Fallback-Daten
- responsives Layout
- Trailer optional
- sichtbare Quellen
- grundlegende Accessibility
- Build- und Browser-Test

### Sehr saubere Version

Eine sehr saubere Version braucht realistisch **6 bis 9 Tage**.

Umfang:

- alles aus der soliden Version
- besseres Caching
- optimierte Bilder
- detaillierte Accessibility-Pruefung
- Lighthouse-Korrekturen
- SEO-Metadaten
- robuster API-Ausfallmodus
- sehr genauer Mobile-Feinschliff
- besser strukturierte Komponenten

### Wichtigste Zeitrisiken

- API-Daten sind nicht immer exakt so vorhanden, wie man sie fuer das Design braucht.
- Trailerdaten koennen fehlen oder uneinheitlich sein.
- Mobile Layouts brauchen fast immer mehr Korrekturschleifen als geplant.
- Accessibility bei Carousels, Filtern und dynamischen Karten dauert laenger, wenn es wirklich gut werden soll.
- Wenn spaeter ein Build-Schritt statt clientseitigem Fetching gewuenscht ist, kommt zusaetzlicher Aufwand dazu.

### Empfehlung fuer die Umsetzung

Nicht alles auf einmal bauen. Erst eine robuste Minimal-Version erstellen, dann iterativ erweitern.

Empfohlener Ablauf:

1. Tag 1: Datenmodell, AniList-Service, erste API-Daten sichtbar machen.
2. Tag 2: Watchlist-Karten und drei Hauptbereiche bauen.
3. Tag 3: Responsive Layout und Fallbacks stabilisieren.
4. Tag 4: Filter, Sortierung und Trailer ergaenzen.
5. Tag 5: Accessibility, Performance und SEO-Basis verbessern.
6. Tag 6 bis 7: Feinschliff, Tests und Bugfixes.
