import {
  Button,
  Container,
  Form,
  Text,
  Item as FormItem,
  Label,
  Input,
  Spinner,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal";
import { onChangeInput, showToast } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";
import { changeUserDetails, logOut } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function AccountScreen() {
  const dispatch = useDispatch();

  // Get user from state
  const user = useSelector(selectUser);

  const isLoading = useSelector(selectAppLoading);

  // Create states for visibilty of modals
  const [detailsModalVisible, setDetailsModalVisible] = useState<boolean>(
    false
  );
  const [passwordModalVisible, setPasswordModalVisible] = useState<boolean>(
    false
  );

  // Create states for input fields
  const [firstName, setFirstName] = useState<string>(user.firstName || "");
  const [lastName, setLastName] = useState<string>(user.lastName || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  // Handle change of personal details
  const onDetailsChangeClick = () => {
    dispatch(changeUserDetails(user.id, firstName, lastName, email));
    setDetailsModalVisible(false);
  };

  // TO DO Handle change of password
  const onPasswordChangeClick = () => {
    if (password !== passwordCheck) {
      showToast("Passwords do not match", 6000, "danger", "Okay");
    } else {
      console.log("Change password button clicked");
    }
  };

  // Handle log out
  const onLogOutClick = () => {
    dispatch(logOut());
  };

  const detailsModalContent = (
    <Form style={styles.form}>
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

      <Button onPress={onDetailsChangeClick} style={styles.modalButton}>
        <Text>Save</Text>
      </Button>
    </Form>
  );

  const passwordModalContent = (
    <Form style={styles.form}>
      <FormItem floatingLabel>
        <Label>New password</Label>
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

      <Button onPress={onPasswordChangeClick} style={styles.modalButton}>
        <Text>Save</Text>
      </Button>
    </Form>
  );

  if (isLoading) {
    return (
      <Container style={styles.container}>
        <Spinner color="black" />
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>

      <MyModal
        visible={detailsModalVisible}
        setVisible={setDetailsModalVisible}
        title="Change personal details"
        content={detailsModalContent}
      />

      <MyModal
        visible={passwordModalVisible}
        setVisible={setPasswordModalVisible}
        title="Change password"
        content={passwordModalContent}
      />

      <Button full style={styles.topButton}>
        <Text>Manage tags</Text>
      </Button>
      <Button
        full
        style={styles.button}
        onPress={() => setDetailsModalVisible(true)}
      >
        <Text>Change personal details</Text>
      </Button>
      <Button
        full
        style={styles.button}
        onPress={() => setPasswordModalVisible(true)}
      >
        <Text>Change password</Text>
      </Button>
      <Button full style={styles.button} onPress={onLogOutClick}>
        <Text>Log out</Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: { fontWeight: "200", fontSize: 16, textAlign: "center" },
  topButton: { marginHorizontal: 10, marginTop: 50 },
  button: { marginHorizontal: 10, marginTop: 5 },
  modalButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginVertical: 20,
  },
  form: { width: "100%" },
});
