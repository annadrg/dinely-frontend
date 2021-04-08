import { ReduxState } from "../types";

export const selectAppLoading = (reduxState: ReduxState) =>
  reduxState.appState.loading;
