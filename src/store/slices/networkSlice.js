import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "networkEnabled";

const slice = createSlice({
  name: "network",
  initialState: {
    all: [],
    mainnets: [],
    testnets: [],
    current: null,
    loading: false,
    error: null,
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

    // ───────────────────────────────────────
    // FETCH MAINNETS
    // ───────────────────────────────────────
    fetchMainnetsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMainnetsSuccess(state, { payload }) {
      state.loading = false;

      // Build pref map and populate Redux list
      const prefs = {};
      state.mainnets = payload.map((n) => {
        prefs[n.id] = { ...n };
        return { ...n, enabled: true };
      });

      // Persist ONLY the mainnet objects
      localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs));
    },
    fetchMainnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    // ───────────────────────────────────────
    // FETCH TESTNETS
    // ───────────────────────────────────────
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

      // Persist ONLY the testnet objects
      localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs));
    },
    fetchTestnetsFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    // ───────────────────────────────────────
    // TOGGLE NETWORK
    // ───────────────────────────────────────

    toggleNetworkEnabled(state, { payload: { network, listType } }) {
      // Flipping in the correct list only
      state[listType] = state[listType].map((n) =>
        n.id === network.id ? { ...n, enabled: !n.enabled } : n
      );

      // Rebuilding prefs *only* from that list
      const newPrefs = {};
      state[listType]
        .filter((n) => n.enabled)
        .forEach(({ ...rest }) => {
          newPrefs[rest.id] = rest;
        });

      localStorage.setItem(LOCAL_KEY, JSON.stringify(newPrefs));
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

  toggleNetworkEnabled,
} = slice.actions;

export default slice.reducer;
