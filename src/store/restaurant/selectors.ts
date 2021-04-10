import { ReduxState } from "../types";

export const selectUserRestaurants = (reduxState: ReduxState) =>
  reduxState.restaurant.userRestaurants;
