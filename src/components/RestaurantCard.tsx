import React from "react";
import { Card, CardItem, Body, Text, Icon, Button } from "native-base";
import { Tag } from "../store/tag/types";
import { StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

type Props = {
  isReviewed: boolean;
  name: string;
  location: string;
  tags: Tag[];
  rating?: number | null;
};

export default function RestaurantCard({
  name,
  location,
  tags,
  rating,
  isReviewed,
}: Props) {
  return (
    <Card style={styles.card}>
      <CardItem style={styles.header} header>
        <Text style={styles.title}>{name}</Text>
      </CardItem>
      <CardItem style={styles.footer}>
        <Body>
          <Text style={styles.subtitle}>
            <Icon name="location" style={styles.icon} /> {location}
          </Text>
        </Body>
      </CardItem>
      <CardItem style={styles.footer}>
        <Body style={styles.tagBody}>
          {tags.map((tag) => {
            return (
              <Button
                small
                key={tag.id}
                style={{
                  backgroundColor:
                    tag.color !== "#ffffff" ? tag.color : "#000000",
                  borderRadius: 30,
                  marginRight: 2,
                }}
              >
                <Text style={{ color: "#ffffff" }}>{tag.name}</Text>
              </Button>
            );
          })}
        </Body>
      </CardItem>
      {isReviewed && (
        <CardItem style={styles.footer}>
          <Rating
            readonly
            startingValue={rating || 0}
            imageSize={30}
            style={styles.rating}
          />
        </CardItem>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 0,
  },
  footer: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
  title: { fontWeight: "bold", fontSize: 22 },
  subtitle: { fontWeight: "200", fontSize: 18 },
  icon: { color: "#727272", fontSize: 18 },
  tagBody: { flexDirection: "row" },
  rating: { marginBottom: 15 },
});
