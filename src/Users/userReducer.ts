import { UserState, UserAction, User } from "./userTypes";

export const userReducer = (
  state: UserState = {
    isSubmitting: false,
  },
  action: UserAction
): UserState => {
  switch (action.type) {
    case "USERS/EDIT_USER":
      return {
        ...state,
        user: undefined,
        isSubmitting: false,
      };
    case "USERS/GET_USERS_SUCCESS":
      return {
        ...state,
        users: action.data as User[],
      };
    case "USERS/GET_USER_SUCCESS":
      return {
        ...state,
        user: action.data as User,
      };
    case "USERS/UPDATE_USER":
      return {
        ...state,
        isSubmitting: true,
      };
    case "USERS/UPDATE_USER_FAIL":
    case "USERS/UPDATE_USER_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
