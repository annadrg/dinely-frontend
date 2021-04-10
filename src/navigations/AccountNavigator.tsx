import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import TagScreen from "../screens/TagScreen";
import { AccountStackParamsList } from "./types";

const AccountStack = createStackNavigator<AccountStackParamsList>();

const AccountNavigator = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <AccountStack.Screen name="Tags" component={TagScreen} />
  </AccountStack.Navigator>
);

export default AccountNavigator;
