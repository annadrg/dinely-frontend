import { RestaurantActions, RestaurantState } from "./types";

const initialState: RestaurantState = {
  userRestaurants: [],
};

export default function reducer(
  state = initialState,
  action: RestaurantActions
) {
  switch (action.type) {
    default:
      return state;
  }
}
