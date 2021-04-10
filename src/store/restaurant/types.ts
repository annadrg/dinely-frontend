// State type
export type RestaurantState = {
  userRestaurants: Restaurant[];
};

// Action types
export type RestaurantActions =
  | { type: "restaurant/restaurantsFetched"; payload: Restaurant[] }
  | { type: "restaurant/addOne"; payload: Restaurant }
  | { type: "restaurant/updateOne"; payload: Restaurant }
  | { type: "restaurant/deleteOne"; payload: number };

// Restaurant type
export type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number | null;
  dateVisited: Date | null;
  priceCategory: number | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  additionalInfo: string | null;
  isReviewed: boolean;
  updatedAt: Date;
  tags: number[];
};

// New restaurant type
export type NewRestaurant = {
  name: string;
  location: string;
  rating?: number;
  dateVisited?: Date;
  priceCategory?: number;
  image1?: string;
  image2?: string;
  image3?: string;
  additionalInfo?: string;
  isReviewed: boolean;
  tags: number[];
};
