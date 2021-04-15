import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import AddTagModal from "./AddTagModal";
import SelectMultiple from "./SelectMultiple";

type Tag = {
  id: string;
  name: string;
  color?: string;
};

type Props = {
  allTags: Tag[];
  selectedTags: string[];
  setSelectedTags: (items: string[]) => void;
};

export default function SelectTags({
  allTags,
  selectedTags,
  setSelectedTags,
}: Props) {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  return (
    <>
      <SelectMultiple
        items={allTags}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
      />

      <Button
        small
        style={styles.tagButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text>Create new tag</Text>
      </Button>

      <AddTagModal visible={addModalVisible} setVisible={setAddModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  tagButton: { marginLeft: 15, backgroundColor: "#727272", marginTop: 10 },
});
