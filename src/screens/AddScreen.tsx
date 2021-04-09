import React from "react";
import { Text, View } from "react-native";

export default function AddScreen() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Add
      </Text>
    </View>
  );
}
