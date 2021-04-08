// State type
export type AppState = {
  loading: boolean;
};

// Action types
export type AppStateActions =
  | { type: "app/appLoading" }
  | { type: "app/appDoneLoading" };
