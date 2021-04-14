import { Container } from "native-base";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import MyModal from "./MyModal";

type Props = {
  image1: string;
  image2: string;
  image3: string;
};

export default function ShowImages({ image1, image2, image3 }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const modalContent = (
    <Container>
      {selectedImage ? (
        <Image
          style={styles.largeImage}
          source={
            selectedImage === 1
              ? { uri: image1 }
              : selectedImage === 2
              ? { uri: image2 }
              : { uri: image3 }
          }
        />
      ) : null}
    </Container>
  );
  return (
    <Container style={styles.container}>
      {image1 ? (
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setSelectedImage(1);
          }}
        >
          <Image style={styles.image} source={{ uri: image1 }} />
        </Pressable>
      ) : null}
      {image2 ? (
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setSelectedImage(2);
          }}
        >
          <Image style={styles.image} source={{ uri: image2 }} />
        </Pressable>
      ) : null}
      {image3 ? (
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setSelectedImage(3);
          }}
        >
          <Image style={styles.image} source={{ uri: image3 }} />
        </Pressable>
      ) : null}
      <MyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        content={modalContent}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxHeight: 120,
    padding: 15,
    marginBottom: 0,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginRight: 3,
  },
  largeImage: { height: 350, width: 350 },
});
