// js/router.js – Client-side page routing

const Router = {
  currentPage: "home",

  init() {
    // Bind all [data-page] anchors (delegated)
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page]");
      if (!link) return;
      e.preventDefault();
      Router.navigate(link.dataset.page);
    });
  },

  navigate(page) {
    if (Router.currentPage === page) return;
    Router.currentPage = page;

    // Show / hide pages
    document.querySelectorAll(".page").forEach((el) => {
      el.classList.toggle("active", el.id === page);
    });

    // Update active state on all nav links
    document.querySelectorAll("[data-page]").forEach((el) => {
      el.classList.toggle("active", el.dataset.page === page);
    });

    // Close mobile nav
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) mobileNav.style.display = "none";

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

window.Router = Router;
