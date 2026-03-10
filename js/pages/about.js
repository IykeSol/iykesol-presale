const AboutPage = {
  render() {
    document.getElementById("about").innerHTML = `
      <div class="container">
        <div class="about-header section-header">
          <h2>About <span class="gradient" style="background:linear-gradient(90deg,var(--primary),#5eead4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">iykesol</span></h2>
          <p>Revolutionizing decentralized finance on Ethereum with unmatched speed, zero fees, and robust security.</p>
        </div>

        <div class="about-grid">
          <!-- Utility -->
          <div>
            <div class="section-title">
              <span class="material-symbols-outlined">bolt</span> Project Utility
            </div>
            <div class="utility-list">
              <div class="utility-card">
                <div class="utility-icon"><span class="material-symbols-outlined">payments</span></div>
                <div>
                  <h3>Zero-Fee Trading</h3>
                  <p>Hold $IYKESOL to access our feeless DEX aggregator. The more you hold, the lower your slippage and execution costs.</p>
                </div>
              </div>
              <div class="utility-card">
                <div class="utility-icon"><span class="material-symbols-outlined">query_stats</span></div>
                <div>
                  <h3>Advanced Analytics</h3>
                  <p>Unlock premium on-chain data, wallet tracking, and predictive market signals powered by AI.</p>
                </div>
              </div>
              <div class="utility-card">
                <div class="utility-icon"><span class="material-symbols-outlined">how_to_vote</span></div>
                <div>
                  <h3>Governance Rights</h3>
                  <p>Propose and vote on protocol upgrades, fee structures, and future ecosystem integrations.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tokenomics -->
          <div>
            <div class="tokenomics-panel">
              <h2><span class="material-symbols-outlined">pie_chart</span> Tokenomics</h2>

              <div class="donut-wrap">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#1e293b" stroke-width="16"/>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#0df2f2" stroke-width="16" stroke-dasharray="95.5 143.3"/>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" stroke-width="16" stroke-dasharray="71.6 167.2" stroke-dashoffset="-95.5"/>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" stroke-width="16" stroke-dasharray="47.8 191" stroke-dashoffset="-167.1"/>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#475569" stroke-width="16" stroke-dasharray="23.9 214.9" stroke-dashoffset="-214.9"/>
                </svg>
                <div class="donut-center">
                  <span class="ticker">Ticker</span>
                  <span class="symbol">$IYKESOL</span>
                </div>
              </div>

              <div class="token-dist">
                <div class="token-dist-item"><div class="left"><div class="color-dot" style="background:#0df2f2"></div><span class="name">Presale</span></div><span class="pct">40%</span></div>
                <div class="token-dist-item"><div class="left"><div class="color-dot" style="background:#3b82f6"></div><span class="name">Liquidity &amp; Exchanges</span></div><span class="pct">30%</span></div>
                <div class="token-dist-item"><div class="left"><div class="color-dot" style="background:#a855f7"></div><span class="name">Marketing &amp; Dev</span></div><span class="pct">20%</span></div>
                <div class="token-dist-item"><div class="left"><div class="color-dot" style="background:#475569"></div><span class="name">Team (Locked)</span></div><span class="pct">10%</span></div>
              </div>

              <div class="token-stats">
                <div class="stat-card"><div class="label">Total Supply</div><div class="value stat-total-supply">Loading…</div></div>
                <div class="stat-card"><div class="label">Total Burned</div><div class="value stat-total-burned">–</div></div>
                <div class="stat-card"><div class="label">Circulating</div><div class="value stat-circulating">–</div></div>
                <div class="stat-card"><div class="label">Burn Rate</div><div class="value stat-burn-pct">–</div></div>
              </div>
              <p style="margin-top:1rem;text-align:center;font-size:.72rem;color:var(--muted);">
                Contract: <a href="https://sepolia.etherscan.io/address/0x26Ad674da0Be6e1481ed260F7ad1706aF29475B8" target="_blank" style="color:var(--primary);">0x26Ad…75B8 ↗</a>
              </p>

            </div>
          </div>
        </div>
      </div>
    `;
  },
};

window.AboutPage = AboutPage;
