import { Container, Button, Text } from "native-base";
import React from "react";

type Props = {
  color: string;
  setColor: Function;
};

export default function ColorPicker({ color, setColor }: Props) {
  return (
    <Container style={{ flex: 1, padding: 20, marginVertical: 20 }}>
      <Text style={{ color: "#727272", fontSize: 15 }}>Select color</Text>
      <Container style={{ flexDirection: "row", marginTop: 10 }}>
        <Button
          small
          onPress={() =>
            color === "#540d6e" ? setColor("black") : setColor("#540d6e")
          }
          style={
            color === "#540d6e"
              ? {
                  backgroundColor: "#540d6e",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#540d6e",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
        <Button
          small
          onPress={() =>
            color === "#ee4266" ? setColor("black") : setColor("#ee4266")
          }
          style={
            color === "#ee4266"
              ? {
                  backgroundColor: "#ee4266",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#ee4266",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
        <Button
          small
          onPress={() =>
            color === "#ffd23f" ? setColor("black") : setColor("#ffd23f")
          }
          style={
            color === "#ffd23f"
              ? {
                  backgroundColor: "#ffd23f",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#ffd23f",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
        <Button
          small
          onPress={() =>
            color === "#3bceac" ? setColor("black") : setColor("#3bceac")
          }
          style={
            color === "#3bceac"
              ? {
                  backgroundColor: "#3bceac",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#3bceac",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
        <Button
          small
          onPress={() =>
            color === "#00c2d1" ? setColor("black") : setColor("#00c2d1")
          }
          style={
            color === "#00c2d1"
              ? {
                  backgroundColor: "#00c2d1",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#00c2d1",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
        <Button
          small
          onPress={() =>
            color === "#2e86ab" ? setColor("black") : setColor("#2e86ab")
          }
          style={
            color === "#2e86ab"
              ? {
                  backgroundColor: "#2e86ab",
                  borderRadius: 50,
                  marginRight: 2,
                  borderWidth: 3,
                  borderColor: "black",
                  width: 30,
                }
              : {
                  backgroundColor: "#2e86ab",
                  borderRadius: 50,
                  marginRight: 2,
                  width: 30,
                }
          }
        >
          <Text></Text>
        </Button>
      </Container>
    </Container>
  );
}
