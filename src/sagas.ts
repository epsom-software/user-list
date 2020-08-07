import { userSagas } from "./Users/userSagas";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([userSagas()]);
}
