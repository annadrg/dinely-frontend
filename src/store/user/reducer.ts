import { UserState, UserActions } from "./types";

const initialState: UserState = {
  token: null,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
};

export default function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case "user/logInSuccess":
      return { ...action.payload };

    case "user/logOutSuccess":
      return { ...initialState };

    case "user/tokenStillValid":
      return { ...action.payload };

    case "user/updateUserDetails":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
