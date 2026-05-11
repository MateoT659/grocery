import { GroceryList } from "@/build/api_types";
import CheckList from "@/components/lists/check-list";
import ThemedButton from "@/components/themed/themed-button";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemePalette } from "@/hooks/get-theme-color";
import {
  deleteGroceryListById,
  getGroceryListById,
  setGroceryListById,
} from "@/requests/GroceryLists";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function ViewList() {
  const route = useRoute();
  const theme = useThemePalette();
  const router = useRouter();
  const urlParams = new URLSearchParams(route.params as Record<string, string>);
  const groceryListId = urlParams.get("id");
  const [groceryList, setGroceryList] = React.useState<GroceryList | null>(
    null,
  );

  React.useEffect(() => {
    getGroceryListById(groceryListId || "").then((list) => {
      setGroceryList(list);
    });
  }, [groceryListId, setGroceryList]);

  function showDeleteConfirmation() {
    Alert.alert(
      "Delete Grocery List",
      "Are you sure you want to delete this grocery list? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: handleDeleteList },
      ],
    );
  }

  function handleDeleteList() {
    if (groceryListId) {
      deleteGroceryListById(groceryListId).then((response) => {
        if (!response.success) {
          console.log("Failed to delete grocery list:", response.message);
          return;
        }
        router.back();
      });
    }
  }

  function handleCrossOffChange(crossedOff: boolean, ingredientId: number) {
    if (!groceryList) return;

    const items = groceryList.items;
    const itemIndex = items.findIndex(
      (item) => item.ingredientId === ingredientId,
    );
    if (itemIndex !== -1) {
      items[itemIndex].checked = crossedOff;
    }

    const newGroceryList = { ...groceryList, items: items };

    setGroceryListById(groceryList?.id.toString() || "", newGroceryList).then(
      (response) => {
        if (!response.success) {
          console.log("Failed to update grocery list:", response.message);
        }
      },
    );

    setGroceryList(newGroceryList);
  }

  return groceryList ? (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedView style={{ marginBottom: 24 }}>
        <ThemedText type="title">{groceryList.name}</ThemedText>
        <ThemedText
          type={groceryList.description ? "default" : "defaultItalic"}
        >
          {groceryList.description || "No description provided."}
        </ThemedText>
      </ThemedView>

      <CheckList
        list={groceryList}
        handleCrossOffChange={handleCrossOffChange}
      />

      <View style={styles.deleteButton}>
        <ThemedButton
          mode="contained"
          onPress={showDeleteConfirmation}
          color={theme.negativeButton}
        >
          <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="trash-outline" size={20} color="white" />
            <ThemedText type="defaultSemiBold" colorOverride="white">
              Delete List
            </ThemedText>
          </View>
        </ThemedButton>
      </View>
    </ThemedScrollView>
  ) : (
    <ThemedView
      style={[
        styles.rootContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ThemedText style={{ fontSize: 18 }}>Loading...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 32,
  },
  listTitle: {
    fontWeight: "bold",
  },
  listDescription: {
    fontSize: 18,
    marginBottom: 16,
  },
  noListDescription: {
    fontSize: 18,
    marginBottom: 16,
    fontStyle: "italic",
    color: "grey",
  },
  deleteButton: {
    alignItems: "center",
    marginVertical: 16,
  },
  itemContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
});
