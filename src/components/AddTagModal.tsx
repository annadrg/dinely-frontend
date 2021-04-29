import {
  Form,
  Item as FormItem,
  Label,
  Input,
  Text,
  Button,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { onChangeInput, showToast } from "../functions";
import { addTag } from "../store/tag/actions";
import ColorPicker from "./ColorPicker";
import MyModal from "./MyModal";

type Props = {
  visible: boolean;
  setVisible: Function;
};

export default function AddTagModal({ visible, setVisible }: Props) {
  const dispatch = useDispatch();
  // Create state for input fields
  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagColor, setNewTagColor] = useState<string>("black");

  // Handle add new tag
  const onAddTagClick = () => {
    if (!newTagName) {
      showToast("Please fill in all fields", 6000, "danger", "Okay");
    } else {
      dispatch(addTag({ name: newTagName, color: newTagColor }));
      setNewTagName("");
      setVisible(false);
    }
  };

  // Content of add tag modal
  const addModalContent = (
    <Form style={styles.form}>
      <FormItem floatingLabel>
        <Label>Tag name</Label>
        <Input value={newTagName} onChange={onChangeInput(setNewTagName)} />
      </FormItem>

      <ColorPicker color={newTagColor} setColor={setNewTagColor} />

      <Button dark onPress={onAddTagClick} style={styles.modalButton}>
        <Text>Add tag</Text>
      </Button>
    </Form>
  );
  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      title="Add tag"
      content={addModalContent}
    />
  );
}

const styles = StyleSheet.create({
  modalButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 20,
  },
  form: { width: "100%", flex: 1, maxHeight: 250 },
});
