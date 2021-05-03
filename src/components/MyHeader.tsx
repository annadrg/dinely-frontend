// import { StatusBar } from "expo-status-bar";
import { Button, Container, Icon, Text } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, StatusBar } from "react-native";

type Props = {
  title?: string;
  goBack?: Function;
  navigationRoute?: string;
};

export default function MyHeader({ title, goBack, navigationRoute }: Props) {
  return (
    <Container style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/header-background.jpg")}
        style={styles.backgroundImage}
      >
        {goBack ? (
          <Button
            onPress={() =>
              goBack
                ? navigationRoute
                  ? goBack(navigationRoute)
                  : goBack()
                : null
            }
            style={styles.button}
          >
            <Icon name="arrow-back" style={styles.icon} />
          </Button>
        ) : (
          <Text style={{ marginTop: 65 }}></Text>
        )}
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { width: "100%", height: "100%" },
  button: { marginLeft: 10, marginTop: 35, backgroundColor: "transparent" },
  icon: { color: "white", fontSize: 28 },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
