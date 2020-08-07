import { UserState } from "./Users/userTypes";

export * from "./Users/userTypes";

export interface RootState {
  userReducer: UserState;
}
