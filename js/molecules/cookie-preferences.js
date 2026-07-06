const cookiePreferencesButton = document.querySelector(
  ".cookie-preferences-button",
);
const cookiePreferencesKey = "animePulseCookiePreferences";

if (cookiePreferencesButton) {
  initCookiePreferences();
}

// Bereitet den Cookie-Dialog und seine EventListener vor.
function initCookiePreferences() {
  const dialog = createCookiePreferencesDialog();
  const buttons = getCookieDialogButtons(dialog);

  document.body.append(dialog);
  updateCookiePreferenceStatus(dialog);

  cookiePreferencesButton.addEventListener("click", () => {
    openCookiePreferencesDialog(dialog);
  });

  buttons.closeButton.addEventListener("click", () => {
    dialog.close();
  });

  buttons.essentialButton.addEventListener("click", () => {
    saveCookiePreference("essential", dialog);
    dialog.close();
  });

  buttons.acceptButton.addEventListener("click", () => {
    saveCookiePreference("all", dialog);
    dialog.close();
  });
}

// Erstellt den semantischen Cookie-Dialog für die aktuelle Seite.
function createCookiePreferencesDialog() {
  const dialog = document.createElement("dialog");

  dialog.classList.add("cookie-dialog");
  dialog.id = "cookiePreferencesDialog";
  dialog.setAttribute("aria-labelledby", "cookie-dialog-title");
  dialog.setAttribute("aria-describedby", "cookie-dialog-description");
  dialog.innerHTML = `
    <div class="cookie-dialog__content">
      <p class="cookie-dialog__kicker">Privatsphäre</p>
      <h2 id="cookie-dialog-title">Cookie Preferences</h2>
      <p id="cookie-dialog-description">
        Anime Pulse nutzt aktuell nur notwendige Einstellungen. Hier kannst du
        deine Auswahl vormerken, falls später optionale Cookies ergänzt werden.
      </p>
      <p class="cookie-dialog__status" data-cookie-status aria-live="polite"></p>
      <div class="cookie-dialog__actions">
        <button class="cookie-dialog__button cookie-dialog__button--ghost" type="button" data-cookie-choice="essential">
          Nur notwendige
        </button>
        <button class="cookie-dialog__button" type="button" data-cookie-choice="all">
          Alle akzeptieren
        </button>
      </div>
      <button class="cookie-dialog__close" type="button" aria-label="Cookie-Dialog schließen">
        Schließen
      </button>
    </div>
  `;

  return dialog;
}

// Sammelt die Buttons aus dem Cookie-Dialog in einem Objekt.
function getCookieDialogButtons(dialog) {
  return {
    closeButton: dialog.querySelector(".cookie-dialog__close"),
    essentialButton: dialog.querySelector("[data-cookie-choice='essential']"),
    acceptButton: dialog.querySelector("[data-cookie-choice='all']"),
  };
}

// Liest die gespeicherte Cookie-Einstellung aus dem Browser.
function getCookiePreference() {
  return localStorage.getItem(cookiePreferencesKey);
}

// Gibt einen verständlichen Text für die aktuelle Cookie-Auswahl zurück.
function getCookiePreferenceLabel(preference) {
  const preferenceLabels = {
    all: "Alle Cookies akzeptiert.",
    essential: "Nur notwendige Cookies gespeichert.",
  };

  return preferenceLabels[preference] || "Noch keine Auswahl gespeichert.";
}

// Aktualisiert den sichtbaren Status im Cookie-Dialog.
function updateCookiePreferenceStatus(dialog) {
  const statusMessage = dialog.querySelector("[data-cookie-status]");

  if (statusMessage) {
    statusMessage.textContent = `Aktuelle Auswahl: ${getCookiePreferenceLabel(
      getCookiePreference(),
    )}`;
  }
}

// Öffnet den Cookie-Dialog, wenn er noch nicht geöffnet ist.
function openCookiePreferencesDialog(dialog) {
  if (dialog.open) {
    return;
  }

  updateCookiePreferenceStatus(dialog);
  dialog.showModal();
}

// Speichert die ausgewählte Cookie-Einstellung lokal im Browser.
function saveCookiePreference(preference, dialog) {
  localStorage.setItem(cookiePreferencesKey, preference);
  updateCookiePreferenceStatus(dialog);
}
