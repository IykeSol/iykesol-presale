// js/pages/buy.js – How to Buy Guide
const BuyPage = {
  render() {
    document.getElementById("buy").innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>How to Buy <span class="gradient" style="background:linear-gradient(90deg,var(--primary),#5eead4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">$IYKESOL</span></h2>
          <p>Follow these simple steps to join the future of Ethereum DeFi on the Ethereum Sepolia.</p>
        </div>

        <div class="buy-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2rem; margin-top:3rem;">
          <div class="feature-card">
            <div class="feature-icon" style="background:rgba(13,242,242,.1); color:var(--primary); width:3rem; height:3rem; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem;">
              <span class="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <h3 style="margin-bottom:1rem; font-size:1.2rem;">1. Connect Wallet</h3>
            <p style="color:var(--muted); font-size:.9rem; line-height:1.6;">Click the <strong>'Connect Wallet'</strong> button in the top right corner. Ensure your wallet (Metamask, Phantom, etc.) is set to the <strong>Ethereum Sepolia</strong>.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background:rgba(13,242,242,.1); color:var(--primary); width:3rem; height:3rem; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem;">
              <span class="material-symbols-outlined">faucet</span>
            </div>
            <h3 style="margin-bottom:1rem; font-size:1.2rem;">2. Get Testnet Tokens</h3>
            <p style="color:var(--muted); font-size:.9rem; line-height:1.6;">You need testnet ETH to participate. Use a public faucet like <a href="https://sepoliafaucet.com/" target="_blank" style="color:var(--primary);">Sepolia Faucet</a> to get free Sepolia ETH.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background:rgba(13,242,242,.1); color:var(--primary); width:3rem; height:3rem; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem;">
              <span class="material-symbols-outlined">shopping_cart</span>
            </div>
            <h3 style="margin-bottom:1rem; font-size:1.2rem;">3. Enter Amount</h3>
            <p style="color:var(--muted); font-size:.9rem; line-height:1.6;">On the <strong>Home Page</strong>, enter the amount of tokens you want to spend. The widget will automatically calculate the amount of <strong>$IYKESOL</strong> you will receive.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background:rgba(13,242,242,.1); color:var(--primary); width:3rem; height:3rem; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem;">
              <span class="material-symbols-outlined">verified_user</span>
            </div>
            <h3 style="margin-bottom:1rem; font-size:1.2rem;">4. Confirm & Done</h3>
            <p style="color:var(--muted); font-size:.9rem; line-height:1.6;">Click <strong>'Buy Now'</strong> and confirm the transaction in your wallet. Once confirmed, your <strong>$IYKESOL</strong> tokens will be sent to your wallet immediately!</p>
          </div>
        </div>

        <div style="margin-top:4rem; text-align:center; padding:2rem; border-radius:1rem; background:rgba(13,242,242,0.05); border:1px dashed var(--border);">
          <h3 style="margin-bottom:1rem;">Ready to start?</h3>
          <button class="btn-primary" data-page="home">Go to Presale</button>
        </div>
      </div>
    `;
  },
};

window.BuyPage = BuyPage;
