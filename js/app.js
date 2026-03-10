// js/app.js – Application entry point

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Render layout (header, footer, bottom nav, timer)
  Layout.init();

  // 2. Render all pages
  HomePage.render();
  AboutPage.render();
  RoadmapPage.render();
  BuyPage.render();

  // 3. Start router (bind all [data-page] links)
  Router.init();

  // 4. Load public contract data (works without wallet connection)
  //    Uses a public Sepolia RPC endpoint for read-only calls
  if (window.ethereum) {
    try { await Store.loadContractData(); } catch (e) { console.warn("Contract read:", e); }
  } else {
    // No wallet – fetch via public RPC
    const RPC = "https://rpc.ankr.com/eth_sepolia";
    const callViaRpc = async (fnSig, selector) => {
      const res = await fetch(RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call",
          params: [{ to: "0x26Ad674da0Be6e1481ed260F7ad1706aF29475B8", data: selector }, "latest"] })
      });
      const { result } = await res.json();
      return result;
    };
    try {
      const [supply, burned, circ, bp] = await Promise.all([
        callViaRpc("totalSupply()",       "0x18160ddd"),
        callViaRpc("totalBurned()",       "0xd89135cd"),
        callViaRpc("circulatingSupply()", "0x9358928b"),
        callViaRpc("burnPercentage()",    "0x7f685e15"),
      ]);
      Store.totalSupply       = BigInt(supply  || "0x0");
      Store.totalBurned       = BigInt(burned  || "0x0");
      Store.circulatingSupply = BigInt(circ    || "0x0");
      Store.burnPercentage    = BigInt(bp      || "0x0");
      Store._updateContractUI();
    } catch (e) { console.warn("RPC read error:", e); }
  }
});

// Attach global objects to window as requested
window.Layout = Layout;
window.HomePage = HomePage;
window.AboutPage = AboutPage;
window.RoadmapPage = RoadmapPage;
window.BuyPage = BuyPage;
window.Router = Router;
