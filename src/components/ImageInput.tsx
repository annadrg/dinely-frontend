import React from "react";
import { Button, Container, Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";

type Props = {
  setImage: Function;
};

export default function ImageInput({ setImage }: Props) {
  const pickImage = async () => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissions.granted) {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      uploadImage(base64Img);
    }
  };

  const uploadImage = async (imageUri: string) => {
    console.log("triggered");
    const data = new FormData();
    data.append("file", imageUri);
    data.append("upload_preset", "gzrdfliz");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsk1a305p/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await response.json();
      setImage(file.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onPress={pickImage}
      style={{
        height: 100,
        width: 100,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <Icon name="camera" style={{ fontSize: 40 }} />
    </Button>
  );
}
