const HomePage = {
  render() {
    document.getElementById("home").innerHTML = `
      <div class="container">
        <!-- Hero Section -->
        <div class="hero-grid">
          <!-- Left: Text Content -->
          <div class="hero-content">
            <div class="badge"><div class="dot"></div>Presale is Live – Sepolia</div>
            <h1 class="hero-title">The Future of<br><span class="gradient">Ethereum DeFi</span></h1>
            <p class="hero-desc">Join the iykesol presale and be part of the next generation of high-speed, low-cost crypto innovation. Experience unparalleled liquidity and lightning-fast execution.</p>

            <div class="hero-ctas">
              <button class="btn-primary" onclick="document.getElementById('widget-anchor').scrollIntoView({behavior:'smooth'})">
                <span class="material-symbols-outlined">rocket_launch</span>
                Buy $IYKESOL Now
              </button>
              <button class="btn-outline" onclick="Router.navigate('roadmap')">
                 View Roadmap
                <span class="material-symbols-outlined">trending_flat</span>
              </button>
            </div>

            <div class="powered-by">
              <p>POWERED BY</p>
              <div class="items">
                <div class="item">
                  <span class="material-symbols-outlined">bolt</span>
                  Ethereum
                </div>
                <div class="item">
                  <span class="material-symbols-outlined">shield</span>
                  Sepolia Testnet
                </div>
                <div class="item">
                  <span class="material-symbols-outlined">hub</span>
                  Thirdweb
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right: Presale Widget -->
          <div class="hero-visual-column">
            <div id="widget-anchor"></div>
            <div class="presale-widget">
              <div class="widget-header">
                <div>
                  <h2>Join Presale</h2>
                  <div class="widget-price">1 ETH = 10,000 $IYKESOL &nbsp;·&nbsp; Sepolia</div>
                </div>
                <div class="timer-box">
                  <div class="timer-label">Ends In</div>
                  <div class="timer-digits" id="timer">--:--:--</div>
                </div>
              </div>

              <div class="progress-section">
                <div class="progress-row">
                  <div>
                    <div class="label">Circulating Supply</div>
                    <div class="amount stat-circulating">Loading…</div>
                  </div>
                  <div style="text-align:right">
                    <div class="label">Total Burned</div>
                    <div class="target stat-total-burned">–</div>
                  </div>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width:0%"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:.35rem;font-size:.7rem;color:var(--muted);font-weight:700;">
                  <span>Burn Rate: <span class="stat-burn-pct">–</span></span>
                  <span>Total: <span class="stat-total-supply">–</span></span>
                </div>
              </div>

              <div class="input-group">
                <div class="input-top">
                  <span>Pay (ETH)</span>
                  <span>ETH Balance: <span class="eth-balance-display">0</span></span>
                </div>
                <div class="input-row">
                  <div class="token-icon">E</div>
                  <input type="number" id="eth-amount" placeholder="0.0" min="0.001" step="0.001" oninput="HomePage.updateReceive()" />
                  <button class="max-btn" onclick="HomePage.setMax()">MAX</button>
                </div>
              </div>
              <div class="input-group">
                <div class="input-top">
                  <span>Receive ($IYKESOL)</span>
                  <span>$IYKESOL Balance: <span class="iyke-balance-display">0</span></span>
                </div>
                <div class="input-row">
                  <div class="token-icon" style="background:rgba(13,242,242,.2);color:var(--primary);">IY</div>
                  <span id="receive-amount" style="flex:1;font-size:1.4rem;font-weight:800;color:var(--primary);">0 $IYKESOL</span>
                </div>
              </div>

              <div class="tw-hint hint-box">
                Connect your wallet in the top bar to buy $IYKESOL
              </div>

              <button class="btn-primary buy-btn hidden" style="width:100%;justify-content:center;" onclick="HomePage.buy()">
                <span class="material-symbols-outlined">account_balance_wallet</span>
                Buy Now
              </button>

              <p class="widget-note">Rate: 1 ETH = 10,000 $IYKESOL &nbsp;·&nbsp; Min: 0.001 ETH &nbsp;·&nbsp; Contract: <a href="https://sepolia.etherscan.io/address/0x26Ad674da0Be6e1481ed260F7ad1706aF29475B8" target="_blank" style="color:var(--primary);">View on Etherscan ↗</a></p>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="features-section">
          <div class="section-header">
            <h2>Why Choose iykesol?</h2>
            <p>Built from the ground up to solve the most pressing challenges in decentralized finance.</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon"><span class="material-symbols-outlined">bolt</span></div>
              <h3>Lightning Fast</h3>
              <p>Leveraging Ethereum's architecture for sub-second finality and near-instant transaction processing.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><span class="material-symbols-outlined">payments</span></div>
              <h3>Zero Gas Fees</h3>
              <p>Our meta-transaction relayer network abstracts away gas fees, making trading completely frictionless.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><span class="material-symbols-outlined">security</span></div>
              <h3>Audited Security</h3>
              <p>Smart contracts rigorously audited by top-tier security firms to ensure maximum safety for your assets.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  updateReceive() {
    const amount = parseFloat(document.getElementById("eth-amount").value) || 0;
    document.getElementById("receive-amount").textContent = Store.calcReceive(amount);
  },

  async setMax() {
    if (!Store.account) { alert("Connect your wallet first!"); return; }
    await Store.refreshBalance();
    const max = Math.max(0, Store.balance - 0.001).toFixed(4);
    document.getElementById("eth-amount").value = max;
    this.updateReceive();
  },

  buy() {
    const amount = parseFloat(document.getElementById("eth-amount").value);
    Store.buyTokens(amount);
  },
};

window.HomePage = HomePage;
