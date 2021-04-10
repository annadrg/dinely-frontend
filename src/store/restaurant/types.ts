// State type
export type RestaurantState = {
  userRestaurants: Restaurant[];
};

// Action types
export type RestaurantActions = { type: string; payload: any }; // To change

// Tag type
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
};
