import { RestaurantActions, RestaurantState } from "./types";

const initialState: RestaurantState = {
  userRestaurants: [],
};

export default function reducer(
  state = initialState,
  action: RestaurantActions
) {
  switch (action.type) {
    case "restaurant/restaurantsFetched":
      return {
        userRestaurants: [...action.payload],
      };
    case "restaurant/addOne":
      return {
        userRestaurants: [...state.userRestaurants, action.payload],
      };

    case "restaurant/updateOne":
      return {
        userRestaurants: state.userRestaurants.map((restaurant) => {
          if (restaurant.id !== action.payload.id) {
            return restaurant;
          }

          return action.payload;
        }),
      };
    case "restaurant/deleteOne":
      return {
        userRestaurants: state.userRestaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
