import {
  Container,
  Form,
  Item as FormItem,
  Label,
  Input,
  Button,
  Text,
  Spinner,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import AddTagModal from "../components/AddTagModal";
import { onChangeInput, showToast } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";
import { addRestaurant } from "../store/restaurant/actions";
import { getTags } from "../store/tag/actions";
import { selectUserTags } from "../store/tag/selectors";

export default function AddWishlistScreen() {
  const dispatch = useDispatch();

  // Set tags to state
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  // Get tags from state
  const userTags = useSelector(selectUserTags);

  // Convert id's to string for flatlist
  const userTagsWithString = userTags.map((tag) => {
    return { ...tag, id: tag.id.toString() };
  });

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Create state for visibility modal
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  // Create states for input fields
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Convert tag id's back to number
  const tagsIds = tags.map((tag) => {
    return parseInt(tag);
  });

  // Handle add restaurant
  const onSubmitClick = () => {
    if (!name || !location) {
      showToast("Please fill in name and location", 6000, "danger", "Okay");
    } else {
      dispatch(
        addRestaurant({ name, location, tags: tagsIds, isReviewed: false })
      );
      setName("");
      setLocation("");
      setTags([]);
    }
  };

  // Return spinner when loading
  if (isLoading) {
    return (
      <Container style={styles.containerSpinner}>
        <Spinner color="black" />
      </Container>
    );
  }
  console.log(tags);
  return (
    <Container style={styles.container}>
      <Form>
        <FormItem stackedLabel>
          <Label style={styles.label}>Restaurant name</Label>
          <Input value={name} onChange={onChangeInput(setName)} />
        </FormItem>
        <FormItem stackedLabel>
          <Label style={styles.label}>Location</Label>
          <Input value={location} onChange={onChangeInput(setLocation)} />
        </FormItem>
        <Text style={styles.multiSelectLabel}>Tags</Text>
        <MultiSelect
          items={userTagsWithString}
          uniqueKey="id"
          selectedItems={tags}
          onSelectedItemsChange={setTags}
          styleMainWrapper={styles.multiSelect}
          searchInputStyle={styles.multiSelectSearch}
          tagBorderColor="#727272"
          tagRemoveIconColor="#727272"
          tagTextColor="#727272"
          submitButtonText="Select"
          styleItemsContainer={styles.multiSelectItemContainer}
          styleRowList={styles.multiSelectItem}
        />

        <Button
          small
          style={styles.tagButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text>Add tag</Text>
        </Button>

        <AddTagModal
          visible={addModalVisible}
          setVisible={setAddModalVisible}
        />

        <Button primary onPress={onSubmitClick} style={styles.button}>
          <Text>Add</Text>
        </Button>
      </Form>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  button: { paddingBottom: 4, alignSelf: "center", marginVertical: 20 },
  multiSelect: { marginLeft: 15 },
  multiSelectSearch: { height: 50 },
  multiSelectItemContainer: { height: 120 },
  multiSelectItem: { padding: 6 },
  multiSelectLabel: {
    marginLeft: 15,
    marginTop: 30,
    color: "#727272",
    fontSize: 15,
  },
  label: { color: "#727272", fontSize: 15 },
  tagButton: { marginLeft: 15, backgroundColor: "#727272", marginTop: 10 },
});
