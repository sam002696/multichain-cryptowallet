import { createSlice } from "@reduxjs/toolkit";
import { WalletKey } from "../../helpers/WalletKey";

const LOCAL_KEY = "networkEnabled";
const SELECTED_KEY = "selectedNetwork";
const SHOW_KEY = "showTestnets";

function loadShowTestnets() {
  try {
    const raw = localStorage.getItem(SHOW_KEY);
    return raw !== null ? JSON.parse(raw) : false;
  } catch {
    return false;
  }
}

function buildSelected(n) {
  // Helper to build the trimmed-down object
  return {
    name: n.name,
    hex: "0x" + Number(n.chainId).toString(16),
    rpcUrl: Array.isArray(n.rpc) ? n.rpc[0] : n.rpc,
    account: WalletKey.getEthereumPublicAddress(),
    balance: 0,
    networkId: n.networkId,
    chainId: n.chainId,
    token: [],
    isSelected: true,
  };
}

const slice = createSlice({
  name: "network",
  initialState: {
    mainnets: [],
    testnets: [],
    loading: false,
    error: null,
    enabledNetworks: JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}"),
    selectedNetworkInfo: JSON.parse(
      localStorage.getItem(SELECTED_KEY) ||
        JSON.stringify(
          buildSelected(
            // initial fallback:
            loadShowTestnets()
              ? {
                  name: "Sepolia Testnet",
                  chainId: 11155111,
                  networkId: 11155111,
                  rpc: ["https://sepolia.infura.io/v3/YOUR_KEY"],
                }
              : {
                  name: "Ethereum Mainnet",
                  chainId: 1,
                  networkId: 1,
                  rpc: ["https://mainnet.infura.io/v3/YOUR_KEY"],
                }
          )
        )
    ),
  },
  reducers: {
    fetchNetworksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNetworksSuccess: (state, { payload }) => {
      state.all = payload;
      state.loading = false;
    },
    fetchNetworksFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // ─── FETCH MAINNETS ─────────────────────────
    fetchMainnetsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMainnetsSuccess(state, { payload }) {
      state.loading = false;
      // build enabled map
      const prefs = {};
      state.mainnets = payload.map((n) => {
        prefs[n.id] = { ...n };
        return { ...n, enabled: true };
      });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs));

      // auto-select first mainnet
      if (payload.length) {
        const sel = buildSelected(payload[0]);
        state.selectedNetworkInfo = sel;
        localStorage.setItem(SELECTED_KEY, JSON.stringify(sel));
      }
    },
    fetchMainnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    // ─── FETCH TESTNETS ─────────────────────────
    fetchTestnetsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTestnetsSuccess(state, { payload }) {
      state.loading = false;
      const prefs = {};
      state.testnets = payload.map((n) => {
        prefs[n.id] = { ...n };
        return { ...n, enabled: true };
      });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs));

      // auto-select first testnet
      if (payload.length) {
        const sel = buildSelected(payload[0]);
        state.selectedNetworkInfo = sel;
        localStorage.setItem(SELECTED_KEY, JSON.stringify(sel));
      }
    },
    fetchTestnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    // ─── TOGGLE NETWORK ─────────────────────────
    toggleNetworkEnabled(state, { payload: { network, listType } }) {
      state[listType] = state[listType].map((n) =>
        n.id === network.id ? { ...n, enabled: !n.enabled } : n
      );
      const newPrefs = {};
      state[listType]
        .filter((n) => n.enabled)
        .forEach(({ ...rest }) => {
          newPrefs[rest.id] = rest;
        });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newPrefs));
    },

    // ─── MANUAL SELECT (if needed elsewhere) ────
    selectNetwork(state, { payload: n }) {
      const sel = buildSelected(n);
      state.selectedNetworkInfo = sel;
      localStorage.setItem(SELECTED_KEY, JSON.stringify(sel));
    },
  },
});

export const {
  fetchNetworksStart,
  fetchNetworksSuccess,
  fetchNetworksFailure,
  fetchMainnetsStart,
  fetchMainnetsSuccess,
  fetchMainnetsFailure,
  fetchTestnetsStart,
  fetchTestnetsSuccess,
  fetchTestnetsFailure,
  fetchNetworkByIdStart,
  fetchNetworkByIdSuccess,
  fetchNetworkByIdFailure,
  selectNetwork,

  toggleNetworkEnabled,
} = slice.actions;

export default slice.reducer;
