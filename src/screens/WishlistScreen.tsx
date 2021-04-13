import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  Spinner,
  Text,
  Button,
  Header,
  Item,
  Input,
  Icon,
} from "native-base";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal";
import SelectMultiple from "../components/SelectMultiple";
import RestaurantCard from "../components/RestaurantCard";
import { onChangeInput } from "../functions";
import { WishlistStackParamsList } from "../navigations/types";
import { selectAppLoading } from "../store/appState/selectors";
import {
  selectFilteredWishlist,
  selectRestaurantLocations,
} from "../store/restaurant/selectors";
import { selectUserTags } from "../store/tag/selectors";

type Props = {
  navigation: StackNavigationProp<WishlistStackParamsList, "Wishlist">;
  route: RouteProp<WishlistStackParamsList, "Wishlist">;
};

export default function WishlistScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // Create state for modal visibility
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Get tags from state
  const userTags = useSelector(selectUserTags);

  // Convert id's to string for flatlist
  const userTagsWithString = userTags.map((tag) => {
    return { ...tag, id: tag.id.toString() };
  });

  // Create state for filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  // Convert tag id's back to number
  const tagsIds = selectedTags.map((tag) => {
    return parseInt(tag);
  });

  // Get restaurants
  const filteredRestaurants = useSelector(
    selectFilteredWishlist(selectedLocations, tagsIds, search)
  );

  // Get locations
  const locations = useSelector(selectRestaurantLocations);

  // Filter modal content
  const filterModalContent = (
    <Container style={styles.modalContainer}>
      <SelectMultiple
        items={userTagsWithString}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
      />
      <SelectMultiple
        items={locations}
        selectedItems={selectedLocations}
        setSelectedItems={setSelectedLocations}
      />
      <Button
        small
        style={styles.modalButton}
        onPress={() => {
          setSelectedTags([]);
          setSelectedLocations([]);
        }}
      >
        <Text>Reset filter</Text>
      </Button>
    </Container>
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
      <Text style={styles.title}>Wishlist</Text>
      <Button
        small
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text>Filter</Text>
      </Button>
      <Header searchBar rounded style={styles.header}>
        <Item style={styles.item}>
          <Icon name="ios-search" />
          <Input
            value={search}
            onChange={onChangeInput(setSearch)}
            placeholder="Search"
          />
        </Item>
      </Header>
      {filteredRestaurants.map((restaurant) => {
        return (
          <Pressable
            key={restaurant.id}
            onPress={() =>
              navigation.navigate("WishlistDetails", {
                restaurantId: restaurant.id,
              })
            }
          >
            <RestaurantCard
              isReviewed={false}
              name={restaurant.name}
              location={restaurant.location}
              tags={restaurant.tags}
            />
          </Pressable>
        );
      })}
      <MyModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        title="Select filters"
        content={filterModalContent}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20, paddingTop: 60 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
  filterButton: { marginLeft: 5 },
  modalContainer: { width: "100%", paddingRight: 15 },
  modalButton: { marginLeft: 15, marginTop: 20 },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  item: { backgroundColor: "#e0e0e0" },
});
