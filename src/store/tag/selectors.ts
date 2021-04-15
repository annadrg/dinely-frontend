import { ReduxState } from "../types";

export const selectUserTags = (reduxState: ReduxState) =>
  reduxState.tag.userTags;
