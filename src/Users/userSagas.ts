import { User, Response, Action } from "./userTypes";
import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";

export const API_ENDPOINT_USERS = "https://reqres.in/api/users/";

export function* userList() {
  try {
    const response: Response<User[]> = yield call(
      axios.get,
      API_ENDPOINT_USERS
    );
    const users: User[] = response.data.data;
    yield put({ type: actions.GET_USERS_SUCCESS, data: users });
  } catch (error) {
    yield put({
      type: actions.GET_USERS_FAIL,
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
    yield put({ type: actions.GET_USER_SUCCESS, data: user });
    yield takeEvery(actions.UPDATE_USER, updateUser);
  } catch (error) {
    yield put({
      type: actions.GET_USER_FAIL,
      error,
    });
  }
}

export function* updateUser(action: Action<User>) {
  try {
    const user: User = action.data;
    yield call(axios.put, API_ENDPOINT_USERS + user.id, user);
    yield put({ type: actions.UPDATE_USER_SUCCESS });
  } catch (error) {
    yield put({
      type: actions.UPDATE_USER_FAIL,
      error,
    });
  }
}

export function* userSagas() {
  yield all([
    takeLatest(actions.USER_LIST, userList),
    takeLatest(actions.EDIT_USER, editUser),
  ]);
}
