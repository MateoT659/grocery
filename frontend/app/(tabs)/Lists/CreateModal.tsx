import { GroceryList, Ingredient, Recipe } from "@/build/api_types";
import CreateModalHeader from "@/components/lists/create-modal-header";
import SelectableChip from "@/components/settings/selectable-chip";
import SelectableChipListHolder from "@/components/settings/selectable-chip-list";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemePalette } from "@/hooks/get-theme-color";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  addGroceryList,
  generateGroceryList,
  setGroceryListById,
} from "@/requests/GroceryLists";
import getAllIngredients from "@/requests/Ingredients";
import getAllRecipes from "@/requests/Recipes";
import { wrapIngredientForList } from "@/utils/Ingredient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function CreateModal() {
  const theme = useThemePalette();
  const DEFAULT_GROCERY_LIST: GroceryList = {
    id: -1,
    name: "",
    description: "",
    items: [],
    recipes: [],
  };
  const [groceryList, setGroceryList] =
    React.useState<GroceryList>(DEFAULT_GROCERY_LIST);
  const [nRecipes, setNRecipes] = React.useState<number>(0);
  const router = useRouter();

  const [selectedIngredients, setSelectedIngredients] = React.useState<
    Ingredient[]
  >([]);

  const [missedRequiredFields, setMissedRequiredFields] =
    React.useState<boolean>(false);

  const [manualEnter, setManualEnter] = React.useState<boolean>(false);

  const [recipeSeed, setRecipeSeed] = React.useState<number[]>([]);

  const [ingredientPriorities, setIngredientPriorities] = React.useState<
    number[]
  >([]);

  const [allRecipes, setAllRecipes] = React.useState<Recipe[]>([]);
  const [allIngredients, setAllIngredients] = React.useState<Ingredient[]>([]);

  const textColor = useThemeColor({}, "text");

  function isRecipeSelected(recipe: Recipe) {
    return recipeSeed.includes(recipe.id);
  }

  function handleTapRecipe(recipe: Recipe) {
    if (recipeSeed.includes(recipe.id)) {
      setRecipeSeed(recipeSeed.filter((id) => id !== recipe.id));
    } else {
      setRecipeSeed([...recipeSeed, recipe.id]);
    }
  }

  function isIngredientPrioritySelected(ingredient: Ingredient) {
    return ingredientPriorities.includes(ingredient.id);
  }
  function handleTapIngredientPriority(ingredient: Ingredient) {
    if (ingredientPriorities.includes(ingredient.id)) {
      setIngredientPriorities(
        ingredientPriorities.filter((id) => id !== ingredient.id),
      );
    } else {
      setIngredientPriorities([...ingredientPriorities, ingredient.id]);
    }
  }

  useEffect(() => {
    getAllIngredients().then((fetchedIngredients) => {
      setAllIngredients(
        fetchedIngredients.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        }),
      );
    });
    getAllRecipes().then((fetchedRecipes) => {
      setAllRecipes(fetchedRecipes);
    });
  }, []);

  const handleTapIngredient = (ingredient: Ingredient) => {
    if (isIngredientSelected(ingredient)) {
      handleRemoveIngredient(ingredient);
    } else {
      handleAddIngredient(ingredient);
    }
  };

  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some((item) => item.id === ingredient.id);
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    const existingItem = groceryList.items.find(
      (item) => item.ingredientId === ingredient.id,
    );
    if (!existingItem) {
      setGroceryList({
        ...groceryList,
        items: [...groceryList.items, wrapIngredientForList(ingredient)],
      });
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setGroceryList({
      ...groceryList,
      items: groceryList.items.filter(
        (item) => item.ingredientId !== ingredient.id,
      ),
    });
    setSelectedIngredients(
      selectedIngredients.filter((item) => item.id !== ingredient.id),
    );
  };

  const nextPage = () => {
    setMissedRequiredFields(false);
    if (!groceryList.name) {
      setMissedRequiredFields(true);
      return;
    }

    if (manualEnter && groceryList.items.length == 0) {
      setMissedRequiredFields(true);
      return;
    }

    if (!manualEnter && recipeSeed.length == 0) {
      setMissedRequiredFields(true);
      return;
    }

    if (!manualEnter && (nRecipes < 0 || isNaN(nRecipes))) {
      setMissedRequiredFields(true);
      return;
    }

    generateGroceryList(
      nRecipes,
      groceryList,
      recipeSeed,
      ingredientPriorities,
    ).then((response) => {
      if (!response.success) {
        //failed to generate grocery list : just add the ingredients
        console.log("failure: ", response.message);
        addGroceryList(groceryList).then((response) => {
          if (!response.success) {
            console.log("Failed to create grocery list:", response.message);
            router.back();
            return;
          }

          router.back();
          router.push(`/Lists/ViewList?id=${response.newGroceryList.id}`);
        });
      } else {
        //generated grocery list : add additoinal ingredients

        const generatedList: GroceryList = response.generatedGroceryList;

        generatedList.items = generatedList.items.filter(
          (item) =>
            !(
              item.fromRecipesIds == null &&
              generatedList.items.some(
                (selectedItem) =>
                  selectedItem.ingredientId === item.ingredientId &&
                  selectedItem.fromRecipesIds != item.fromRecipesIds,
              )
            ),
        );

        setGroceryListById(generatedList.id.toString(), generatedList).then(
          (response) => {
            if (!response.success) {
              console.log(
                "Failed to update grocery list with selected ingredients:",
                response.message,
              );
              router.back();
              return;
            }
            router.back();
            router.push(`/Lists/ViewList?id=${generatedList.id}`);
          },
        );
      }
    });
  };

  const lastPage = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.rootContainer}>
      <CreateModalHeader
        leftText={["Cancel"]}
        rightText={["Generate"]}
        onLeftPress={lastPage}
        onRightPress={nextPage}
      />
      <ThemedText type="subtitle" style={{ alignSelf: "center", padding: 12 }}>
        Generate a Grocery List
      </ThemedText>

      <TabSeparator></TabSeparator>

      <ThemedScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ThemedTextInput
          placeholder="Name*"
          placeholderTextColor={
            missedRequiredFields ? theme.errorMessage : "gray"
          }
          value={groceryList.name}
          onChangeText={(text) =>
            setGroceryList({ ...groceryList, name: text })
          }
          style={styles.textInputs}
        />
        <ThemedTextInput
          placeholder="Description"
          placeholderTextColor={"gray"}
          multiline
          value={groceryList.description}
          onChangeText={(text) =>
            setGroceryList({ ...groceryList, description: text })
          }
          style={styles.textInputs}
        />
        <TabSeparator color="gray" />
        <ThemedView style={styles.moduleContainer}>
          {/* Ingredients to Include */}
          <ThemedText type="subtitle" style={{ padding: 12, paddingBottom: 0 }}>
            Starting Your List
          </ThemedText>
          <>
            <ThemedView style={styles.internalModuleContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={{ textDecorationLine: "underline" }}
              >
                Ingredients
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontStyle: "italic",
                  color: missedRequiredFields ? theme.errorMessage : textColor,
                }}
              >
                Choose ingredients to add to the grocery list.
              </ThemedText>
            </ThemedView>

            <SelectableChipListHolder nCols={4}>
              {allIngredients.map((ingredient) => (
                <SelectableChip
                  key={ingredient.id}
                  title={ingredient.name}
                  isPressed={isIngredientSelected(ingredient)}
                  onPress={() => handleTapIngredient(ingredient)}
                  selectedIcon={"checkbox-marked-outline"}
                  unselectedIcon={"checkbox-blank-outline"}
                />
              ))}
            </SelectableChipListHolder>
          </>
          {/* Recipes to include */}
          <>
            <ThemedView style={styles.internalModuleContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={{ textDecorationLine: "underline" }}
              >
                Recipes
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontStyle: "italic",
                  color: missedRequiredFields ? theme.errorMessage : textColor,
                }}
              >
                Choose recipes to add to the grocery list.
              </ThemedText>
            </ThemedView>

            <SelectableChipListHolder nCols={4}>
              {allRecipes.map((recipe) => (
                <SelectableChip
                  key={recipe.id}
                  title={recipe.name}
                  isPressed={isRecipeSelected(recipe)}
                  onPress={() => handleTapRecipe(recipe)}
                />
              ))}
            </SelectableChipListHolder>
          </>

          <TabSeparator color="gray" />
          <ThemedText type="subtitle" style={{ padding: 12, paddingBottom: 0 }}>
            Optimizing Your List
          </ThemedText>
          {/* Additional Recipes to generate */}
          <>
            <ThemedView style={styles.internalModuleContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={{ textDecorationLine: "underline" }}
              >
                Additional Recipes
              </ThemedText>
              <ThemedText type="default" style={{ fontStyle: "italic" }}>
                (Optional) Specify how many additional recipes to generate.
                Recipes will be generated based on ingredients in the recipes
                chosen above to minimize cost.
              </ThemedText>
            </ThemedView>

            <ThemedTextInput
              keyboardType="number-pad"
              placeholder="Number of Additional Recipes"
              placeholderTextColor={"gray"}
              value={nRecipes == 0 ? "" : nRecipes.toString()}
              onChangeText={(text) =>
                setNRecipes(isNaN(Number(text)) ? 0 : Number(text))
              }
              style={styles.textInputs}
            />
          </>

          {/* Ingredient priorities */}

          <>
            <ThemedView style={styles.internalModuleContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={{ textDecorationLine: "underline" }}
              >
                Prioritized Ingredients
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontStyle: "italic",
                }}
              >
                (Optional) Choose ingredients to prioritize overlap of in the
                grocery list.
              </ThemedText>
            </ThemedView>
            <SelectableChipListHolder nCols={4}>
              {allIngredients.map((ingredient) => (
                <SelectableChip
                  key={ingredient.id}
                  title={ingredient.name}
                  isPressed={isIngredientPrioritySelected(ingredient)}
                  onPress={() => handleTapIngredientPriority(ingredient)}
                />
              ))}
            </SelectableChipListHolder>
          </>

          <TabSeparator color="gray" />
        </ThemedView>
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: "100%",
  },
  textInputs: {},
  moduleContainer: {
    gap: 10,
  },
  manualInputSwapContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  manualInputSwapButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderColor: "cyan",
    borderWidth: 1,
    borderRadius: 99,
    padding: 12,
  },
  internalModuleContainer: {
    padding: 10,
  },
});
