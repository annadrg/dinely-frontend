import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { WishlistStackParamsList } from "../navigations/types";

type Props = {
  navigation: StackNavigationProp<WishlistStackParamsList, "Wishlist">;
  route: RouteProp<WishlistStackParamsList, "Wishlist">;
};

export default function WishlistScreen({ navigation, route }: Props) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        <Button
          title="Go to wishlist details"
          onPress={() =>
            navigation.navigate("WishlistDetails", { restaurantId: 1 })
          }
        />
      </Text>
    </View>
  );
}
