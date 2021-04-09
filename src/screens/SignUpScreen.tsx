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
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { signUp } from "../store/user/actions";
import { toast } from "../functions";
import { onChangeInput } from "../functions";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

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
          <Input value={firstName} onChange={onChangeInput(setFirstName)} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Last name</Label>
          <Input value={lastName} onChange={onChangeInput(setLastName)} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Email</Label>
          <Input value={email} onChange={onChangeInput(setEmail)} />
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
