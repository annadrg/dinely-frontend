import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamsList } from "./types";
import { FontAwesome } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import AddNavigator from "./AddNavigator";
import WishlistNavigator from "./WishlistNavigator";
import ReviewsNavigator from "./ReviewsNavigator";

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
      name="ReviewsTab"
      component={ReviewsNavigator}
      options={{
        title: "Reviews",
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
      name="WishlistTab"
      component={WishlistNavigator}
      options={{
        title: "Wishlist",
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
      name="AddTab"
      component={AddNavigator}
      options={{
        title: "Add",
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
      name="AccountTab"
      component={AccountNavigator}
      options={{
        title: "Account",
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
