import { ReactElement } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "../themed/themed-view";

type SelectableChipListProps = {
  children: ReactElement[];
  nCols?: number;
};

export default function SelectableChipListHolder({
  children,
  nCols = 2,
}: SelectableChipListProps) {
  const data = [];

  if (nCols == 0) {
    return <ThemedView style={styles.wrapStyle}>{children}</ThemedView>;
  }

  while (children.length > 0) {
    data.push(children.splice(0, nCols));
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container]}
      data={data}
      renderItem={(child) => {
        return (
          <ThemedView style={styles.columnContainer}>{child.item}</ThemedView>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 10,
  },
  wrapStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  columnContainer: { gap: 10 },
});
