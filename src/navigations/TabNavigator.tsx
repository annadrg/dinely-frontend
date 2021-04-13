import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamsList } from "./types";
import { FontAwesome } from "@expo/vector-icons";
import ReviewsScreen from "../screens/ReviewsScreen";
import AccountNavigator from "./AccountNavigator";
import AddNavigator from "./AddNavigator";
import WishlistNavigator from "./WishlistNavigator";

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
      name="WishlistTab"
      component={WishlistNavigator}
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
      name="AddTab"
      component={AddNavigator}
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
      name="AccountTab"
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
