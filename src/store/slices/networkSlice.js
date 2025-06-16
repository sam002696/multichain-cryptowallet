import { createSlice } from "@reduxjs/toolkit";
import { WalletKey } from "../../helpers/WalletKey";
import getSymbolFromTicker from "../../utils/getSymbolFromTicker";

const LOCAL_KEY = "networkEnabled";
const SELECTED_KEY = "selectedNetwork";
const SHOW_KEY = "showTestnets";

// function loadShowTestnets() {
//   try {
//     const raw = localStorage.getItem(SHOW_KEY);
//     return raw !== null ? JSON.parse(raw) : false;
//   } catch {
//     return false;
//   }
// }

export function buildSelected(n, balance = 0) {
  return {
    name: n.name,
    hex: "0x" + Number(n.chainId).toString(16),
    rpcUrl: Array.isArray(n.rpc) ? n.rpc[0] : n.rpc,
    account: WalletKey.getEthereumPublicAddress(),
    balance: Number(balance ?? 0),
    ticker: getSymbolFromTicker(n?.nativeCurrency?.symbol),
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
    selectedNetworkInfo: JSON.parse(localStorage.getItem(SELECTED_KEY)) || null,
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

    fetchMainnetsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMainnetsSuccess(state, { payload }) {
      state.loading = false;
      const prefs = {};
      state.mainnets = payload.map((n) => {
        prefs[n.id] = { ...n };
        return { ...n, enabled: true };
      });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs));
    },
    fetchMainnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

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
    },
    fetchTestnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

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

    selectNetwork(state, { payload }) {
      state.selectedNetworkInfo = payload;
      localStorage.setItem(SELECTED_KEY, JSON.stringify(payload));
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
