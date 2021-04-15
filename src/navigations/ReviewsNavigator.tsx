import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReviewsStackParamsList } from "./types";
import ReviewsScreen from "../screens/ReviewsScreen";
import ReviewDetailsScreen from "../screens/ReviewDetailsScreen";

const ReviewsStack = createStackNavigator<ReviewsStackParamsList>();

const ReviewsNavigator = () => (
  <ReviewsStack.Navigator>
    <ReviewsStack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{ headerShown: false }}
    />
    <ReviewsStack.Screen
      name="ReviewDetails"
      component={ReviewDetailsScreen}
      options={{ headerShown: false }}
    />
  </ReviewsStack.Navigator>
);

export default ReviewsNavigator;
