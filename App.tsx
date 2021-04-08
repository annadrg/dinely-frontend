import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/AuthNavigator";
import { getUserWithStoredToken } from "./src/store/user/actions";
import { Root } from "native-base";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <Root>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Root>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
