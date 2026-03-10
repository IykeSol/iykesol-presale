document.addEventListener("DOMContentLoaded", async () => {
  Layout.init();

  HomePage.render();
  AboutPage.render();
  RoadmapPage.render();
  BuyPage.render();

  Router.init();

  if (window.ethereum) {
    try { await Store.loadContractData(); } catch (e) { console.warn("Contract read:", e); }
  } else {
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

window.Layout = Layout;
window.HomePage = HomePage;
window.AboutPage = AboutPage;
window.RoadmapPage = RoadmapPage;
window.BuyPage = BuyPage;
window.Router = Router;
