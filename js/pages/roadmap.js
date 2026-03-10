const faqs = [
  {
    q: "What is iykesol and why Sepolia?",
    a: "iykesol is a next-gen DeFi protocol. We're currently running on Sepolia testnet so that users can participate in the presale safely before mainnet launch.",
  },
  {
    q: "When does the presale end?",
    a: "The presale ends when the hard cap is reached or the countdown hits zero. Tokens will be distributed shortly after.",
  },
  {
    q: "Is the platform security audited?",
    a: "Yes. Our smart contracts are being audited by leading security firms. The full report will be published before mainnet launch.",
  },
  {
    q: "How do I claim my presale tokens?",
    a: "A dedicated claim portal will go live 24 hours after the presale concludes. Connect the same wallet you used to participate.",
  },
];

const RoadmapPage = {
  render() {
    document.getElementById("roadmap").innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Roadmap &amp; <span class="gradient" style="background:linear-gradient(90deg,var(--primary),#5eead4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">FAQ</span></h2>
          <p>Our path to revolutionizing Ethereum DeFi and answers to your most common questions.</p>
        </div>

        <div class="roadmap-grid">
          <!-- Timeline -->
          <div>
            <div class="section-title">
              <span class="material-symbols-outlined">timeline</span> Project Roadmap
            </div>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot done"><span class="material-symbols-outlined" style="font-size:1.1rem">rocket_launch</span></div>
                <div class="timeline-card">
                  <div class="phase-header"><h3>Phase 1: Foundation</h3><span class="phase-badge done">Completed</span></div>
                  <ul>
                    <li><span class="material-symbols-outlined done-icon">check_circle</span>Core smart contract development</li>
                    <li><span class="material-symbols-outlined done-icon">check_circle</span>Brand identity &amp; UI/UX design</li>
                    <li><span class="material-symbols-outlined done-icon">check_circle</span>Community building (Twitter, Discord)</li>
                  </ul>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot active"><span class="material-symbols-outlined" style="font-size:1.1rem">potted_plant</span></div>
                <div class="timeline-card active">
                  <div class="phase-header"><h3>Phase 2: Beta Launch</h3><span class="phase-badge active">In Progress</span></div>
                  <ul>
                    <li><span class="material-symbols-outlined done-icon">radio_button_unchecked</span>$IYKESOL Presale event (Sepolia)</li>
                    <li><span class="material-symbols-outlined done-icon">radio_button_unchecked</span>Smart contract security audits</li>
                    <li><span class="material-symbols-outlined done-icon">radio_button_unchecked</span>DEX aggregator beta release</li>
                  </ul>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot pending"><span class="material-symbols-outlined" style="font-size:1.1rem">language</span></div>
                <div class="timeline-card" style="opacity:.6">
                  <div class="phase-header"><h3>Phase 3: Expansion</h3><span class="phase-badge pending">Upcoming</span></div>
                  <ul>
                    <li><span class="material-symbols-outlined pending-icon">lock</span>Tier 1 CEX listings</li>
                    <li><span class="material-symbols-outlined pending-icon">lock</span>Cross-chain bridge deployment</li>
                    <li><span class="material-symbols-outlined pending-icon">lock</span>Governance DAO launch</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div>
            <div class="section-title">
              <span class="material-symbols-outlined">help_center</span> FAQ
            </div>
            <div class="faq-list" id="faq-list"></div>
            <div class="faq-cta">
              <p>Still have questions?</p>
              <button class="btn-outline"><span class="material-symbols-outlined">forum</span>Join our Discord</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render FAQ items
    const list = document.getElementById("faq-list");
    faqs.forEach((faq, i) => {
      const item = document.createElement("div");
      item.className = "faq-item" + (i === 0 ? " open" : "");
      item.innerHTML = `
        <div class="faq-header">
          <span class="faq-question">${faq.q}</span>
          <span class="material-symbols-outlined faq-icon">expand_more</span>
        </div>
        <div class="faq-answer">${faq.a}</div>
      `;
      item.querySelector(".faq-header").addEventListener("click", () => {
        item.classList.toggle("open");
      });
      list.appendChild(item);
    });
  },
};

window.RoadmapPage = RoadmapPage;
