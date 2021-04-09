import React from "react";
import { Text, View } from "react-native";

export default function WishlistScreen() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Wishlist
      </Text>
    </View>
  );
}
