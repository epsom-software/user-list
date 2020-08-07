import { Response, User } from "./userTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  API_ENDPOINT_USERS,
  userList,
  editUser,
  updateUser,
} from "./userSagas";

const getMockUser = (): User => ({
  id: 5,
  avatar: "avatar",
  first_name: "first_name",
  last_name: "last_name",
  email: "email",
});

describe("userList", () => {
  it("gets the users", () => {
    const iterator = userList();

    expect(iterator.next().value).toEqual(call(axios.get, API_ENDPOINT_USERS));

    const mockUsers = [getMockUser()];
    const response: Response<User[]> = { data: { data: mockUsers } };

    expect(iterator.next(response).value).toEqual(
      put({ type: "USERS/GET_USERS_SUCCESS", data: mockUsers })
    );
  });

  it("handles errors", () => {
    const iterator = userList();
    iterator.next();
    expect(iterator.throw("error").value).toEqual(
      put({ type: "USERS/GET_USERS_FAIL", error: "error" })
    );
  });
});

describe("editUser", () => {
  it("gets the user then updates the user", () => {
    const iterator = editUser({ data: 5, type: "editUser" });

    expect(iterator.next().value).toEqual(
      call(axios.get, API_ENDPOINT_USERS + 5)
    );

    const mockUser = getMockUser();
    const response: Response<User> = { data: { data: mockUser } };

    expect(iterator.next(response).value).toEqual(
      put({ type: "USERS/GET_USER_SUCCESS", data: mockUser })
    );
    expect(iterator.next().value).toEqual(
      takeEvery("USERS/UPDATE_USER", updateUser)
    );
  });
});

describe("updateUser", () => {
  it("gets the user then updates the user", () => {
    const mockUser = getMockUser();
    const iterator = updateUser({ data: mockUser, type: "" });

    expect(iterator.next().value).toEqual(
      call(axios.put, API_ENDPOINT_USERS + 5, mockUser)
    );

    expect(iterator.next().value).toEqual(
      put({ type: "USERS/UPDATE_USER_SUCCESS" })
    );
  });
});
