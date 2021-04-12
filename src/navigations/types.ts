export type AuthStackParamsList = {
  Welcome: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type TabParamsList = {
  Reviews: undefined;
  Wishlist: undefined;
  Add: undefined;
  Account: undefined;
};

export type AccountStackParamsList = {
  Account: undefined;
  Tags: undefined;
};

export type AddStackParamsList = {
  Add: undefined;
  AddReview: undefined;
  AddWishlist: undefined;
};

export type WishlistStackParamsList = {
  Wishlist: undefined;
  WishlistDetails: { restaurantId: number };
};
