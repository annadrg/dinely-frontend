import React, { useState } from "react";
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Spinner,
} from "native-base";
import { Keyboard, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/user/actions";
import { onChangeInput } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";

export default function LogInScreen() {
  const dispatch = useDispatch();

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Create states for input fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle login submit
  const onSubmitClick = () => {
    dispatch(logIn(email, password));
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
  };

  // Return spinner when loading
  if (isLoading) {
    return (
      <Container style={styles.containerSpinner}>
        <Spinner color="black" />
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Form>
        <FormItem floatingLabel>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChange={onChangeInput(setEmail)}
          />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={password}
            onChange={onChangeInput(setPassword)}
          />
        </FormItem>

        <Button primary onPress={onSubmitClick} style={styles.button}>
          <Text> Login </Text>
        </Button>
      </Form>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  button: { paddingBottom: 4, alignSelf: "center", marginVertical: 20 },
});
