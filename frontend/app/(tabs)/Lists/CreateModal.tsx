import { GroceryList, Ingredient, Recipe } from "@/build/api_types";
import CreateModalHeader from "@/components/lists/create-modal-header";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  addGroceryList,
  generateGroceryList,
  setGroceryListById,
} from "@/requests/GroceryLists";
import getAllIngredients from "@/requests/Ingredients";
import getAllRecipes from "@/requests/Recipes";
import { wrapIngredientForList } from "@/utils/Ingredient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function CreateModal() {
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
  function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
      <Pressable
        onPress={() => {
          if (recipeSeed.includes(recipe.id)) {
            setRecipeSeed(recipeSeed.filter((id) => id !== recipe.id));
          } else {
            setRecipeSeed([...recipeSeed, recipe.id]);
          }
        }}
      >
        <ThemedView
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            marginRight: 10,
            borderRadius: 8,
            backgroundColor: recipeSeed.includes(recipe.id)
              ? "#81b0ff"
              : "transparent",
          }}
        >
          <ThemedText>{recipe.name}</ThemedText>
        </ThemedView>
      </Pressable>
    );
  }
  function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
    return (
      <Pressable
        onPress={() => {
          if (ingredientPriorities.includes(ingredient.id)) {
            setIngredientPriorities(
              ingredientPriorities.filter((id) => id !== ingredient.id),
            );
          } else {
            setIngredientPriorities([...ingredientPriorities, ingredient.id]);
          }
        }}
      >
        <ThemedView
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            marginRight: 10,
            borderRadius: 8,
            backgroundColor: ingredientPriorities.includes(ingredient.id)
              ? "#81b0ff"
              : "transparent",
          }}
        >
          <ThemedText>{ingredient.name}</ThemedText>
        </ThemedView>
      </Pressable>
    );
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
      const newItem = { ingredientId: ingredient.id, checked: false };
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

  const manualEntryPage = (
    <ThemedView style={{ paddingBottom: 32 }}>
      {missedRequiredFields ? (
        <ThemedText style={{ color: "#914a4aff", padding: 10 }}>
          Please select at least one ingredient.
        </ThemedText>
      ) : null}
      {allIngredients.map((ingredient) => (
        <ThemedView
          key={ingredient.id}
          style={{ flexDirection: "row", alignItems: "center", padding: 2 }}
        >
          <ThemedText
            onPress={() => handleTapIngredient(ingredient)}
            style={{
              flex: 1,
              fontWeight: isIngredientSelected(ingredient) ? "bold" : "normal",
            }}
          >
            {ingredient.name}
            {isIngredientSelected(ingredient) ? " - " : " + "}
          </ThemedText>
        </ThemedView>
      ))}
      <TouchableOpacity
        onPress={() => setManualEnter(!manualEnter)}
        style={styles.manualInputSwapContainer}
      >
        <ThemedView style={styles.manualInputSwapButton}>
          <Ionicons name="add-outline" size={20} color="cyan" />
          <ThemedText type="defaultSemiBold" colorOverride="cyan">
            Generate a List
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.rootContainer}>
      <CreateModalHeader
        leftText={["Cancel"]}
        rightText={["Generate"]}
        onLeftPress={lastPage}
        onRightPress={nextPage}
      />
      <ThemedScrollView>
        <ThemedTextInput
          placeholder="Name*"
          placeholderTextColor={missedRequiredFields ? "#914a4aff" : "gray"}
          value={groceryList.name}
          onChangeText={(text) =>
            setGroceryList({ ...groceryList, name: text })
          }
          style={styles.textInputs}
        />
        <TabSeparator color="gray" />
        <ThemedTextInput
          placeholder="Description"
          placeholderTextColor={"gray"}
          value={groceryList.description}
          onChangeText={(text) =>
            setGroceryList({ ...groceryList, description: text })
          }
          style={styles.textInputs}
        />
        <TabSeparator color="gray" />
        {manualEnter ? (
          manualEntryPage
        ) : (
          <ThemedView style={styles.moduleContainer}>
            {/* Recipes to include */}
            <>
              <ThemedView style={styles.internalModuleContainer}>
                <ThemedText type="subtitle">Base Recipes</ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    fontStyle: "italic",
                    color: missedRequiredFields ? "#914a4aff" : textColor,
                  }}
                >
                  Choose recipes to add to the grocery list.
                </ThemedText>
              </ThemedView>

              <ScrollView style={{ maxHeight: 200 }} horizontal={true}>
                {allRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </ScrollView>
            </>

            <TabSeparator color="gray" />

            {/* Additional Recipes to generate */}
            <>
              <ThemedView style={styles.internalModuleContainer}>
                <ThemedText type="subtitle">Additional Recipes</ThemedText>
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

            <TabSeparator color="gray" />

            {/* Ingredient priorities */}

            <>
              <ThemedView style={styles.internalModuleContainer}>
                <ThemedText type="subtitle">Ingredients</ThemedText>
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
              <ScrollView style={{ maxHeight: 200 }} horizontal={true}>
                {allIngredients.map((ingredient) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </ScrollView>
            </>

            <TabSeparator color="gray" />

            <TouchableOpacity
              onPress={() => setManualEnter(!manualEnter)}
              style={styles.manualInputSwapContainer}
            >
              <ThemedView style={styles.manualInputSwapButton}>
                <Ionicons name="add-outline" size={20} color="cyan" />
                <ThemedText type="defaultSemiBold" colorOverride="cyan">
                  Choose Ingredients Manually
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: "100%",
  },
  textInputs: {
    fontSize: 18,
    padding: 10,
  },
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
