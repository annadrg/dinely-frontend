import { AppState, AppStateActionTypes } from "./types";

const initialState: AppState = {
  loading: false,
};

export default (state = initialState, action: AppStateActionTypes) => {
  switch (action.type) {
    case "app/appLoading":
      return { loading: true };
    case "app/appDoneLoading":
      return { loading: false };
    default:
      return state;
  }
};
