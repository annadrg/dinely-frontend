import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { AuthStackParamsList } from "../types";

const AuthStack = createStackNavigator<AuthStackParamsList>();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="LogIn"
      component={LogInScreen}
      options={{ title: "Log in" }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ title: "Sign up" }}
    />
  </AuthStack.Navigator>
);

export default AuthNavigator;
