import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/AuthNavigator";
import { getUserWithStoredToken } from "./src/store/user/actions";
import { Root } from "native-base";
import TabNavigator from "./src/navigations/TabNavigator";
import { selectToken } from "./src/store/user/selectors";

function App() {
  const dispatch = useDispatch();

  // Get token from state
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <Root>
      <NavigationContainer>
        {token ? <TabNavigator /> : <AuthNavigator />}
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
