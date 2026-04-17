const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const yearNodes = document.querySelectorAll("[data-year]");
const revealNodes = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const mobileNavQuery = window.matchMedia("(max-width: 980px)");
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonLabel = submitButton?.textContent || "Send Project Details";
  const defaultFormNote = formNote?.textContent || "";

  const setFormState = (message, isError = false) => {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.style.color = isError ? "#8b2e2e" : "";
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const accessKey = String(formData.get("access_key") || "").trim();

    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setFormState("Add your Web3Forms access key in contact.html before using this form.", true);
      return;
    }

    submitButton?.setAttribute("disabled", "disabled");
    if (submitButton) {
      submitButton.textContent = "Sending...";
    }
    setFormState("Sending your project details...");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      contactForm.reset();
      setFormState("Thanks. Your project details were sent successfully.");
    } catch (error) {
      setFormState("The form could not be sent right now. Please try again or email me directly at ahirhiten789@gmail.com.", true);
      console.error(error);
    } finally {
      submitButton?.removeAttribute("disabled");
      if (submitButton) {
        submitButton.textContent = defaultButtonLabel;
      }

      if (!formNote?.textContent) {
        setFormState(defaultFormNote);
      }
    }
  });
}
