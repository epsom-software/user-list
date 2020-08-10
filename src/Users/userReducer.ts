import { UserState, UserAction, User } from "./userTypes";
import * as actions from "./actions";

export const userReducer = (
  state: UserState = {
    isSubmitting: false,
  },
  action: UserAction
): UserState => {
  switch (action.type) {
    case actions.EDIT_USER:
      return {
        ...state,
        user: undefined,
        isSubmitting: false,
      };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.data as User[],
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.data as User,
      };
    case actions.UPDATE_USER:
      return {
        ...state,
        isSubmitting: true,
      };
    case actions.UPDATE_USER_FAIL:
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
