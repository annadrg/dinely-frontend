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
import { signUp } from "../store/user/actions";
import { showToast } from "../functions";
import { onChangeInput } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";
import MyHeader from "../components/MyHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamsList } from "../navigations/types";

type Props = {
  navigation: StackNavigationProp<AuthStackParamsList, "SignUp">;
};

export default function SignUpScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Create states for input fields
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  // Handle sign up submit
  const onSubmitClick = () => {
    if (!firstName || !lastName || !email || !password || !passwordCheck) {
      showToast("Please fill in all fields", 6000, "danger", "Okay");
    } else if (password !== passwordCheck) {
      showToast("Passwords do not match", 6000, "danger", "Okay");
    } else {
      dispatch(signUp(firstName, lastName, email, password));
      Keyboard.dismiss();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
    }
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
    <Container>
      <MyHeader title="Sign up" goBack={navigation.goBack} />
      <Container style={styles.container}>
        <Form>
          <FormItem floatingLabel>
            <Label>First name</Label>
            <Input value={firstName} onChange={onChangeInput(setFirstName)} />
          </FormItem>
          <FormItem floatingLabel>
            <Label>Last name</Label>
            <Input value={lastName} onChange={onChangeInput(setLastName)} />
          </FormItem>
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
          <FormItem floatingLabel>
            <Label>Confirm password</Label>
            <Input
              secureTextEntry={true}
              value={passwordCheck}
              onChange={onChangeInput(setPasswordCheck)}
            />
          </FormItem>

          <Button dark onPress={onSubmitClick} style={styles.button}>
            <Text> Sign up </Text>
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20, flex: 5 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  button: { paddingBottom: 4, alignSelf: "center", marginVertical: 20 },
});
