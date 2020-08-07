import { User, Response, Action } from "./userTypes";

import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";

import axios from "axios";

export const API_ENDPOINT_USERS = "https://reqres.in/api/users/";

export function* userList() {
  try {
    const response: Response<User[]> = yield call(
      axios.get,
      API_ENDPOINT_USERS
    );
    const users: User[] = response.data.data;
    yield put({ type: "USERS/GET_USERS_SUCCESS", data: users });
  } catch (error) {
    yield put({
      type: "USERS/GET_USERS_FAIL",
      error,
    });
  }
}

export function* editUser(action: Action<number>) {
  try {
    const response: Response<User> = yield call(
      axios.get,
      API_ENDPOINT_USERS + action.data
    );
    const user: User = response.data.data;
    yield put({ type: "USERS/GET_USER_SUCCESS", data: user });
    yield takeEvery("USERS/UPDATE_USER", updateUser);
  } catch (error) {
    yield put({
      type: "USERS/GET_USER_FAIL",
      error,
    });
  }
}

export function* updateUser(action: Action<User>) {
  try {
    const user: User = action.data;
    yield call(axios.put, API_ENDPOINT_USERS + user.id, user);
    yield put({ type: "USERS/UPDATE_USER_SUCCESS" });
  } catch (error) {
    yield put({
      type: "USERS/UPDATE_USER_FAIL",
      error,
    });
  }
}

export function* userSagas() {
  yield all([
    takeLatest("USERS/USER_LIST", userList),
    takeLatest("USERS/EDIT_USER", editUser),
  ]);
}
