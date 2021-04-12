import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import AddTagModal from "./AddTagModal";
import MultiSelect from "react-native-multiple-select";

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
      <MultiSelect
        items={allTags}
        uniqueKey="id"
        selectedItems={selectedTags}
        onSelectedItemsChange={setSelectedTags}
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

      <AddTagModal visible={addModalVisible} setVisible={setAddModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  multiSelect: { marginLeft: 15 },
  multiSelectSearch: { height: 50 },
  multiSelectItemContainer: { height: 120 },
  multiSelectItem: { padding: 6 },
  tagButton: { marginLeft: 15, backgroundColor: "#727272", marginTop: 10 },
});
