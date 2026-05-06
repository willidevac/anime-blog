const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");

    const panel = accordion.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const emailJsConfig = {
    publicKey: "y-Itndfvvj0xlf6go",
    serviceId: "service_y2k99hc",
    templateId: "template_g0e3ide",
  };

  const fields = {
    name: contactForm.querySelector("#name"),
    email: contactForm.querySelector("#email"),
    message: contactForm.querySelector("#message"),
  };

  const statusMessage = contactForm.querySelector(".contact-form__status");

  const showError = (field, message) => {
    const fieldWrapper = field.closest(".contact-form__field");
    const errorMessage = fieldWrapper.querySelector(".contact-form__error");

    fieldWrapper.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    errorMessage.textContent = message;
  };

  const clearError = (field) => {
    const fieldWrapper = field.closest(".contact-form__field");
    const errorMessage = fieldWrapper.querySelector(".contact-form__error");

    fieldWrapper.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    Object.values(fields).forEach(clearError);

    if (fields.name.value.trim().length < 2) {
      showError(fields.name, "Bitte gib mindestens zwei Zeichen ein.");
      isValid = false;
    }

    if (!isValidEmail(fields.email.value.trim())) {
      showError(fields.email, "Bitte gib eine gültige E-Mail-Adresse ein.");
      isValid = false;
    }

    if (fields.message.value.trim().length < 10) {
      showError(fields.message, "Bitte schreibe eine Nachricht mit mindestens zehn Zeichen.");
      isValid = false;
    }

    return isValid;
  };

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      clearError(field);
      statusMessage.textContent = "";
      statusMessage.classList.remove("is-error");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error");

    if (!validateForm()) {
      statusMessage.textContent = "Bitte prüfe die markierten Felder.";
      statusMessage.classList.add("is-error");
      return;
    }

    const hasEmailJsConfig = Object.values(emailJsConfig).every((value) => {
      return value && !value.startsWith("DEIN") && !value.startsWith("DEINE");
    });

    if (!hasEmailJsConfig || !window.emailjs) {
      statusMessage.textContent = "Bitte trage zuerst deine EmailJS-Daten im JavaScript ein.";
      statusMessage.classList.add("is-error");
      return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Wird gesendet...";

    window.emailjs
      .sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, contactForm, {
        publicKey: emailJsConfig.publicKey,
      })
      .then(() => {
        statusMessage.textContent = "Danke! Deine Nachricht wurde erfolgreich gesendet.";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Fehler:", error.status, error.text || error.message || error);
        statusMessage.textContent = "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.";
        statusMessage.classList.add("is-error");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Nachricht senden";
      });
  });
}
