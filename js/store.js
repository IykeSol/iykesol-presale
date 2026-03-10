const TOKEN_ADDRESS = "0x26Ad674da0Be6e1481ed260F7ad1706aF29475B8";
const TOKEN_SYMBOL  = "$IYKESOL";
const PRESALE_RATE  = 10_000; 
const CHAIN_ID_HEX  = "0xaa36a7"; 

const SEPOLIA_RPCS = [
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://1rpc.io/sepolia",
  "https://rpc.ankr.com/eth_sepolia",
  "https://sepolia.gateway.tenderly.co",
];

const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function totalBurned() view returns (uint256)",
  "function circulatingSupply() view returns (uint256)",
  "function burnPercentage() view returns (uint256)",
  "function paused() view returns (bool)",
  "function owner() view returns (address)",
  "function balanceOf(address account) view returns (uint256)",
];

function loadEthersIfNeeded() {
  return new Promise((resolve, reject) => {
    if (typeof ethers !== 'undefined') return resolve();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function fmtToken(bn) {
  const n = parseFloat(ethers.utils.formatEther(bn));
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function errMsg(err) {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  return err.reason || err.data?.message || err.message || JSON.stringify(err);
}

async function buildReadProvider() {
  if (window.ethereum) {
    try {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      await p.getBlockNumber();
      return p;
    } catch (_) { /* fallthrough */ }
  }
  for (const rpc of SEPOLIA_RPCS) {
    try {
      const p = new ethers.providers.JsonRpcProvider(rpc);
      await p.getBlockNumber();
      return p;
    } catch (_) { /* next */ }
  }
  throw new Error("No working Sepolia RPC found");
}

const Store = {
  account:        null,
  ethBalance:     "0",
  iykeBalance:    "0",
  contractOwner:  null,
  isPaused:       false,

  async loadContractData() {
    try {
      await loadEthersIfNeeded();
      const provider = await buildReadProvider();
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

      const [supply, burned, circ, burnPct, paused, owner] = await Promise.all([
        contract.totalSupply(),
        contract.totalBurned(),
        contract.circulatingSupply(),
        contract.burnPercentage(),
        contract.paused(),
        contract.owner(),
      ]);

      Store.isPaused      = paused;
      Store.contractOwner = owner;

      document.querySelectorAll(".stat-total-supply").forEach(el => el.textContent = fmtToken(supply));
      document.querySelectorAll(".stat-total-burned").forEach(el => el.textContent = fmtToken(burned));
      document.querySelectorAll(".stat-circulating").forEach(el  => el.textContent = fmtToken(circ));
      document.querySelectorAll(".stat-burn-pct").forEach(el     => el.textContent = burnPct.toString() + "%");

      if (supply.gt(0)) {
        const pct = circ.mul(10000).div(supply).toNumber() / 100;
        document.querySelectorAll(".progress-bar-fill").forEach(
          el => (el.style.width = Math.min(pct, 100) + "%")
        );
      }

      if (paused) {
        document.querySelectorAll(".buy-btn").forEach(btn => {
          btn.disabled = true;
          btn.innerHTML = `<span class="material-symbols-outlined">pause_circle</span> Contract Paused`;
        });
      }

      console.log("✅ Contract data loaded:", {
        supply: fmtToken(supply),
        burned: fmtToken(burned),
        circ:   fmtToken(circ),
        burnPct: burnPct.toString(),
        paused, owner,
      });
    } catch (err) {
      console.error("❌ Contract read failed:", errMsg(err));
      document.querySelectorAll(
        ".stat-total-supply, .stat-total-burned, .stat-circulating, .stat-burn-pct"
      ).forEach(el => (el.textContent = "–"));
    }
  },

  isConnecting: false,

  // ── Connect Wallet ────────────────────────────────────────────
  async connectWallet() {
    if (this.isConnecting) return;
    if (typeof ethers === 'undefined') {
      Layout.notify("Library Loading", "Connecting library is still loading... Please wait 2 seconds.", "info");
      return;
    }
    this.isConnecting = true;

    try {
      if (!window.ethereum) {
        throw new Error("PROVIDER_NOT_FOUND");
      }

      // 1. Request accounts
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        .catch(err => {
          if (err.code === -32002) {
            throw new Error("PENDING_REQUEST");
          }
          throw err;
        });

      if (!accounts || !accounts.length) {
        throw new Error("NO_ACCOUNTS");
      }
      Store.account = accounts[0];

      // 2. Ensure on Sepolia
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== CHAIN_ID_HEX) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CHAIN_ID_HEX }],
          });
        } catch (switchErr) {
          if (switchErr.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: CHAIN_ID_HEX,
                chainName: "Sepolia Testnet",
                nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
                rpcUrls: SEPOLIA_RPCS,
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              }],
            });
          } else {
            throw switchErr;
          }
        }
      }

      // 3. Request Signature (to verify ownership)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer   = provider.getSigner();
      const message  = `Sign to verify your wallet for iykesol.\n\nThis is a one-time verification signature.\n\nWallet: ${Store.account}`;
      
      await signer.signMessage(message).catch(err => {
        if (err.code === 4001) throw new Error("USER_REJECTED_SIGNATURE");
        throw err;
      });

      await Store.refreshBalances();
      await Store.loadContractData();
      Store._onConnected();
    } catch (err) {
      if (err.code === 4001 || err.message === "USER_REJECTED_SIGNATURE") {
        console.log("User rejected connection or signature.");
      } else if (err.message === "PROVIDER_NOT_FOUND") {
        Layout.notify("Wallet Not Found", "📱 Mobile: Open this page INSIDE MetaMask/Trust Wallet app.\n\n💻 Desktop: Install MetaMask extension.", "error", 8000);
      } else if (err.message === "PENDING_REQUEST") {
        Layout.notify("Pending Request", "A connection request is already pending in your wallet.", "info");
      } else {
        console.error("Connection Error:", err);
        Layout.notify("Connection Error", errMsg(err), "error");
      }
    } finally {
      this.isConnecting = false;
    }
  },

  // ── Refresh Balances ─────────────────────────────────────────
  async refreshBalances() {
    if (!Store.account || !window.ethereum) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer   = provider.getSigner();

      // ETH balance
      const ethBal = await provider.getBalance(Store.account);
      Store.ethBalance = parseFloat(ethers.utils.formatEther(ethBal)).toFixed(4);

      // $IYKESOL balance
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const [iykeBal, decimals] = await Promise.all([
        contract.balanceOf(Store.account),
        contract.decimals(),
      ]);
      Store.iykeBalance = parseFloat(
        ethers.utils.formatUnits(iykeBal, decimals)
      ).toLocaleString(undefined, { maximumFractionDigits: 2 });

      document.querySelectorAll(".eth-balance-display").forEach(el  => (el.textContent = Store.ethBalance));
      document.querySelectorAll(".iyke-balance-display").forEach(el => (el.textContent = Store.iykeBalance));
    } catch (err) {
      console.warn("Balance refresh error:", errMsg(err));
    }
  },

  _onConnected() {
    const short = Store.account.slice(0, 6) + "…" + Store.account.slice(-4);
    document.querySelectorAll(".connect-btn").forEach(btn => {
      btn.textContent = short;
      btn.style.borderColor = "rgba(13,242,242,.6)";
      btn.style.color = "var(--primary)";
    });
    document.querySelectorAll(".tw-hint").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".buy-btn:not([disabled])").forEach(el => el.classList.remove("hidden"));
  },

  // ── Buy Tokens ────────────────────────────────────────────────
  async buyTokens(ethAmount) {
    if (!Store.account) {
      Layout.notify("Not Connected", "Please connect your wallet first!", "info");
      return;
    }
    const amount = parseFloat(ethAmount);
    if (!amount || amount < 0.001) {
      Layout.notify("Invalid Amount", "Minimum contribution is 0.001 ETH.", "warning");
      return;
    }
    if (Store.isPaused) {
      Layout.notify("Paused", "The contract is currently paused. Please try again later.", "warning");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer   = provider.getSigner();

      // Fetch owner if not cached
      if (!Store.contractOwner) {
        const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
        Store.contractOwner = await contract.owner();
      }

      const tx = await signer.sendTransaction({
        to:    Store.contractOwner,
        value: ethers.utils.parseEther(amount.toString()),
      });

      const iykeAmt = (amount * PRESALE_RATE).toLocaleString();
      Layout.notify(
        "Transaction Sent!",
        `Sent: ${amount} ETH\nYou receive: ${iykeAmt} ${TOKEN_SYMBOL}\nHash: ${tx.hash.slice(0,10)}...`,
        "success",
        10000
      );

      await tx.wait();
      Layout.notify("Confirmed!", "Your purchase is complete and balances updated.", "success");
      await Store.refreshBalances();
    } catch (err) {
      if (err && err.code === 4001) {
        console.log("User rejected transaction.");
        return;
      }
      console.error("Buy error:", err);
      Layout.notify("Transaction Failed", errMsg(err), "error");
    }
  },

  calcReceive(ethAmount) {
    const n = parseFloat(ethAmount);
    if (!n || n <= 0) return `0 ${TOKEN_SYMBOL}`;
    return (n * PRESALE_RATE).toLocaleString() + ` ${TOKEN_SYMBOL}`;
  },
};

// ─── Wallet event listeners ───────────────────────────────────────
if (window.ethereum) {
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts && accounts.length) {
      Store.account = accounts[0];
      await Store.refreshBalances();
      Store._onConnected();
    } else {
      Store.account = null;
      ["eth-balance-display", "iyke-balance-display"].forEach(cls => {
        document.querySelectorAll("." + cls).forEach(el => (el.textContent = "0"));
      });
      document.querySelectorAll(".tw-hint").forEach(el => el.classList.remove("hidden"));
      document.querySelectorAll(".buy-btn").forEach(el => el.classList.add("hidden"));
      document.querySelectorAll(".connect-btn").forEach(btn => {
        btn.textContent = "Connect Wallet";
        btn.removeAttribute("style");
      });
    }
  });

  window.ethereum.on("chainChanged", () => window.location.reload());
}
