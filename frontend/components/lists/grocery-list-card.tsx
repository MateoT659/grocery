import { GroceryList } from "@/build/api_types";
import { useThemePalette } from "@/hooks/get-theme-color";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed/themed-text";

export type GroceryListCardProps = {
  color?: string;
  groceryList?: GroceryList;
};

export default function GroceryListCard({
  groceryList,
  ...props
}: GroceryListCardProps) {
  const theme = useThemePalette();
  return (
    <Link
      href={`/Lists/ViewList?id=${groceryList?.id}`}
      style={[styles.container, { backgroundColor: theme.card }]}
    >
      <View style={[styles.internalContainer]}>
        <View style={styles.card_body}>
          <View style={styles.right_side}>
            <ThemedText type="subtitle">{groceryList?.name}</ThemedText>
            <ThemedText
              type={groceryList?.description ? "default" : "defaultItalic"}
              colorOverride="black"
            >
              {groceryList?.description || "No description provided."}
            </ThemedText>
          </View>
        </View>
        <View style={styles.footerRow}>
          <View style={styles.dateHolder}>
            <ThemedText type="smallItalic">
              {Math.round(Math.random() * 12)}/{Math.round(Math.random() * 28)}
              /2026
            </ThemedText>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  internalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  right_side: {
    flex: 1,
  },
  description_text: {
    flexWrap: "wrap",
  },
  no_description_text: {
    color: "grey",
    fontStyle: "italic",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    width: "100%",
  },
  dateHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignSelf: "flex-start",
  },
});
