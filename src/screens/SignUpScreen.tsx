import React, { useState } from "react";
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
} from "native-base";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../store/user/actions";
import { toast } from "../components/toast";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const onChangeFirstName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setFirstName(value);
  };

  const onChangeLastName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setLastName(value);
  };

  const onChangeEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setEmail(value);
  };

  const onChangePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPassword(value);
  };

  const onChangePasswordCheck = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPasswordCheck(value);
  };

  const onSubmitClick = () => {
    if (password !== passwordCheck) {
      toast.showToast("Passwords do not match", 6000, "danger", "Okay");
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

  return (
    <Container style={{ padding: 10, paddingRight: 20 }}>
      <Form>
        <FormItem floatingLabel>
          <Label>First name</Label>
          <Input value={firstName} onChange={onChangeFirstName} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Last name</Label>
          <Input value={lastName} onChange={onChangeLastName} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Email</Label>
          <Input value={email} onChange={onChangeEmail} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={password}
            onChange={onChangePassword}
          />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Confirm password</Label>
          <Input
            secureTextEntry={true}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </FormItem>

        <Button
          primary
          onPress={onSubmitClick}
          style={{ paddingBottom: 4, alignSelf: "center", marginVertical: 20 }}
        >
          <Text> Sign up </Text>
        </Button>
      </Form>
    </Container>
  );
}
