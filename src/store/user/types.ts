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
  | { type: "user/logOutSuccess" }
  | { type: "user/updateUserDetails"; payload: UserWithoutToken };

// User type
export type User = {
  token: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

// User without token type
export type UserWithoutToken = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};
