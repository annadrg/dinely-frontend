import moment from "moment";
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

export const selectFilteredReviews = (
  filterLocations: string[],
  filterTags: number[],
  filterRatings: string[],
  filterPriceCategories: string[],
  search: string,
  sortingMethod: string
) => (reduxState: ReduxState) => {
  const restaurants = reduxState.restaurant.userRestaurants;
  const reviews = restaurants.filter((restaurant) => restaurant.isReviewed);

  const filteredOnSearch =
    search.length > 0
      ? reviews.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase())
        )
      : [...reviews];

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

  const filteredOnRating =
    filterRatings.length > 0
      ? filteredOnTags.filter((restaurant) =>
          filterRatings.includes(restaurant.rating?.toString() || "")
        )
      : [...filteredOnTags];

  const filteredOnPriceCategory =
    filterPriceCategories.length > 0
      ? filteredOnRating.filter((restaurant) =>
          filterPriceCategories.includes(
            restaurant.priceCategory?.toString() || ""
          )
        )
      : [...filteredOnTags];

  if (sortingMethod === "DateAdded") {
    return [...filteredOnPriceCategory].sort((r1, r2) => {
      return (
        parseInt(moment(r2.updatedAt).format("YYYYMMDD")) -
        parseInt(moment(r1.updatedAt).format("YYYYMMDD"))
      );
    });
  } else if (sortingMethod === "DateVisited") {
    return [...filteredOnPriceCategory].sort((r1, r2) => {
      return (
        parseInt(moment(r2.dateVisited).format("YYYYMMDD")) -
        parseInt(moment(r1.dateVisited).format("YYYYMMDD"))
      );
    });
  } else {
    return [...filteredOnPriceCategory].sort((r1, r2) => {
      if (r1.rating && r2.rating) {
        return r2.rating - r1.rating;
      } else {
        return (
          parseInt(moment(r2.updatedAt).format("YYYYMMDD")) -
          parseInt(moment(r1.updatedAt).format("YYYYMMDD"))
        );
      }
    });
  }
};
