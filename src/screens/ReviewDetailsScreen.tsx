import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
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
  Footer,
  Textarea,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, LogBox, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyModal from "../components/MyModal";
import SelectTags from "../components/SelectTags";
import { onChangeInput, showToast } from "../functions";
import { ReviewsStackParamsList } from "../navigations/types";
import { selectAppLoading } from "../store/appState/selectors";
import {
  deleteRestaurant,
  updateRestaurant,
} from "../store/restaurant/actions";
import { selectSpecificRestaurant } from "../store/restaurant/selectors";
import { selectUserTags } from "../store/tag/selectors";
import ShowImages from "../components/ShowImages";
import AddImages from "../components/AddImages";

type Props = {
  navigation: StackNavigationProp<ReviewsStackParamsList, "ReviewDetails">;
  route: RouteProp<ReviewsStackParamsList, "ReviewDetails">;
};

export default function ReviewDetailsScreen({ navigation, route }: Props) {
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

  // Today
  const today = new Date();

  // Create states for input fields
  const [name, setName] = useState<string>(restaurant?.name || "");
  const [location, setLocation] = useState<string>(restaurant?.location || "");
  const [tags, setTags] = useState<string[]>(tagIds || []);
  const [rating, setRating] = useState<number>(restaurant?.rating || 0);
  const [dateVisited, setDateVisited] = useState<Date>(
    new Date(restaurant?.dateVisited || today) || today
  );
  const [priceCategory, setPriceCategory] = useState<number>(
    restaurant?.priceCategory || 0
  );
  const [additionalInfo, setAdditionalInfo] = useState<string>(
    restaurant?.additionalInfo || ""
  );
  const [image1, setImage1] = useState<string>(restaurant?.image1 || "");
  const [image2, setImage2] = useState<string>(restaurant?.image2 || "");
  const [image3, setImage3] = useState<string>(restaurant?.image3 || "");

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
          rating,
          dateVisited,
          priceCategory,
          additionalInfo,
          image1,
          image2,
          image3,
          tags: tagsIds,
          isReviewed: true,
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

  // Create price button for given price category
  const priceButton = (priceCat: number) => {
    return (
      <Button
        style={
          priceCategory === priceCat
            ? styles.selectedPriceButton
            : styles.priceButton
        }
        onPress={() => {
          priceCategory === priceCat
            ? setPriceCategory(0)
            : setPriceCategory(priceCat);
        }}
      >
        <Text>{"€".repeat(priceCat)}</Text>
      </Button>
    );
  };

  // Edit modal content
  const editModalContent = (
    <Content style={styles.modalContainer}>
      <Form>
        <FormItem stackedLabel>
          <Label style={styles.inputLabel}>Restaurant name</Label>
          <Input value={name} onChange={onChangeInput(setName)} />
        </FormItem>
        <FormItem stackedLabel>
          <Label style={styles.inputLabel}>Location</Label>
          <Input value={location} onChange={onChangeInput(setLocation)} />
        </FormItem>
        <Text style={styles.label}>Visited on</Text>
        <DateTimePicker
          style={styles.date}
          mode="date"
          maximumDate={new Date()}
          value={dateVisited}
          onChange={(e, selected) => {
            const date = selected || new Date();
            setDateVisited(date);
          }}
        />
        <Text style={styles.multiSelectLabel}>Tags</Text>
        <SelectTags
          allTags={userTagsWithString}
          selectedTags={tags}
          setSelectedTags={setTags}
        />

        <Text style={styles.label}>Rating</Text>
        <Rating
          startingValue={rating}
          onFinishRating={setRating}
          style={styles.starRating}
        />
        <Text style={styles.label}>Price category</Text>
        <Container style={styles.priceContainer}>
          {priceButton(1)}
          {priceButton(2)}
          {priceButton(3)}
          {priceButton(4)}
        </Container>
        <Text style={styles.label}>Tags</Text>
        <SelectTags
          allTags={userTagsWithString}
          selectedTags={tags}
          setSelectedTags={setTags}
        />

        <Text style={styles.label}>Pictures</Text>
        <AddImages
          image1={image1}
          setImage1={setImage1}
          image2={image2}
          setImage2={setImage2}
          image3={image3}
          setImage3={setImage3}
        />

        <Form style={styles.textarea}>
          <Label style={styles.mainLabel}>Additional info</Label>
          <Textarea
            rowSpan={5}
            bordered
            value={additionalInfo}
            onChange={onChangeInput(setAdditionalInfo)}
          />
        </Form>

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
      <Rating
        readonly
        startingValue={restaurant?.rating || 0}
        style={styles.starRating}
      />
      <Container style={styles.textContainer}>
        {restaurant?.dateVisited ? (
          <>
            <Text style={styles.mainLabel}>Visited on</Text>
            <Text>{moment(restaurant?.dateVisited).format("DD-MM-YY")}</Text>
          </>
        ) : null}
        {restaurant?.priceCategory ? (
          <>
            <Text style={styles.mainLabel}>Price category</Text>
            <Text> {"€".repeat(restaurant?.priceCategory || 1)}</Text>
          </>
        ) : null}
        {restaurant?.additionalInfo ? (
          <>
            <Text style={styles.mainLabel}>Additional info</Text>
            <Text>{restaurant?.additionalInfo}</Text>
          </>
        ) : null}
      </Container>
      {restaurant?.image1 || restaurant?.image2 || restaurant?.image3 ? (
        <>
          <Text style={styles.label}>Pictures</Text>
          <ShowImages
            image1={restaurant?.image1 || ""}
            image2={restaurant?.image2 || ""}
            image3={restaurant?.image3 || ""}
          />
        </>
      ) : null}
      <Footer style={styles.footer}>
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
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20, paddingBottom: 0 },
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
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: { marginRight: 0 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  button: { marginRight: 5 },
  reviewButton: { backgroundColor: "#ffce0a", marginRight: 5 },
  multiSelectLabel: {
    marginLeft: 15,
    marginTop: 30,
    color: "#727272",
    fontSize: 15,
  },
  label: { color: "#727272", fontSize: 15, marginLeft: 15, marginTop: 15 },
  inputLabel: { color: "#727272", fontSize: 15 },
  mainLabel: { color: "#727272", fontSize: 15, marginTop: 10 },
  modalContainer: { width: 350, paddingRight: 20 },
  modalButton: {
    paddingBottom: 4,
    alignSelf: "center",
    marginVertical: 20,
    marginLeft: 10,
  },
  starRating: {
    paddingTop: 15,
    paddingBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  textContainer: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 150,
  },
  priceButton: { marginRight: 2 },
  selectedPriceButton: { backgroundColor: "tomato", marginRight: 2 },
  textarea: { marginLeft: 15, marginTop: 20 },
  priceContainer: {
    flexDirection: "row",
    height: 50,
    marginLeft: 15,
    marginTop: 10,
  },
  date: { marginLeft: 15, marginTop: 5 },
});
