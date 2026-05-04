import { GroceryList, ListIngredientWrapper } from "@/build/api_types";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";

export default function CheckList(props: {
  list: GroceryList;
  handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void;
}) {
  const CheckListItem = (itemProps: {
    item: ListIngredientWrapper;
    handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void;
  }) => {
    const textcolor = useThemeColor({}, "text");
    return (
      <ThemedView style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            itemProps.handleCrossOffChange(
              !itemProps.item.checked,
              itemProps.item.ingredientId,
            )
          }
        >
          <ThemedView style={styles.itemContainerTop}>
            <Feather
              name={itemProps.item.checked ? "check-square" : "square"}
              color={textcolor}
              size={16}
              style={{ marginTop: 4 }}
            />
            <ThemedText
              style={[
                {
                  textDecorationLine: itemProps.item.checked
                    ? "line-through"
                    : "none",
                  color: itemProps.item.checked ? "gray" : textcolor,
                },
              ]}
            >
              {itemProps.item.ingredientDisplayName}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        {itemProps.item.fromRecipesIds &&
          itemProps.item.fromRecipesIds.length > 0 && (
            <ThemedText type="smallItalic">
              Used in{" "}
              {props.list.recipes
                .filter((recipe) =>
                  itemProps.item.fromRecipesIds.includes(recipe.recipeId),
                )
                .map((recipe) => recipe.recipeName)
                .join(", ")}
            </ThemedText>
          )}
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.listContainer}>
      {props.list.items.map((item, index) => {
        return (
          <CheckListItem
            key={index}
            item={item}
            handleCrossOffChange={props.handleCrossOffChange}
          />
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 8,
  },
  itemContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 8,
  },
  itemContainerTop: {
    flexDirection: "row",
    gap: 10,
  },
  listDescription: {
    fontSize: 18,
  },
});
