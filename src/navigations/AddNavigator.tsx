import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";
import { AddStackParamsList } from "./types";
import AddReviewScreen from "../screens/AddReviewScreen";
import AddWishlistScreen from "../screens/AddWishlistScreen";

const AddStack = createStackNavigator<AddStackParamsList>();

const AddNavigator = () => (
  <AddStack.Navigator>
    <AddStack.Screen
      name="Add"
      component={AddScreen}
      options={{ headerShown: false }}
    />
    <AddStack.Screen
      name="AddReview"
      component={AddReviewScreen}
      options={{ title: "Add review" }}
    />
    <AddStack.Screen
      name="AddWishlist"
      component={AddWishlistScreen}
      options={{ title: "Add wishlist item" }}
    />
  </AddStack.Navigator>
);

export default AddNavigator;
