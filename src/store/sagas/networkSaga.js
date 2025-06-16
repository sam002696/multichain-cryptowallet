import { call, put, takeLatest } from "redux-saga/effects";
import fetcher from "../../services/fetcher";
import { getBalanceForNetwork } from "../../utils/getBalanceForNetwork";
import { buildSelected } from "../slices/networkSlice";

import {
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
} from "../slices/networkSlice";

import { NETWORK_API } from "../../utils/Api/api";

/**
 * 1. Fetch all networks
 */
function* fetchNetworksSaga() {
  try {
    yield put(fetchNetworksStart());
    const response = yield call(() => fetcher(NETWORK_API.GET_ALL));
    yield put(fetchNetworksSuccess(response.data));
  } catch (err) {
    yield put(fetchNetworksFailure(err.message || "Failed to load networks."));
  }
}

/**
 * 2. Fetch only mainnets
 */
function* fetchMainnetsSaga() {
  try {
    localStorage.removeItem("networkEnabled");
    yield put(fetchMainnetsStart());
    const response = yield call(() => fetcher(NETWORK_API.GET_MAINNETS));
    yield put(fetchMainnetsSuccess(response.data));

    if (response.data.length > 0) {
      yield put({
        type: "networks/selectNetworkAsync",
        payload: response.data[0],
      });
    }
  } catch (err) {
    yield put(fetchMainnetsFailure(err.message || "Failed to load mainnets."));
  }
}

/**
 * 3. Fetch only testnets
 */
function* fetchTestnetsSaga() {
  try {
    localStorage.removeItem("networkEnabled");
    yield put(fetchTestnetsStart());
    const response = yield call(() => fetcher(NETWORK_API.GET_TESTNETS));
    yield put(fetchTestnetsSuccess(response.data));

    if (response.data.length > 0) {
      yield put({
        type: "networks/selectNetworkAsync",
        payload: response.data[0],
      });
    }
  } catch (err) {
    yield put(fetchTestnetsFailure(err.message || "Failed to load testnets."));
  }
}

/**
 * 4. Fetch a single network by chainId
 */
function* fetchNetworkByIdSaga({ payload }) {
  const { chainId } = payload;
  try {
    yield put(fetchNetworkByIdStart());
    const response = yield call(() =>
      fetcher(NETWORK_API.GET_BY_ID.replace(":chainId", chainId))
    );
    yield put(fetchNetworkByIdSuccess(response.data));
  } catch (err) {
    yield put(
      fetchNetworkByIdFailure(
        err.message || `Failed to load network ${chainId}.`
      )
    );
  }
}

/**
 * 5. Async selection of network with balance resolution
 */
function* selectNetworkSaga({ payload }) {
  try {
    const balance = yield call(getBalanceForNetwork, payload);
    const selected = buildSelected(payload, balance);
    yield put(selectNetwork(selected));
  } catch (err) {
    console.error("Error resolving balance for selected network:", err);
  }
}

/**
 * Root network saga
 */
export default function* networkSaga() {
  yield takeLatest("networks/fetchAll", fetchNetworksSaga);
  yield takeLatest("networks/fetchMainnets", fetchMainnetsSaga);
  yield takeLatest("networks/fetchTestnets", fetchTestnetsSaga);
  yield takeLatest("networks/fetchById", fetchNetworkByIdSaga);
  yield takeLatest("networks/selectNetworkAsync", selectNetworkSaga);
}
