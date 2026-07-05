const watchForm = document.querySelector("#watchForm");
const watchSuggestions = [];
const watchFormTranslations = {
  de: {
    invalidForm: "Bitte prüfe die markierten Felder.",
    success: "Danke! Deine Empfehlung wurde vorgemerkt.",
    titleMin: "Bitte gib mindestens zwei Zeichen ein.",
    reasonMin: "Bitte schreibe mindestens zehn Zeichen.",
  },
  en: {
    invalidForm: "Please check the highlighted fields.",
    success: "Thanks! Your recommendation has been saved.",
    titleMin: "Please enter at least two characters.",
    reasonMin: "Please write at least ten characters.",
  },
};

if (watchForm) {
  initWatchForm();
}

// Bereitet das Watchlist-Formular und seine EventListener vor.
function initWatchForm() {
  const fields = getWatchFormFields();
  const formContext = {
    fields: fields,
    formFields: Object.values(fields),
    statusMessage: watchForm.querySelector(".watch-form__status"),
    suggestionList: document.querySelector("#watchSuggestionList"),
  };

  formContext.formFields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
      clearWatchFormStatus(formContext.statusMessage);
    });
  });

  watchForm.addEventListener("submit", (event) => {
    submitWatchSuggestion(event, formContext);
  });
}

// Sammelt die Eingabefelder des Watchlist-Formulars.
function getWatchFormFields() {
  return {
    title: watchForm.querySelector("#anime-title"),
    reason: watchForm.querySelector("#anime-reason"),
  };
}

// Sendet die Empfehlung nicht ab, sondern speichert sie in der Seitenliste.
function submitWatchSuggestion(event, formContext) {
  event.preventDefault();
  const { fields, formFields, statusMessage, suggestionList } = formContext;

  clearWatchFormStatus(statusMessage);

  if (!validateWatchForm(fields, formFields)) {
    statusMessage.textContent = getWatchFormText("invalidForm");
    statusMessage.classList.add("is-error");
    return;
  }

  watchSuggestions.push(getWatchSuggestion(fields));
  renderWatchSuggestions(suggestionList);
  watchForm.reset();
  statusMessage.textContent = getWatchFormText("success");
}

// Prüft alle Formularfelder und gibt true oder false zurück.
function validateWatchForm(fields, formFields) {
  formFields.forEach(clearFieldError);

  const invalidRules = getWatchValidationRules(fields).filter((rule) => {
    return rule.isInvalid;
  });

  invalidRules.forEach((rule) => {
    showFieldError(rule.field, rule.message);
  });

  return invalidRules.length === 0;
}

// Erstellt die Validierungsregeln für das Watchlist-Formular.
function getWatchValidationRules(fields) {
  return [
    {
      field: fields.title,
      isInvalid: fields.title.value.trim().length < 2,
      message: getWatchFormText("titleMin"),
    },
    {
      field: fields.reason,
      isInvalid: fields.reason.value.trim().length < 10,
      message: getWatchFormText("reasonMin"),
    },
  ];
}

// Erstellt aus den Formularwerten ein Empfehlungs-Objekt.
function getWatchSuggestion(fields) {
  return {
    title: fields.title.value.trim(),
    reason: fields.reason.value.trim(),
  };
}

// Rendert alle Empfehlungen aus dem Array in die HTML-Liste.
function renderWatchSuggestions(suggestionList) {
  suggestionList.innerHTML = "";

  watchSuggestions.forEach((suggestion) => {
    suggestionList.innerHTML += getWatchSuggestionTemplate(suggestion);
  });
}

// Gibt das HTML für eine einzelne Empfehlung zurück.
function getWatchSuggestionTemplate(suggestion) {
  return `
    <li class="watch-form__suggestion">
      <strong>${escapeHtml(suggestion.title)}</strong>
      <span>${escapeHtml(suggestion.reason)}</span>
    </li>
  `;
}

// Schützt die HTML-Ausgabe vor ungeprüften Sonderzeichen.
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Zeigt eine Fehlermeldung am passenden Feld an.
function showFieldError(field, message) {
  const fieldWrapper = field.closest(".watch-form__field");
  const errorMessage = fieldWrapper.querySelector(".watch-form__error");

  fieldWrapper.classList.add("is-invalid");
  field.setAttribute("aria-invalid", "true");
  errorMessage.textContent = message;
}

// Entfernt die Fehlermeldung von einem Formularfeld.
function clearFieldError(field) {
  const fieldWrapper = field.closest(".watch-form__field");
  const errorMessage = fieldWrapper.querySelector(".watch-form__error");

  fieldWrapper.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
  errorMessage.textContent = "";
}

// Entfernt die aktuelle Formularmeldung.
function clearWatchFormStatus(statusMessage) {
  statusMessage.textContent = "";
  statusMessage.classList.remove("is-error");
}

function getWatchFormText(key) {
  const locale = document.documentElement.lang === "en" ? "en" : "de";

  return watchFormTranslations[locale][key] || watchFormTranslations.de[key] || key;
}
