import React from "react";
import { StyleSheet } from "react-native";
import MultiSelect from "react-native-multiple-select";

type Props = {
  items: any[];
  selectedItems: any[];
  setSelectedItems: (items: any[]) => void;
};

export default function SelectMultiple({
  items,
  selectedItems,
  setSelectedItems,
}: Props) {
  return (
    <MultiSelect
      items={items}
      uniqueKey="id"
      selectedItems={selectedItems}
      onSelectedItemsChange={setSelectedItems}
      styleMainWrapper={styles.multiSelect}
      searchInputStyle={styles.multiSelectSearch}
      tagBorderColor="#727272"
      tagRemoveIconColor="#727272"
      tagTextColor="#727272"
      submitButtonText="Select"
      styleItemsContainer={styles.multiSelectItemContainer}
      styleRowList={styles.multiSelectItem}
    />
  );
}

const styles = StyleSheet.create({
  multiSelect: { marginLeft: 15 },
  multiSelectSearch: { height: 50 },
  multiSelectItemContainer: { height: 120 },
  multiSelectItem: { padding: 6 },
});
