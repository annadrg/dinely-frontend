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
import { deleteTag, getTags, updateTag } from "../store/tag/actions";
import { selectUserTags } from "../store/tag/selectors";
import { Tag } from "../store/tag/types";
import ColorPicker from "../components/ColorPicker";
import MyHeader from "../components/MyHeader";
import { NavigationProp } from "@react-navigation/core";
import { AccountStackParamsList } from "../navigations/types";

type Props = {
  navigation: NavigationProp<AccountStackParamsList, "Tags">;
};

export default function TagScreen({ navigation }: Props) {
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
  const [updatedTagName, setUpdatedTagName] = useState<string>(
    selectedTag.name
  );
  const [updatedTagColor, setUpdatedTagColor] = useState<string>(
    selectedTag.color || "black"
  );

  // Handle edit tag
  const onEditTagClick = () => {
    if (!updatedTagName) {
      showToast("Please fill in a name", 6000, "danger", "Okay");
    } else {
      dispatch(
        updateTag(selectedTag.id, {
          name: updatedTagName,
          color: updatedTagColor,
        })
      );
      setUpdatedTagName("");
      setUpdatedTagColor("");
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

      <ColorPicker color={updatedTagColor} setColor={setUpdatedTagColor} />

      <Button dark onPress={onEditTagClick} style={styles.modalButton}>
        <Text>Edit tag</Text>
      </Button>
      <Button dark onPress={onDeleteTagClick} style={styles.deleteButton}>
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
      <MyHeader title="My tags" goBack={navigation.goBack} />
      <Container style={styles.flexContainer}>
        <AddTagModal
          visible={addModalVisible}
          setVisible={setAddModalVisible}
        />

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
                style={{
                  borderRadius: 40,
                  margin: 2,
                  backgroundColor: tag.color,
                }}
                onPress={() => {
                  setSelectedTag(tag);
                  setUpdatedTagName(tag.name);
                  setUpdatedTagColor(tag.color || "");
                  setEditModalVisible(true);
                }}
              >
                <Text>{tag.name}</Text>
              </Button>
            );
          })}
          <Button
            dark
            style={styles.tagButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Icon name="add" />
          </Button>
        </Content>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  flexContainer: { flex: 5 },
  tagList: {
    display: "flex",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
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
  form: { width: "100%", flex: 1, maxHeight: 300 },
  deleteIcon: { marginRight: 0 },
});
