const shareButtons = document.querySelectorAll(".share-button, .btn-share-look");
const defaultShareLabel = "Seite teilen";

if (shareButtons.length > 0) {
  initShareButtons();
}

// Verknüpft alle Share-Buttons mit der Teilen-Funktion.
function initShareButtons() {
  shareButtons.forEach((shareButton) => {
    shareButton.setAttribute("aria-label", defaultShareLabel);
    shareButton.title = defaultShareLabel;

    shareButton.addEventListener("click", () => {
      handleShareButtonClick(shareButton);
    });
  });
}

// Teilt die aktuelle Seite oder kopiert den Link als Fallback.
async function handleShareButtonClick(shareButton) {
  const shareData = getShareData();

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      updateShareButtonLabel(shareButton, "Seite geteilt");
      return;
    }

    await copyShareUrl(shareData.url);
    updateShareButtonLabel(shareButton, "Link kopiert");
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    console.error("Share Fehler:", error.message || error);
    updateShareButtonLabel(shareButton, "Teilen nicht möglich");
  }
}

// Sammelt Titel, Beschreibung und URL der aktuellen Seite.
function getShareData() {
  return {
    title: document.title,
    text: getShareText(),
    url: window.location.href,
  };
}

// Erstellt einen kurzen Beschreibungstext für das Teilen.
function getShareText() {
  const metaDescription = document.querySelector("meta[name='description']");
  const mainHeading = document.querySelector("h1");

  if (metaDescription && metaDescription.content.trim()) {
    return metaDescription.content.trim();
  }

  if (mainHeading) {
    return mainHeading.textContent.trim();
  }

  return "Anime Pulse";
}

// Kopiert die aktuelle Seitenadresse in die Zwischenablage.
async function copyShareUrl(url) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API ist nicht verfügbar.");
  }

  await navigator.clipboard.writeText(url);
}

// Aktualisiert die Button-Beschriftung für assistive Technologien kurzzeitig.
function updateShareButtonLabel(shareButton, label) {
  shareButton.setAttribute("aria-label", label);
  shareButton.title = label;

  window.setTimeout(() => {
    shareButton.setAttribute("aria-label", defaultShareLabel);
    shareButton.title = defaultShareLabel;
  }, 2000);
}
