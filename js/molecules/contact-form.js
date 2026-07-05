const accordions = document.querySelectorAll(".accordion");
const contactForm = document.querySelector("#contactForm");

let emailJsConfig;
let fields;
let formFields;
let statusMessage;
let submitButton;

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    toggleAccordion(accordion);
  });
});

if (contactForm) {
  emailJsConfig = {
    publicKey: "y-Itndfvvj0xlf6go",
    serviceId: "service_y2k99hc",
    templateId: "template_g0e3ide",
  };

  fields = {
    name: contactForm.querySelector("#name"),
    email: contactForm.querySelector("#email"),
    message: contactForm.querySelector("#message"),
  };

  formFields = Object.values(fields);
  statusMessage = contactForm.querySelector(".contact-form__status");
  submitButton = contactForm.querySelector("button[type='submit']");

  formFields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
      clearStatusMessage();
    });
  });

  contactForm.addEventListener("submit", submitContactForm);
}

// Öffnet oder schließt einen FAQ-Accordion-Bereich.
function toggleAccordion(accordion) {
  const panel = accordion.nextElementSibling;

  accordion.classList.toggle("active");

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    return;
  }

  panel.style.maxHeight = `${panel.scrollHeight}px`;
}

// Zeigt eine Fehlermeldung am passenden Formularfeld an.
function showFieldError(field, message) {
  const fieldWrapper = field.closest(".contact-form__field");
  const errorMessage = fieldWrapper.querySelector(".contact-form__error");

  fieldWrapper.classList.add("is-invalid");
  field.setAttribute("aria-invalid", "true");
  errorMessage.textContent = message;
}

// Entfernt eine Fehlermeldung von einem Formularfeld.
function clearFieldError(field) {
  const fieldWrapper = field.closest(".contact-form__field");
  const errorMessage = fieldWrapper.querySelector(".contact-form__error");

  fieldWrapper.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
  errorMessage.textContent = "";
}

// Entfernt den aktuellen Formularstatus.
function clearStatusMessage() {
  statusMessage.textContent = "";
  statusMessage.classList.remove("is-error");
}

// Prüft, ob eine E-Mail-Adresse grundsätzlich gültig aufgebaut ist.
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Prüft alle Formularfelder und gibt true oder false zurück.
function validateContactForm() {
  formFields.forEach(clearFieldError);

  const invalidRules = getValidationRules().filter((rule) => {
    return rule.isInvalid;
  });

  invalidRules.forEach((rule) => {
    showFieldError(rule.field, rule.message);
  });

  return invalidRules.length === 0;
}

// Erstellt die Validierungsregeln für das Kontaktformular.
function getValidationRules() {
  return [
    {
      field: fields.name,
      isInvalid: fields.name.value.trim().length < 2,
      message: "Bitte gib mindestens zwei Zeichen ein.",
    },
    {
      field: fields.email,
      isInvalid: !isValidEmail(fields.email.value.trim()),
      message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    },
    {
      field: fields.message,
      isInvalid: fields.message.value.trim().length < 10,
      message: "Bitte schreibe eine Nachricht mit mindestens zehn Zeichen.",
    },
  ];
}

// Prüft, ob EmailJS mit echten Konfigurationswerten nutzbar ist.
function hasValidEmailJsConfig() {
  const configValues = Object.values(emailJsConfig);

  return configValues.every((value) => {
    return value && !value.startsWith("DEIN") && !value.startsWith("DEINE");
  });
}

// Sperrt oder entsperrt den Senden-Button während des Sendens.
function setSubmitState(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting
    ? "Wird gesendet..."
    : "Nachricht senden";
}

// Sendet das Kontaktformular mit EmailJS.
async function submitContactForm(event) {
  event.preventDefault();
  clearStatusMessage();

  if (!validateContactForm()) {
    statusMessage.textContent = "Bitte prüfe die markierten Felder.";
    statusMessage.classList.add("is-error");
    return;
  }

  if (!hasValidEmailJsConfig() || !window.emailjs) {
    statusMessage.textContent =
      "Bitte trage zuerst deine EmailJS-Daten im JavaScript ein.";
    statusMessage.classList.add("is-error");
    return;
  }

  setSubmitState(true);

  try {
    await window.emailjs.sendForm(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      contactForm,
      {
        publicKey: emailJsConfig.publicKey,
      },
    );

    statusMessage.textContent = "Danke! Deine Nachricht wurde erfolgreich gesendet.";
    contactForm.reset();
  } catch (error) {
    console.error("EmailJS Fehler:", error.status, error.text || error.message || error);
    statusMessage.textContent =
      "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.";
    statusMessage.classList.add("is-error");
  } finally {
    setSubmitState(false);
  }
}
