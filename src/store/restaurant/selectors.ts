import { ReduxState } from "../types";

export const selectUserRestaurants = (reduxState: ReduxState) =>
  reduxState.restaurant.userRestaurants;

export const selectRestaurantLocations = (reduxState: ReduxState) => {
  const restaurants = reduxState.restaurant.userRestaurants;
  const locations = restaurants.map((restaurant) => restaurant.location);
  const uniqueLocations = Array.from(new Set(locations));
  const objectLocations = uniqueLocations.map((location) => {
    return { id: location, name: location };
  });
  return objectLocations;
};

export const selectSpecificRestaurant = (restaurantId: number) => (
  reduxState: ReduxState
) => {
  const restaurants = reduxState.restaurant.userRestaurants;
  return restaurants.find((restaurant) => restaurant.id === restaurantId);
};

export const selectFilteredWishlist = (
  filterLocations: string[],
  filterTags: number[],
  search: string
) => (reduxState: ReduxState) => {
  const restaurants = reduxState.restaurant.userRestaurants;
  const wishlist = restaurants.filter((restaurant) => !restaurant.isReviewed);

  const filteredOnSearch =
    search.length > 0
      ? wishlist.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase())
        )
      : [...wishlist];

  const filteredOnLocation =
    filterLocations.length > 0
      ? filteredOnSearch.filter((restaurant) =>
          filterLocations.includes(restaurant.location)
        )
      : [...filteredOnSearch];

  const filteredOnTags =
    filterTags.length > 0
      ? filteredOnLocation.filter((restaurant) =>
          restaurant.tags.some((tag) => filterTags.includes(tag.id))
        )
      : [...filteredOnLocation];

  return filteredOnTags;
};
