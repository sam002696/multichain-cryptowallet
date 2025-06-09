import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "networks",
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

    fetchMainnetsStart: (state) => {
      state.loading = true;
    },
    fetchMainnetsSuccess: (state, { payload }) => {
      state.mainnets = payload;
      state.loading = false;
    },
    fetchMainnetsFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    fetchTestnetsStart: (state) => {
      state.loading = true;
    },
    fetchTestnetsSuccess: (state, { payload }) => {
      state.testnets = payload;
      state.loading = false;
    },
    fetchTestnetsFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    fetchNetworkByIdStart: (state) => {
      state.loading = true;
    },
    fetchNetworkByIdSuccess: (state, { payload }) => {
      state.current = payload;
      state.loading = false;
    },
    fetchNetworkByIdFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
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
} = slice.actions;

export default slice.reducer;
