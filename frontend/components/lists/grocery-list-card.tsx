import { GroceryList } from "@/build/api_types";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";

export type GroceryListCardProps = {
  color?: string;
  groceryList?: GroceryList;
};

export default function GroceryListCard({
  groceryList,
  ...props
}: GroceryListCardProps) {
  return (
    <Link
      href={`/Lists/ViewList?id=${groceryList?.id}`}
      style={styles.container}
    >
      <ThemedView style={styles.internalContainer}>
        <ThemedView style={styles.card_body}>
          <ThemedView style={styles.right_side}>
            <ThemedText type="subtitle" style={styles.title_text}>
              {groceryList?.name}
            </ThemedText>
            <ThemedText
              style={
                groceryList?.description
                  ? styles.description_text
                  : styles.no_description_text
              }
            >
              {groceryList?.description || "No description provided."}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.footerRow}>
          <ThemedView style={styles.dateHolder}>
            <ThemedText style={{ color: "grey", fontStyle: "italic" }}>
              3/20/2026
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f2f7ff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  internalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f2f7ff",
  },
  card_body: {
    flexDirection: "row",
    backgroundColor: "#f5f2f7ff",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  right_side: {
    backgroundColor: "#f5f2f7ff",
    flex: 1,
  },
  title_text: {
    color: "black",
    marginBottom: 10,
  },
  description_text: {
    color: "black",
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
    backgroundColor: "#f5f2f7ff",
    width: "100%",
  },
  dateHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#f5f2f7ff",
  },
});
