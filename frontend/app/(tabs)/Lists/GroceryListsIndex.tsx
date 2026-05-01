import { GroceryList } from "@/build/api_types";
import CreateGroceryListCard from "@/components/lists/create-grocery-list-card";
import GroceryListCard from "@/components/lists/grocery-list-card";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import getAllGroceryLists from "@/requests/GroceryLists";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const [groceryLists, setGroceryLists] = useState<GroceryList[]>([]);

  useEffect(() => {
    getAllGroceryLists().then((lists) => {
      setGroceryLists(lists.sort((a, b) => b.id - a.id));
    });
  }, []);

  function updateGroceryLists() {
    getAllGroceryLists().then((lists) => {
      setGroceryLists(lists.sort((a, b) => b.id - a.id));
    });
  }

  useFocusEffect(() => {
    updateGroceryLists();
  });

  return groceryLists.length === 0 ? (
    <ThemedView
      style={[
        styles.rootContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ThemedText type="defaultItalic">Loading...</ThemedText>
    </ThemedView>
  ) : (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery Lists</ThemedText>
        <ThemedView
          style={{
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <CreateGroceryListCard />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        {groceryLists.map((list) => (
          <GroceryListCard key={list.id} groceryList={list} color={"gray"} />
        ))}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: "100%",
    padding: 32,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingVertical: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 24,
  },
});
