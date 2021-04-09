import React from "react";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamsList } from "../navigations/types";

type Props = {
  navigation: StackNavigationProp<AuthStackParamsList, "Welcome">;
};

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Welcome
      </Text>
      <Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Log in" onPress={() => navigation.navigate("LogIn")} />
    </View>
  );
}
