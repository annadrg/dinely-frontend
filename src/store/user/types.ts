// State type
export type UserState = {
  token: string | null;
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

// Action types
export type UserActions =
  | { type: "user/logInSuccess"; payload: User }
  | { type: "user/tokenStillValid"; payload: User }
  | { type: "user/logOutSuccess" };

// User type
export type User = {
  token: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};
