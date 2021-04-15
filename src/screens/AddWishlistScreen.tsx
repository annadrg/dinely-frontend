import { NavigationProp } from "@react-navigation/core";
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
import React, { PropsWithRef, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyHeader from "../components/MyHeader";
import SelectTags from "../components/SelectTags";
import { onChangeInput, showToast } from "../functions";
import { AddStackParamsList } from "../navigations/types";
import { selectAppLoading } from "../store/appState/selectors";
import { addRestaurant } from "../store/restaurant/actions";
import { getTags } from "../store/tag/actions";
import { selectUserTags } from "../store/tag/selectors";

type Props = {
  navigation: NavigationProp<AddStackParamsList, "AddReview">;
};

export default function AddWishlistScreen({ navigation }: Props) {
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

  return (
    <Container>
      <MyHeader title="Add to wishlist" goBack={navigation.goBack} />
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
          <SelectTags
            allTags={userTagsWithString}
            selectedTags={tags}
            setSelectedTags={setTags}
          />

          <Button dark onPress={onSubmitClick} style={styles.button}>
            <Text>Add to wishlist</Text>
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20, flex: 5 },
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
