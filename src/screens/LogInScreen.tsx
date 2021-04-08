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
import { logIn } from "../store/user/actions";

export default function LogInScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const onSubmitClick = () => {
    dispatch(logIn(email, password));
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
  };

  return (
    <Container style={{ padding: 10, paddingRight: 20 }}>
      <Form>
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

        <Button
          primary
          onPress={onSubmitClick}
          style={{ paddingBottom: 4, alignSelf: "center", marginVertical: 20 }}
        >
          <Text> Login </Text>
        </Button>
      </Form>
    </Container>
  );
}
