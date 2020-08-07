export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserState {
  user?: User;
  users?: User[];
  isSubmitting: boolean;
}

export interface UserAction {
  type: string;
  data: object;
}

export interface Response<T> {
  data: {
    data: T;
  };
}

export interface Action<T> {
  data: T;
  type: string;
}
