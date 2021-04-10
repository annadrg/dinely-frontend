import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamsList } from "./types";
import { FontAwesome } from "@expo/vector-icons";
import ReviewsScreen from "../screens/ReviewsScreen";
import WishlistScreen from "../screens/WishlistScreen";
import AddScreen from "../screens/AddScreen";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator<TabParamsList>();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      labelPosition: "below-icon",
    }}
  >
    <Tab.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="star"
            color={focused ? "tomato" : "#000000"}
            size={20}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="cutlery"
            color={focused ? "tomato" : "#000000"}
            size={20}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={AddScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="plus"
            color={focused ? "tomato" : "#000000"}
            size={20}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="user"
            color={focused ? "tomato" : "#000000"}
            size={20}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
