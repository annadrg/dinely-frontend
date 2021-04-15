import { StackNavigationProp } from "@react-navigation/stack";
import { Container, Button, Text, Icon } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { AddStackParamsList } from "../navigations/types";

type Props = {
  navigation: StackNavigationProp<AddStackParamsList, "Add">;
};

export default function AddScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <Container style={styles.container}>
        <Button
          full
          style={styles.topButton}
          onPress={() => navigation.navigate("AddWishlist")}
        >
          <Icon type="FontAwesome" name="cutlery" style={styles.icon} />
          <Text style={styles.buttonText}>Add to wishlist</Text>
        </Button>
        <Button
          full
          style={styles.button}
          onPress={() => navigation.navigate("AddReview")}
        >
          <Icon type="FontAwesome" name="star" style={styles.icon} />
          <Text style={styles.buttonText}>Add a review</Text>
        </Button>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { width: "100%", height: "100%" },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  topButton: {
    marginHorizontal: 10,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  icon: { marginRight: 0, color: "black" },
  buttonText: { color: "black" },
});
