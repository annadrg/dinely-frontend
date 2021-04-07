import { UserState, UserAction } from "./types";

const initialState: UserState = {
  token: null,
  firstName: null,
  lastName: null,
  email: null,
};

export default function reducer(state = initialState, action: UserAction) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
