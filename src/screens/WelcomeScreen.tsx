import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamsList } from "../navigations/types";
import { Container, Button, Text, Spinner } from "native-base";
import { useSelector } from "react-redux";
import { selectAppLoading } from "../store/appState/selectors";
import { useFonts, Limelight_400Regular } from "@expo-google-fonts/limelight";
import { Poppins_200ExtraLight } from "@expo-google-fonts/poppins";

type Props = {
  navigation: StackNavigationProp<AuthStackParamsList, "Welcome">;
};

export default function WelcomeScreen({ navigation }: Props) {
  // Get font
  let [fontsLoaded] = useFonts({
    Limelight_400Regular,
    Poppins_200ExtraLight,
  });

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Return spinner when loading
  if (isLoading || !fontsLoaded) {
    return (
      <Container style={styles.containerSpinner}>
        <Spinner color="black" />
      </Container>
    );
  }
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <Container style={styles.container}>
        <Text style={styles.title}>DINELY</Text>
        <Text style={styles.subtitle}>Your personal restaurant keeper</Text>
        <Button
          full
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Button>
        <Button
          full
          style={styles.button}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </Button>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
    backgroundColor: "transparent",
  },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  backgroundImage: { width: "100%", height: "100%" },
  title: {
    fontWeight: "bold",
    fontSize: 75,
    textAlign: "center",
    color: "white",
    fontFamily: "Limelight_400Regular",
  },
  subtitle: {
    color: "white",
    marginBottom: 100,
    textAlign: "center",
    fontFamily: "Poppins_200ExtraLight",
    marginTop: 0,
  },
  button: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonText: { color: "black" },
});
