import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WishlistStackParamsList } from "./types";
import WishlistScreen from "../screens/WishlistScreen";
import WishlistDetailsScreen from "../screens/WishlistDetailsScreen";

const WishlistStack = createStackNavigator<WishlistStackParamsList>();

const WishlistNavigator = () => (
  <WishlistStack.Navigator>
    <WishlistStack.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{ headerShown: false }}
    />
    <WishlistStack.Screen
      name="WishlistDetails"
      component={WishlistDetailsScreen}
      options={{ title: "Restaurant details" }}
    />
  </WishlistStack.Navigator>
);

export default WishlistNavigator;
