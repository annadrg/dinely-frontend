import { Button, Container, Icon, Text } from "native-base";
import React from "react";
import { Modal, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  setVisible: Function;
  title?: string;
  content: React.ReactNode;
};

export default function MyModal({
  visible,
  setVisible,
  title,
  content,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <Container style={styles.modalView}>
        <Button style={styles.closeButton} onPress={() => setVisible(!visible)}>
          <Icon name="close" style={{ color: "black" }} />
        </Button>
        <Text style={styles.title}>{title}</Text>
        {content}
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: { alignSelf: "flex-end", backgroundColor: "white" },
  modalView: {
    marginHorizontal: 10,
    marginVertical: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
