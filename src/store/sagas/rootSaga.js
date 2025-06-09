import { all } from "redux-saga/effects";

import networkSaga from "./networkSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([networkSaga()]);
}
