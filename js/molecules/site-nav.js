const menuButton = document.querySelector(".page-header__menu");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
  initSiteNav();
}

// Bereitet die mobile Navigation und ihre EventListener vor.
function initSiteNav() {
  const navLinks = siteNav.querySelectorAll("a");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    setSiteNavState(!isOpen);
  });

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      setSiteNavState(false);
    });
  });
}

// Setzt den offenen oder geschlossenen Zustand der mobilen Navigation.
function setSiteNavState(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  siteNav.classList.toggle("is-open", isOpen);
}
