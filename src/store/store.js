import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import toastAlertReducer from "./slices/errorSlice";
import networkReducer from "./slices/networkSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

// Creating the Redux store
export const store = configureStore({
  reducer: {
    toastAlert: toastAlertReducer,
    network: networkReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
