import { combineReducers } from "redux";
import { userReducer } from "./Users/userReducer";

export const rootReducer = combineReducers({
  userReducer,
});
