const Router = {
  currentPage: "home",

  init() {
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

    document.querySelectorAll(".page").forEach((el) => {
      el.classList.toggle("active", el.id === page);
    });

    document.querySelectorAll("[data-page]").forEach((el) => {
      el.classList.toggle("active", el.dataset.page === page);
    });
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) mobileNav.style.display = "none";

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

window.Router = Router;
