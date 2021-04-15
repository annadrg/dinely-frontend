import {
  Container,
  Form,
  Item as FormItem,
  Label,
  Input,
  Button,
  Text,
  Spinner,
  Content,
  Textarea,
} from "native-base";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { onChangeInput, showToast } from "../functions";
import { selectAppLoading } from "../store/appState/selectors";
import { addRestaurant, updateRestaurant } from "../store/restaurant/actions";
import { selectUserTags } from "../store/tag/selectors";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddImages from "../components/AddImages";
import SelectTags from "../components/SelectTags";
import { AddStackParamsList } from "../navigations/types";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import MyHeader from "../components/MyHeader";

type Props = {
  navigation: NavigationProp<AddStackParamsList, "AddReview">;
  route: RouteProp<AddStackParamsList, "AddReview">;
};

export default function AddReviewScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // Get parameters from route
  const wishlistId = route.params?.id;
  const wishlistName = route.params?.name;
  const wishlistLocation = route.params?.location;
  const wishlistTags = route.params?.tags;

  // Ignore virtualized list warning
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // Get tags from state
  const userTags = useSelector(selectUserTags);

  // Convert id's to string for flatlist
  const userTagsWithString = userTags.map((tag) => {
    return { ...tag, id: tag.id.toString() };
  });

  // Get loading from state
  const isLoading = useSelector(selectAppLoading);

  // Today
  const today = new Date();

  // Create states for input fields
  const [name, setName] = useState<string>(wishlistName || "");
  const [location, setLocation] = useState<string>(wishlistLocation || "");
  const [rating, setRating] = useState<number>(0);
  const [dateVisited, setDateVisited] = useState<Date>(today);
  const [priceCategory, setPriceCategory] = useState<number>(0);
  const [tags, setTags] = useState<string[]>(wishlistTags || []);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [image1, setImage1] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");

  // Convert tag id's back to number
  const tagsIds = tags.map((tag) => {
    return parseInt(tag);
  });

  // Handle add restaurant
  const onSubmitClick = () => {
    if (!name || !location || !rating) {
      showToast("Please fill in name, city and rating", 6000, "danger", "Okay");
    } else {
      wishlistId
        ? dispatch(
            updateRestaurant(wishlistId, {
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
          )
        : dispatch(
            addRestaurant({
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
      setName("");
      setLocation("");
      setRating(0);
      setDateVisited(today);
      setPriceCategory(0);
      setAdditionalInfo("");
      setImage1("");
      setImage2("");
      setImage3("");
      setTags([]);
    }
  };

  // Create price button for given price category
  const priceButton = (priceCat: number) => {
    return (
      <Button
        dark
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
      <MyHeader title="Add review" goBack={navigation.goBack} />
      <Container style={styles.flexContainer}>
        <Content style={styles.container}>
          <Form>
            <FormItem stackedLabel>
              <Label style={styles.label}>Restaurant name</Label>
              <Input value={name} onChange={onChangeInput(setName)} />
            </FormItem>
            <FormItem stackedLabel>
              <Label style={styles.label}>City</Label>
              <Input value={location} onChange={onChangeInput(setLocation)} />
            </FormItem>
          </Form>
          <Text style={styles.customLabel}>Visited on</Text>
          <DateTimePicker
            style={styles.date}
            mode="date"
            maximumDate={new Date()}
            display="spinner"
            textColor="black"
            value={dateVisited}
            onChange={(e, selected) => {
              const date = selected || new Date();
              setDateVisited(date);
            }}
          />
          <Text style={styles.customLabel}>Rating</Text>
          <Rating
            startingValue={rating}
            onFinishRating={setRating}
            style={styles.starRating}
          />
          <Text style={styles.customLabel}>Price category</Text>
          <Container style={styles.priceContainer}>
            {priceButton(1)}
            {priceButton(2)}
            {priceButton(3)}
            {priceButton(4)}
          </Container>
          <Text style={styles.customLabel}>Tags</Text>
          <SelectTags
            allTags={userTagsWithString}
            selectedTags={tags}
            setSelectedTags={setTags}
          />

          <Text style={styles.customLabel}>Pictures</Text>
          <AddImages
            image1={image1}
            setImage1={setImage1}
            image2={image2}
            setImage2={setImage2}
            image3={image3}
            setImage3={setImage3}
          />

          <Form style={styles.textarea}>
            <Label style={styles.label}>Additional info</Label>
            <Textarea
              rowSpan={5}
              bordered
              value={additionalInfo}
              onChange={onChangeInput(setAdditionalInfo)}
            />
          </Form>

          <Button dark onPress={onSubmitClick} style={styles.button}>
            <Text>Save review</Text>
          </Button>
        </Content>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, paddingRight: 20 },
  flexContainer: { flex: 5 },
  containerSpinner: { alignItems: "center", justifyContent: "center", flex: 1 },
  button: { paddingBottom: 4, alignSelf: "center", marginVertical: 20 },
  customLabel: {
    marginLeft: 15,
    marginTop: 20,
    color: "#727272",
    fontSize: 15,
  },
  label: { color: "#727272", fontSize: 15 },
  starRating: {
    paddingTop: 15,
    paddingBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  date: { marginLeft: 15, marginTop: 5 },
  priceContainer: {
    flexDirection: "row",
    height: 50,
    marginLeft: 15,
    marginTop: 10,
  },
  priceButton: { marginRight: 2 },
  selectedPriceButton: { backgroundColor: "#c33d2e", marginRight: 2 },
  textarea: { marginLeft: 15, marginTop: 20 },
});
