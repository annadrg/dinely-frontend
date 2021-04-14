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
  Content,
} from "native-base";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal";
import SelectMultiple from "../components/SelectMultiple";
import RestaurantCard from "../components/RestaurantCard";
import { onChangeInput } from "../functions";
import { ReviewsStackParamsList } from "../navigations/types";
import { selectAppLoading } from "../store/appState/selectors";
import {
  selectFilteredReviews,
  selectRestaurantLocations,
} from "../store/restaurant/selectors";
import { selectUserTags } from "../store/tag/selectors";

type Props = {
  navigation: StackNavigationProp<ReviewsStackParamsList, "Reviews">;
};

export default function ReviewsScreen({ navigation }: Props) {
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
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedPriceCategories, setSelectedPriceCategories] = useState<
    string[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("DateAdded");

  // Convert tag id's back to number
  const tagsIds = selectedTags.map((tag) => {
    return parseInt(tag);
  });

  // Get restaurants
  const filteredRestaurants = useSelector(
    selectFilteredReviews(
      selectedLocations,
      tagsIds,
      selectedRatings,
      selectedPriceCategories,
      search,
      sortBy
    )
  );

  // Get locations
  const locations = useSelector(selectRestaurantLocations);

  // Create list of ratings for filter
  const listOfRatings = [
    { id: "1", name: "1 star" },
    { id: "2", name: "2 stars" },
    { id: "3", name: "3 stars" },
    { id: "4", name: "4 stars" },
    { id: "5", name: "5 stars" },
  ];

  // Create list of price categories for filter
  const listOfPriceCategories = [
    { id: "1", name: "€" },
    { id: "2", name: "€€" },
    { id: "3", name: "€€€" },
    { id: "4", name: "€€€€" },
  ];

  // Filter modal content
  const filterModalContent = (
    <Content contentContainerStyle={styles.modalContainer}>
      <Text style={styles.label}>Tags</Text>
      <SelectMultiple
        items={userTagsWithString}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
      />
      <Text style={styles.label}>Location</Text>
      <SelectMultiple
        items={locations}
        selectedItems={selectedLocations}
        setSelectedItems={setSelectedLocations}
      />
      <Text style={styles.label}>Rating</Text>
      <SelectMultiple
        items={listOfRatings}
        selectedItems={selectedRatings}
        setSelectedItems={setSelectedRatings}
      />
      <Text style={styles.label}>Price category</Text>
      <SelectMultiple
        items={listOfPriceCategories}
        selectedItems={selectedPriceCategories}
        setSelectedItems={setSelectedPriceCategories}
      />
      <Button
        small
        style={styles.modalButton}
        onPress={() => {
          setSelectedTags([]);
          setSelectedLocations([]);
          setSelectedRatings([]);
          setSelectedPriceCategories([]);
        }}
      >
        <Text>Reset filter</Text>
      </Button>
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
      <Text style={styles.title}>Reviews</Text>
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
      <Item style={styles.sortByContainer}>
        <Text style={{ fontSize: 12 }}>Sort by:</Text>
        <Button
          small
          style={styles.sortButton}
          onPress={() => setSortBy("Rating")}
        >
          <Text
            style={
              sortBy === "Rating"
                ? styles.sortButtonTextSelected
                : styles.sortButtonText
            }
          >
            Rating
          </Text>
        </Button>

        <Text>|</Text>

        <Button
          small
          style={styles.sortButton}
          onPress={() => setSortBy("DateVisited")}
        >
          <Text
            style={
              sortBy === "DateVisited"
                ? styles.sortButtonTextSelected
                : styles.sortButtonText
            }
          >
            Date visited
          </Text>
        </Button>

        <Text>|</Text>

        <Button
          small
          style={styles.sortButton}
          onPress={() => setSortBy("DateAdded")}
        >
          <Text
            style={
              sortBy === "DateAdded"
                ? styles.sortButtonTextSelected
                : styles.sortButtonText
            }
          >
            Date added
          </Text>
        </Button>
      </Item>
      <Content>
        {filteredRestaurants.length ? (
          filteredRestaurants.map((restaurant) => {
            return (
              <Pressable
                key={restaurant.id}
                onPress={() =>
                  navigation.navigate("ReviewDetails", {
                    restaurantId: restaurant.id,
                  })
                }
              >
                <RestaurantCard
                  isReviewed
                  name={restaurant.name}
                  location={restaurant.location}
                  tags={restaurant.tags}
                  rating={restaurant.rating}
                />
              </Pressable>
            );
          })
        ) : (
          <Container style={styles.textContainer}>
            <Text>No restaurants</Text>
          </Container>
        )}
      </Content>
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
  container: { padding: 10, paddingTop: 60 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  filterButton: { marginLeft: 5 },
  modalContainer: { width: 350, paddingRight: 15 },
  modalButton: { marginLeft: 15, marginTop: 20 },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  item: { backgroundColor: "#e0e0e0" },
  label: { marginLeft: 15, marginTop: 20, color: "#727272", fontSize: 15 },
  sortButton: { backgroundColor: "transparent", padding: 0 },
  sortButtonText: { color: "black" },
  sortButtonTextSelected: { color: "black", fontWeight: "bold" },
  sortByContainer: {
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
    justifyContent: "center",
  },
});
