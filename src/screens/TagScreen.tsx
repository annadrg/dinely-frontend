import {
  Button,
  Container,
  Form,
  Icon,
  Spinner,
  Text,
  Item as FormItem,
  Label,
  Input,
  Content,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddTagModal from "../components/AddTagModal";
import MyModal from "../components/MyModal";
import { onChangeInput, showToast } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";
import { addTag, deleteTag, getTags, updateTag } from "../store/tag/actions";
import { selectUserTags } from "../store/tag/selectors";
import { Tag } from "../store/tag/types";

export default function TagScreen() {
  const dispatch = useDispatch();

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Set tags to state
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  // Get tags from state
  const tags = useSelector(selectUserTags);

  // Create states for visibilty of modals
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  // Create state for selected tag
  const [selectedTag, setSelectedTag] = useState<Tag>({
    id: 0,
    name: "",
    color: "",
  });

  // Create states for input fields
  const [updatedTagName, setUpdatedTagName] = useState<string>("");

  // Handle edit tag
  const onEditTagClick = () => {
    if (!updatedTagName) {
      showToast("Please fill in all fields", 6000, "danger", "Okay");
    } else {
      dispatch(updateTag(selectedTag.id, { name: updatedTagName }));
      setUpdatedTagName("");
      setEditModalVisible(false);
    }
  };

  // Handle delete tag
  const onDeleteTagClick = () => {
    Alert.alert("Delete", "Are you sure you want to delete this tag?", [
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteTag(selectedTag.id));
          setEditModalVisible(false);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Content of edit tag modal
  const editModalContent = (
    <Form style={styles.form}>
      <FormItem floatingLabel>
        <Label>Edit name</Label>
        <Input
          value={updatedTagName}
          onChange={onChangeInput(setUpdatedTagName)}
        />
      </FormItem>

      <Button onPress={onEditTagClick} style={styles.modalButton}>
        <Text>Edit tag</Text>
      </Button>
      <Button onPress={onDeleteTagClick} style={styles.deleteButton}>
        <Icon name="trash" style={styles.deleteIcon} />
        <Text>Delete tag</Text>
      </Button>
    </Form>
  );

  // Return spinner when loading
  if (isLoading) {
    return (
      <Container style={styles.container}>
        <Spinner color="black" />
      </Container>
    );
  }
  return (
    <Container>
      <Text style={styles.title}>My tags</Text>

      <AddTagModal visible={addModalVisible} setVisible={setAddModalVisible} />

      <MyModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        title={selectedTag?.name}
        content={editModalContent}
      />

      <Content contentContainerStyle={styles.tagList}>
        {tags.map((tag) => {
          return (
            <Button
              key={tag.id}
              style={styles.tagButton}
              onPress={() => {
                setSelectedTag(tag);
                setEditModalVisible(true);
              }}
            >
              <Text>{tag.name}</Text>
            </Button>
          );
        })}
        <Button
          style={styles.tagButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Icon name="add" />
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  tagList: {
    display: "flex",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
  tagButton: { borderRadius: 40, margin: 2 },
  modalButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 20,
  },
  deleteButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 5,
  },
  form: { width: "100%" },
  deleteIcon: { marginRight: 0 },
});
