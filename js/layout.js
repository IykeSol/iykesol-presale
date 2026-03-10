const Layout = {
  init() {
    this.renderHeader();
    this.renderFooter();
    this.renderBottomNav();
    this.renderToastContainer();
    this.bindHamburger();
    this.startTimer();
  },

  renderToastContainer() {
    if (document.getElementById("toast-container")) return;
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  },

  notify(title, msg, type = "info", dur = 5000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.style.setProperty("--dur", `${dur}ms`);

    const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
    
    toast.innerHTML = `
      <span class="material-symbols-outlined toast-icon">${icon}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastOut .4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      setTimeout(() => toast.remove(), 400);
    }, dur);
  },

  renderHeader() {
    document.getElementById("app-header").innerHTML = `
      <div class="container header-inner">
        <a class="logo" href="#" data-page="home">
          <div class="logo-mark">
            <span>IYKE</span>
            <span>SOL</span>
          </div>
          <span class="logo-text">iykesol</span>
        </a>

        <nav class="desktop-nav">
          <a href="#" data-page="home" class="active">Home</a>
          <a href="#" data-page="buy">How to Buy</a>
          <a href="#" data-page="about">About</a>
          <a href="#" data-page="roadmap">Roadmap</a>
        </nav>

        <div class="header-actions">
          <button class="btn-outline connect-btn" id="header-connect-btn">
            <span class="material-symbols-outlined">account_balance_wallet</span>
            <span class="btn-text">Connect Wallet</span>
          </button>
          <button id="ham-btn" aria-label="Menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      <nav id="mobile-nav">
        <a href="#" data-page="home" class="active">
          <span class="material-symbols-outlined">home</span> Home
        </a>
        <a href="#" data-page="buy">
          <span class="material-symbols-outlined">help_outline</span> How to Buy
        </a>
        <a href="#" data-page="about">
          <span class="material-symbols-outlined">info</span> About
        </a>
        <a href="#" data-page="roadmap">
          <span class="material-symbols-outlined">timeline</span> Roadmap
        </a>
        <button class="btn-outline connect-btn" style="margin-top:.5rem;width:100%;justify-content:center;">
          <span class="material-symbols-outlined">account_balance_wallet</span>
          Connect Wallet
        </button>
      </nav>
    `;

    // Bind all connect buttons
    document.querySelectorAll(".connect-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        Store.connectWallet();
      });
    });
  },

  renderFooter() {
    document.getElementById("app-footer").innerHTML = `
      <div class="container footer-inner">
        <div class="logo">
          <div class="logo-mark" style="width:2rem;height:2rem;border-radius:.45rem;background:rgba(13,242,242,.15);">
            <span style="color:var(--primary);font-size:.5rem;font-weight:900;">IYKE</span>
            <span style="color:var(--primary);font-size:.5rem;font-weight:900;">SOL</span>
          </div>
          <span class="logo-text" style="font-size:1rem;">iykesol</span>
        </div>
        <div class="footer-links">
          <a href="https://x.com/agbaghasol" target="_blank">Twitter</a>
          <a href="https://t.me/IykeeeSol" target="_blank">Telegram</a>
          <a href="https://discord.com/users/899976958136451092" target="_blank">Discord</a>
          <a href="whitepaper.html" target="_blank">Whitepaper</a>
        </div>
        <span class="footer-copy">© 2026 iykesol. All rights reserved.</span>
      </div>
    `;
  },

  renderBottomNav() {
    document.getElementById("bottom-nav").innerHTML = `
      <a class="active" data-page="home" href="#">
        <span class="material-symbols-outlined">home</span>
        <span class="nav-label">Home</span>
      </a>
      <a data-page="buy" href="#">
        <span class="material-symbols-outlined">help_outline</span>
        <span class="nav-label">How to Buy</span>
      </a>
      <a data-page="about" href="#">
        <span class="material-symbols-outlined">info</span>
        <span class="nav-label">About</span>
      </a>
      <a data-page="roadmap" href="#">
        <span class="material-symbols-outlined">timeline</span>
        <span class="nav-label">Roadmap</span>
      </a>
    `;
  },

  bindHamburger() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#ham-btn");
      if (btn) {
        const nav = document.getElementById("mobile-nav");
        nav.style.display = nav.style.display === "flex" ? "none" : "flex";
      }
    });
  },

  startTimer() {
    const end = new Date("2026-03-13T00:00:00Z").getTime();
    const update = () => {
      const el = document.getElementById("timer");
      if (!el) return;
      const diff = end - Date.now();
      if (diff <= 0) { el.textContent = "ENDED"; return; }
      const d = Math.floor(diff / 864e5);
      const h = Math.floor(diff / 36e5) % 24;
      const m = Math.floor(diff / 6e4) % 60;
      const s = Math.floor(diff / 1e3) % 60;
      el.textContent = `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };
    update();
    setInterval(update, 1000);
  },
};

window.Layout = Layout;
