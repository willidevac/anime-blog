<div align="center">

# Anime Pulse

</div>

<div align="center">

![Learning project](https://img.shields.io/badge/Learning_Project-Frontend-00939b?style=for-the-badge)
![Project status](https://img.shields.io/badge/Status-in_progress-7d3cff?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge)

</div>

<div align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="HTML5 logo" />
<img width="12" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="CSS3 logo" />
<img width="12" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="JavaScript logo" />
<img width="12" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="Tailwind CSS logo" />

</div>

<div align="center">

Anime Pulse ist ein responsiver Anime-Blog mit Startseite, Trend-Bereich, Artikelseiten, Watchlist und Kontaktformular.
Das Projekt dient als Lernprojekt für saubere HTML-Struktur, modularen CSS-Aufbau, Tailwind CSS per npm/pnpm und verständliches JavaScript.

</div>

## Table Of Contents

- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Preview](#preview)
- [Quickstart](#quickstart)
- [Warum node_modules nicht gepusht wird](#warum-node_modules-nicht-gepusht-wird)
- [Development](#development)
- [Project Structure](#project-structure)
- [Features](#features)
- [Learning Goals](#learning-goals)

## Requirements

Für dieses Projekt wird Node.js benötigt, weil Tailwind CSS lokal über npm/pnpm eingebunden ist.
Die installierten Pakete werden nicht direkt ins Repository gepusht, sondern über `package.json` und `pnpm-lock.yaml` beschrieben.

Empfohlen:

```text
Node.js
pnpm
VS Code mit Live Server
```

## Tech Stack

| Technology      | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| HTML5           | Seitenstruktur und semantische Inhalte                |
| CSS3            | Eigene Komponenten, Layouts und responsive Anpassung  |
| Tailwind CSS v4 | Utility-Klassen und lokaler CSS-Build                 |
| JavaScript ES6+ | Navigation, FAQ-Akkordeon, Formularlogik, Validierung |
| EmailJS         | Vorbereitung für das Kontaktformular                  |

## Preview

![Anime Pulse preview](./assets/screenshots/anime-pulse-preview.gif)

## Quickstart

1. Repository klonen:

```bash
git clone https://github.com/willidevac/anime-blog.git
```

2. Projektordner öffnen:

```bash
cd anime-blog
```

3. Abhängigkeiten installieren:

```bash
pnpm install
```

4. Tailwind CSS bauen:

```bash
pnpm run build:css
```

5. Projekt im Browser öffnen:

```text
Zum Beispiel mit Live Server in VS Code.
```

## Warum node_modules nicht gepusht wird

Der Ordner `node_modules` enthält alle installierten Pakete, die für die lokale Entwicklung benötigt werden.
Dieser Ordner kann sehr groß werden und wird deshalb nicht in Git gespeichert.

Stattdessen werden diese Dateien gepusht:

```text
package.json
pnpm-lock.yaml
```

`package.json` beschreibt, welche Pakete das Projekt braucht.
`pnpm-lock.yaml` hält die genauen Paketversionen fest, damit andere Entwickler dieselben Abhängigkeiten installieren können.

Wenn jemand das Projekt neu klont, reicht dieser Befehl:

```bash
pnpm install
```

Danach wird `node_modules` automatisch lokal neu erstellt.
Deshalb steht in der `.gitignore`:

```gitignore
node_modules/
```

Kurz gesagt:

| Datei oder Ordner | Wird gepusht? | Warum?                                      |
| ----------------- | ------------- | ------------------------------------------- |
| `package.json`    | Ja            | Enthält die Projektabhängigkeiten           |
| `pnpm-lock.yaml`  | Ja            | Speichert die exakten Paketversionen        |
| `node_modules/`   | Nein          | Wird lokal durch `pnpm install` neu erzeugt |

## Development

Während der Entwicklung kann Tailwind im Watch-Modus laufen.
Dann wird die fertige CSS-Datei bei Änderungen automatisch neu gebaut.

```bash
pnpm run watch:css
```

Für einen einmaligen Build:

```bash
pnpm run build:css
```

Die HTML-Dateien laden anschließend die generierte Datei:

```html
<link rel="stylesheet" href="css/tailwind.css" />
```

## Project Structure

```text
.
|-- .gitignore
|-- README.md
|-- index.html
|-- trends.html
|-- artikel.html
|-- artikel-frieren.html
|-- artikel-one-punch-man.html
|-- artikel-witch-hat.html
|-- watchlist.html
|-- impressum.html
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- assets/
|   |-- icons/
|   `-- images/
|-- components/
|   `-- header.html
|-- css/
|   |-- tailwind-input.css
|   |-- tailwind.css
|   |-- base.css
|   |-- molecules/
|   `-- pages/
`-- js/
    `-- molecules/
        |-- contact-form.js
        `-- site-nav.js
```

## Features

| Feature                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| Responsive Blog-Layout  | Seiten passen sich an Desktop, Tablet und Mobile an        |
| Modulare CSS-Struktur   | CSS ist in Basis-, Molekül- und Seiten-Dateien aufgeteilt  |
| Tailwind Build          | Tailwind wird lokal gebaut und nicht per CDN geladen       |
| Mobile Navigation       | Navigation wird per JavaScript geöffnet und geschlossen    |
| FAQ-Akkordeon           | FAQ-Bereiche können einzeln geöffnet und geschlossen werden |
| Formularvalidierung     | Kontaktformular prüft Eingaben vor dem Absenden            |
| Accessibility-Attribute | ARIA-Attribute verbessern Bedienbarkeit und Rückmeldung    |

## Learning Goals

Dieses Projekt wird Schritt für Schritt als Lernprojekt verbessert.
Wichtige Übungsbereiche sind:

- Tailwind CSS über npm/pnpm einbinden
- `node_modules` bewusst aus Git ausschließen
- saubere Projektstruktur verstehen
- verständliche Funktionskommentare schreiben
- `const` und `let` passend einsetzen
- Arrays mit Methoden wie `filter`, `forEach` und `Object.values` nutzen
- `async` und `await` in Formularlogik anwenden
- HTML, CSS und JavaScript getrennt und lesbar halten
- Barrierefreiheit mit ARIA-Attributen verbessern
