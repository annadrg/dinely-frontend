import { Container, Icon, Text, Button } from "native-base";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet } from "react-native";
import ImageInput from "./ImageInput";
import MyModal from "./MyModal";

type Props = {
  image1: string;
  setImage1: Function;
  image2: string;
  setImage2: Function;
  image3: string;
  setImage3: Function;
};

export default function AddImages({
  image1,
  setImage1,
  image2,
  setImage2,
  image3,
  setImage3,
}: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Handle delete image
  const onDeleteImageClick = () => {
    Alert.alert("Delete", "Are you sure you want to delete this picture?", [
      {
        text: "Yes",
        onPress: () => {
          selectedImage === 1
            ? setImage1(null)
            : selectedImage === 2
            ? setImage2(null)
            : setImage3(null);
          setSelectedImage(null);
          setModalVisible(false);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

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
      <Button dark onPress={onDeleteImageClick} style={styles.deleteButton}>
        <Icon name="trash" style={styles.deleteIcon} />
        <Text>Delete image</Text>
      </Button>
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
      {(!image1 || !image2 || !image3) && (
        <ImageInput
          setImage={!image1 ? setImage1 : !image2 ? setImage2 : setImage3}
        />
      )}
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
    flex: 1,
    flexDirection: "row",
    height: 120,
    padding: 15,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginRight: 3,
  },
  largeImage: { height: 350, width: 350 },
  deleteButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 15,
  },
  deleteIcon: { marginRight: 0 },
});
