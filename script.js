const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const yearNodes = document.querySelectorAll("[data-year]");
const revealNodes = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("[data-contact-form]");
const mobileNavQuery = window.matchMedia("(max-width: 980px)");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const setMobileNavigationState = (isOpen) => {
  if (!navToggle || !navPanel) return;

  const shouldConstrain = mobileNavQuery.matches && !isOpen;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navPanel.classList.toggle("is-open", isOpen);
  navPanel.toggleAttribute("inert", shouldConstrain);
  navPanel.setAttribute("aria-hidden", String(shouldConstrain));
  document.body.classList.toggle("nav-open", isOpen);
};

const closeNavigation = () => {
  if (!navToggle || !navPanel) return;
  setMobileNavigationState(false);
  if (mobileNavQuery.matches) {
    navToggle.focus({ preventScroll: true });
  }
};

const openNavigation = () => {
  if (!navToggle || !navPanel) return;
  setMobileNavigationState(true);
  navPanel.querySelector("a")?.focus({ preventScroll: true });
};

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && navPanel) {
  setMobileNavigationState(false);
  mobileNavQuery.addEventListener("change", () => setMobileNavigationState(false));

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });

  navPanel.addEventListener("click", (event) => {
    if (mobileNavQuery.matches && event.target instanceof HTMLAnchorElement) {
      closeNavigation();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const message = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company or website: ${formData.get("company") || "Not provided"}`,
      `Project type: ${formData.get("project")}`,
      `Timeline: ${formData.get("timeline")}`,
      "",
      "Project details:",
      `${formData.get("message")}`
    ].join("\n");

    const email = "ahirhiten789@gmail.com";
    const subject = encodeURIComponent(formData.get("subject") || "New website project inquiry");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}
