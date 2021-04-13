import { NavigatorScreenParams } from "@react-navigation/core";

export type AuthStackParamsList = {
  Welcome: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type TabParamsList = {
  ReviewsTab: undefined;
  WishlistTab: NavigatorScreenParams<WishlistStackParamsList>;
  AddTab: NavigatorScreenParams<AddStackParamsList>;
  AccountTab: undefined;
};

export type AccountStackParamsList = {
  Account: undefined;
  Tags: undefined;
};

export type AddStackParamsList = {
  Add: undefined;
  AddReview:
    | {
        id: number | undefined;
        name: string | undefined;
        location: string | undefined;
        tags: string[] | undefined;
      }
    | undefined;
  AddWishlist: undefined;
};

export type WishlistStackParamsList = {
  Wishlist: undefined;
  WishlistDetails: { restaurantId: number };
};
