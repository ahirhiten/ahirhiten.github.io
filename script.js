const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const yearNodes = document.querySelectorAll("[data-year]");
const revealNodes = document.querySelectorAll(".reveal");
const sentinel = document.querySelector("#scroll-sentinel");
const mobileNavQuery = window.matchMedia("(max-width: 980px)");

const headerObserver = new IntersectionObserver(
  ([entry]) => {
    if (header) {
      header.classList.toggle("is-scrolled", !entry.isIntersecting);
    }
  },
  { threshold: [0] }
);

if (sentinel) {
  headerObserver.observe(sentinel);
}

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

if (navToggle && navPanel) {
  // Initialize mobile navigation state
  setMobileNavigationState(false);
  
  // Reset navigation when viewport changes
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

// Smooth scroll for anchor links
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  
  const targetId = link.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);
  
  if (target) {
    event.preventDefault();
    const topOffset = 110;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - topOffset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
});

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
