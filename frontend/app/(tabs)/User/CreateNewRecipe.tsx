import {
  Allergies,
  CreateRecipeDto,
  Diets,
  Ingredient,
  Recipe,
  RecipeIngredientWrapper,
  RecipeTag,
  RecipeTagValues,
} from "@/build/api_types";
import FilterHeader from "@/components/chevron-back";
import SelectableChip from "@/components/settings/selectable-chip";
import SelectableChipListHolder from "@/components/settings/selectable-chip-list";
import ThemedButton from "@/components/themed/themed-button";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import { useThemePalette } from "@/hooks/get-theme-color";
import getAllIngredients from "@/requests/Ingredients";
import { createRecipe } from "@/requests/Recipes";
import { toDisplayCase } from "@/utils/ToDisplayCase";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ViewPost() {
  const router = useRouter();
  const theme = useThemePalette();
  const userContext = useContext(UserContext);
  const currUserId = userContext.user?.id!;

  // const { id: recipe_id } = useLocalSearchParams<{ id: string }>();
  const [recipeTitle, setRecipeTitle] = React.useState("");
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    RecipeIngredientWrapper[]
  >([]);
  const [description, setDescription] = React.useState("");
  const [timeToPrep, setTimeToPrep] = React.useState("");
  const [timeToCook, setTimeToCook] = React.useState("");
  const [timeTotal, setTimeTotal] = React.useState("");
  const [instructions, setInstruction] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [recipeTags, setRecipeTags] = React.useState<RecipeTag[]>(
    RecipeTagValues as unknown as RecipeTag[],
  );
  const [selectedRecipeTags, setSelectedRecipeTags] = React.useState<
    RecipeTag[]
  >([]);
  const [selectedDiets, setSelectedDiets] = React.useState<Diets[]>([]);
  const [selectedAllergies, setSelectedAllergies] = React.useState<Allergies[]>(
    [],
  );

  const badgeBackground = useThemeColor({}, "card");
  const badgeTextColor = useThemeColor({}, "text");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const mappedIngredients = selectedIngredients.map((ingredient) => ({
    ingredientId: ingredient.ingredientId,
    ingredientDisplayName: ingredient.ingredientDisplayName,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    notes: ingredient.notes,
    optional: ingredient.optional,
  }));

  React.useEffect(() => {
    getAllIngredients().then((fetchedIngredients) => {
      setIngredients(
        fetchedIngredients.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        }),
      );
    });
  }, []);

  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some(
      (item) => item.ingredientId === ingredient.id,
    );
  };

  const handleTapIngredient = (ingredient: Ingredient) => {
    const wrappedIngredient = convertToWrapper(ingredient);

    if (isIngredientSelected(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter(
          (i) => i.ingredientId !== wrappedIngredient.ingredientId,
        ),
      );
    } else {
      setSelectedIngredients([...selectedIngredients, wrappedIngredient]);
    }
  };

  const convertToWrapper = (ingredient: Ingredient) => {
    return {
      ingredientId: ingredient.id,
      ingredientDisplayName: ingredient.name,
      quantity: 1,
      unit: ingredient.unit,
      notes: "",
      optional: false,
    };
  };

  const isRecipeTagSelected = (recipeTag: RecipeTag) => {
    return selectedRecipeTags.some((tag) => tag === recipeTag);
  };

  const handleTapRecipeTag = (recipeTag: RecipeTag) => {
    if (isRecipeTagSelected(recipeTag)) {
      setSelectedRecipeTags(selectedRecipeTags.filter((t) => t !== recipeTag));
    } else {
      setSelectedRecipeTags([...selectedRecipeTags, recipeTag]);
    }
  };

  const isDietSelected = (diet: Diets) => {
    return selectedDiets.some((d) => d === diet);
  };

  const handleDietTap = (diet: Diets) => {
    if (isDietSelected(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  const isAllergySelected = (allergy: Allergies) => {
    return selectedAllergies.some((a) => a === allergy);
  };

  const handleCreateRecipe = async () => {
    console.log(currUserId)

    const newErrors: Record<string, string> = {};
    
    if (!recipeTitle.trim()){
      newErrors.recipeTitle = "Recipe title is required.";
    }

    if (!description.trim()){
      newErrors.description = "Description is required.";
    }

    const prepNum = Number(timeToPrep);
    if (!timeToPrep || isNaN(prepNum) || prepNum <= 0){
      newErrors.timeToPrep = "Enter a valid prep time.";
    }

    const cookNum = Number(timeToCook);
    if(!timeToCook || isNaN(cookNum) || cookNum <= 0){
      newErrors.timeToCook = "Enter a valid cook time.";
    }

    const totalNum = Number(timeTotal);
    if(!timeTotal || isNaN(totalNum) || totalNum <= 0){
      newErrors.timeTotal = "Enter a valid total time.";
    }

    if(selectedIngredients.length == 0){
      newErrors.ingredients = "Select at least one ingredient.";
    }

    if (!instructions.trim()) {
    newErrors.instructions = "Instructions are required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    const createRecipeInput: CreateRecipeDto = {
      name: recipeTitle,
      imageUrl,
      timeToPrep,
      timeToCook,
      timeTotal,
      description,
      ingredients: mappedIngredients,
      instructions,
      tags: selectedRecipeTags,
      createdByUserId: currUserId,
    };

    try {
      const recipeData = await createRecipe(createRecipeInput);

      console.log(currUserId)
      router.dismissAll();
      router.push(`/(tabs)/Feed/ViewPost/${recipeData.id.toString()}`);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Create New Recipe</ThemedText>
          </ThemedView>

          <ThemedView>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Recipe Title
            </ThemedText>
            <ThemedTextInput
              value={recipeTitle}
              onChangeText={setRecipeTitle}
              style={styles.inputBox}
            />
          </ThemedView>

          <ThemedView>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Image URL
            </ThemedText>
            <ThemedTextInput
              value={imageUrl}
              onChangeText={setImageUrl}
              // placeholder="Paste image URL here"
            />
          </ThemedView>

          <ThemedView style={styles.mainPage}>
            <ThemedView>
              <ThemedText type="subtitle" style={styles.subtitle}>
                Description
              </ThemedText>
              <ThemedTextInput
                value={description}
                onChangeText={setDescription}
                multiline
                style={styles.inputBox}
              />
            </ThemedView>

            <ThemedView style={styles.timeInfo}>
              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Prep Time (m)</ThemedText>
                <ThemedTextInput
                  value={timeToPrep}
                  onChangeText={setTimeToPrep}
                  style={[styles.timeRequired, styles.timeTrack]}
                />
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Cook Time (m)</ThemedText>
                <ThemedTextInput
                  value={timeToCook}
                  onChangeText={setTimeToCook}
                  style={[styles.timeRequired, styles.timeTrack]}
                />
              </ThemedView>
              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Total Time (m)</ThemedText>
                <ThemedTextInput
                  value={timeTotal}
                  onChangeText={setTimeTotal}
                  style={[styles.timeRequired, styles.timeTrack]}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle" style={styles.subtitle}>
                Ingredients
              </ThemedText>
              <SelectableChipListHolder nCols={4}>
                {ingredients.map((ingredient) => (
                  <SelectableChip
                    key={ingredient.id}
                    title={ingredient.name}
                    onPress={() => handleTapIngredient(ingredient)}
                    isPressed={isIngredientSelected(ingredient)}
                  />
                ))}
              </SelectableChipListHolder>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle" style={styles.subtitle}>
                Instructions
              </ThemedText>
              <ThemedTextInput
                value={instructions}
                onChangeText={setInstruction}
                multiline
              />
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle" style={styles.subtitle}>
                Recipe Tags
              </ThemedText>
              <SelectableChipListHolder nCols={0}>
                {RecipeTagValues.map((value) => (
                  <SelectableChip
                    key={value}
                    title={toDisplayCase(value)}
                    isPressed={isRecipeTagSelected(value)}
                    onPress={() => handleTapRecipeTag(value)}
                  ></SelectableChip>
                ))}
              </SelectableChipListHolder>
            </ThemedView>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <ThemedButton
                onPress={handleCreateRecipe}
                color={theme.positiveButton}
              >
                Create New Recipe
              </ThemedButton>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    margin: 15,
  },
  keyboardContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  mainPage: {
    gap: 20,
  },
  timeInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  timeInfoSection: {
    display: "flex",
    alignItems: "center",
  },
  timeRequired: {
    fontSize: 20,
  },
  subtitle: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputBox: {
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 100,
    marginLeft: 70,
  },
  timeTrack: {
    width: 60,
    height: 30,
    textAlign: "center",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tagBadge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
  },
  allergySection: {
    marginTop: 15,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
