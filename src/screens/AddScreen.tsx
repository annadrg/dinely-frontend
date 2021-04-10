import { StackNavigationProp } from "@react-navigation/stack";
import { Container, Button, Text, Icon } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { AddStackParamsList } from "../navigations/types";

type Props = {
  navigation: StackNavigationProp<AddStackParamsList, "Add">;
};

export default function AddScreen({ navigation }: Props) {
  return (
    <Container style={styles.container}>
      <Button
        full
        style={styles.topButton}
        onPress={() => navigation.navigate("AddWishlist")}
      >
        <Icon type="FontAwesome" name="cutlery" style={styles.icon} />
        <Text>Wishlist</Text>
      </Button>
      <Button
        full
        style={styles.button}
        onPress={() => navigation.navigate("AddReview")}
      >
        <Icon type="FontAwesome" name="star" style={styles.icon} />
        <Text>Review</Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  topButton: { marginHorizontal: 10, marginTop: 50, borderRadius: 10 },
  button: { marginHorizontal: 10, marginTop: 5, borderRadius: 10 },
  icon: { marginRight: 0 },
});
