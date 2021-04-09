import { ReduxState } from "../types";

export const selectToken = (reduxState: ReduxState) => reduxState.user.token;
export const selectUser = (reduxState: ReduxState) => reduxState.user;
