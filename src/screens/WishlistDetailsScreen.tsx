import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Container,
  Form,
  Icon,
  Item,
  Spinner,
  Text,
  Item as FormItem,
  Label,
  Input,
  Content,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, LogBox, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal";
import SelectTags from "../components/SelectTags";
import { onChangeInput, showToast } from "../functions";
import { TabParamsList, WishlistStackParamsList } from "../navigations/types";
import { selectAppLoading } from "../store/appState/selectors";
import {
  deleteRestaurant,
  updateRestaurant,
} from "../store/restaurant/actions";
import { selectSpecificRestaurant } from "../store/restaurant/selectors";
import { selectUserTags } from "../store/tag/selectors";

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<WishlistStackParamsList, "WishlistDetails">,
    BottomTabNavigationProp<TabParamsList>
  >;
  route: RouteProp<WishlistStackParamsList, "WishlistDetails">;
};

export default function WishlistDetailsScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // Ignore virtualized list warning
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Get restaurant from state
  const restaurantId = route.params.restaurantId;
  const restaurant = useSelector(selectSpecificRestaurant(restaurantId));

  // Create list of string tag id's
  const tagIds = restaurant?.tags.map((restaurant) => restaurant.id.toString());

  // Get tags from state
  const userTags = useSelector(selectUserTags);

  // Convert id's to string for flatlist
  const userTagsWithString = userTags.map((tag) => {
    return { ...tag, id: tag.id.toString() };
  });

  // Create state for modal visibility
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  // Create states for input fields
  const [name, setName] = useState<string>(restaurant?.name || "");
  const [location, setLocation] = useState<string>(restaurant?.location || "");
  const [tags, setTags] = useState<string[]>(tagIds || []);

  // Convert tag id's back to number
  const tagsIds = tags.map((tag) => {
    return parseInt(tag);
  });

  // Handle edit restaurant
  const onEditRestaurantClick = () => {
    if (!name || !location) {
      showToast("Please fill in name and location", 6000, "danger", "Okay");
    } else {
      dispatch(
        updateRestaurant(restaurantId, {
          name,
          location,
          tags: tagsIds,
          isReviewed: false,
        })
      );
      setEditModalVisible(false);
    }
  };

  // Handle delete restaurant
  const onDeleteRestaurantClick = () => {
    Alert.alert("Delete", "Are you sure you want to delete this restaurant?", [
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteRestaurant(restaurantId));
          navigation.goBack();
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Edit modal content
  const editModalContent = (
    <Content style={styles.modalContainer}>
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

        <Button
          primary
          onPress={onEditRestaurantClick}
          style={styles.modalButton}
        >
          <Text>Edit</Text>
        </Button>
      </Form>
    </Content>
  );

  // Return spinner when loading
  if (isLoading) {
    return (
      <Container style={styles.containerSpinner}>
        <Spinner color="black" />
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{restaurant?.name}</Text>
      <Text style={styles.subtitle}>
        <Icon name="location" style={styles.icon} /> {restaurant?.location}
      </Text>
      <Item style={styles.tagContainer}>
        {restaurant?.tags.map((tag) => {
          return (
            <Button
              key={tag.id}
              style={{
                backgroundColor:
                  tag.color !== "#ffffff" ? tag.color : "#000000",
                borderRadius: 30,
                marginRight: 2,
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>{tag.name}</Text>
            </Button>
          );
        })}
      </Item>
      <Container style={styles.buttonContainer}>
        <Button
          style={styles.reviewButton}
          onPress={() =>
            navigation.navigate("AddTab", {
              screen: "AddReview",
              params: {
                id: restaurant?.id,
                name: restaurant?.name,
                location: restaurant?.location,
                tags: tagIds,
              },
            })
          }
        >
          <Icon name="star" style={styles.buttonIcon} />
          <Text>Review</Text>
        </Button>
        <Button style={styles.button} onPress={() => setEditModalVisible(true)}>
          <Text>Edit</Text>
        </Button>
        <MyModal
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          title="Edit"
          content={editModalContent}
        />
        <Button onPress={onDeleteRestaurantClick}>
          <Icon name="trash" style={styles.buttonIcon} />
          <Text>Delete</Text>
        </Button>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20 },
  containerSpinner: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginVertical: 10,
    marginLeft: 15,
  },
  subtitle: { fontWeight: "200", fontSize: 26, marginLeft: 15 },
  icon: { color: "#727272", fontSize: 22 },
  tagContainer: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 20,
    paddingBottom: 20,
  },
  buttonIcon: { marginRight: 0 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: { marginRight: 5 },
  reviewButton: { backgroundColor: "#ffce0a", marginRight: 5 },
  multiSelectLabel: {
    marginLeft: 15,
    marginTop: 30,
    color: "#727272",
    fontSize: 15,
  },
  label: { color: "#727272", fontSize: 15 },
  modalContainer: { width: 350, paddingRight: 20 },
  modalButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginVertical: 20,
    marginLeft: 10,
  },
});
