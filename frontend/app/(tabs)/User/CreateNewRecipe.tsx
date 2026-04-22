import { Recipe, CreateRecipeDto, Ingredient, RecipeIngredientWrapper, RecipeTag, RecipeTagValues, Diets, Allergies } from "@/build/api_types";
import { TAG_ICONS } from "@/components/feed/tagicons";
import SettingsButton from '@/components/settings/settings-buttons';
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { createRecipe, getRecipeById, patchRecipe } from "@/requests/Recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";
import FilterHeader from '@/components/chevron-back';
import NewRecipeButton from "@/components/create-new-recipe-button";
import getAllIngredients from "@/requests/Ingredients";
import Checkbox from "expo-checkbox";
import AllergyDietButton from "@/components/settings/settings-dietary-restrictions";
import { UserContext } from "@/contexts/user-context";

export default function ViewPost() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const currUserId = userContext.user?.id!
  
  // const { id: recipe_id } = useLocalSearchParams<{ id: string }>();
  const [recipeTitle, setRecipeTitle] = React.useState("");
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState<RecipeIngredientWrapper[]>([]);
  const [description, setDescription] = React.useState("");
  const [timeToPrep, setTimeToPrep] = React.useState("");
  const [timeToCook, setTimeToCook] = React.useState("");
  const [timeTotal, setTimeTotal] = React.useState("");
  const [instructions, setInstruction] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const[recipeTags, setRecipeTags] = React.useState<RecipeTag[]>(RecipeTagValues as unknown as RecipeTag[]);
  const[selectedRecipeTags, setSelectedRecipeTags] = React.useState<RecipeTag[]>([]);
  const[selectedDiets, setSelectedDiets] = React.useState<Diets[]>([]);
  const[selectedAllergies, setSelectedAllergies] = React.useState<Allergies[]>([]);


  const badgeBackground = useThemeColor({}, "card");
  const badgeTextColor = useThemeColor({}, "text");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const mappedIngredients = selectedIngredients.map((ingredient) => ({
    ingredientId: ingredient.ingredientId,
    ingredientDisplayName: ingredient.ingredientDisplayName,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    notes: ingredient.notes,
    optional: ingredient.optional
  }))

  React.useEffect(() => {
    getAllIngredients().then((fetchedIngredients) => {
          setIngredients(fetchedIngredients);
    });

  }, []);

  const isIngredientSelected = (ingredient: Ingredient) => {
      return selectedIngredients.some(item => item.ingredientId === ingredient.id);
  }

  const handleTapIngredient = (ingredient: Ingredient) => {
    const wrappedIngredient = convertToWrapper(ingredient)
    
    if (isIngredientSelected(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i.ingredientId !== wrappedIngredient.ingredientId));
    } 
    else {
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
      optional: false
    }
  }

  const isRecipeTagSelected = (recipeTag: RecipeTag) => {
      return selectedRecipeTags.some(tag => tag === recipeTag);
  }

  const handleTapRecipeTag = (recipeTag: RecipeTag) => {
    
    if (isRecipeTagSelected(recipeTag)) {
      setSelectedRecipeTags(selectedRecipeTags.filter(t => t !== recipeTag));
    } 
    else {
      setSelectedRecipeTags([...selectedRecipeTags, recipeTag]);
    }
  };

  const isDietSelected = (diet: Diets) => {
      return selectedDiets.some(d => d === diet);
  }

  const handleDietTap = (diet: Diets) => {  
    if (isDietSelected(diet)) {
      setSelectedDiets(selectedDiets.filter(d => d !== diet));
    } 
    else {
      setSelectedDiets([...selectedDiets, diet]);
    }    
  }

  const isAllergySelected = (allergy: Allergies) => {
      return selectedAllergies.some(a => a === allergy);
  }

  const handleAllergyTap = (allergy: Allergies) => {  
    if (isAllergySelected(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    } 
    else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }    
  }

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
    createdByUserId: currUserId
    };

    try {
      const recipeData = await createRecipe(createRecipeInput);

      console.log(currUserId)
      router.dismissAll();
      router.push(`/(tabs)/Feed/ViewPost/${recipeData.id.toString()}`);
    }
    catch (err: any) {
      setErrors({ submit: "Failed to create recipe. Please try again." });
    }
  }

  console.log("selected tags: " + selectedRecipeTags)

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps='handled' contentContainerStyle={{ paddingBottom: 10 }}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Create New Recipe</ThemedText>
            </ThemedView>
            
            <ThemedView>
                <ThemedText type='subtitle' style={styles.subtitle}>Recipe Title</ThemedText>
                <TextInput
                        value={recipeTitle}
                        onChangeText={setRecipeTitle}
                        style={styles.inputBox}
                    />
                {errors.recipeTitle && (
                  <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.recipeTitle}</ThemedText>
                )}
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle" style={styles.subtitle}>Image URL</ThemedText>
              <TextInput
                value={imageUrl}
                onChangeText={setImageUrl}
                // placeholder="Paste image URL here"
              />
            </ThemedView>
            
            <ThemedView style={styles.mainPage}>
              <ThemedView>
                <ThemedText type='subtitle' style={styles.subtitle}>Description</ThemedText>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={styles.inputBox}

                  />
                  {errors.description && (
                    <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.description}</ThemedText>
                  )}
              </ThemedView>

              {/* <ThemedView style={styles.tagContainer}>
                {recipe.tags
                  ?.filter((tag) => TAG_ICONS[tag])
                  .map((tag) => (
                    <ThemedView
                      key={tag}
                      style={[
                        styles.tagBadge,
                        { backgroundColor: badgeBackground },
                      ]}
                    >
                      <ThemedText style={{ color: badgeTextColor }}>
                        {TAG_ICONS[tag]} {tag.replaceAll("_", " ")}
                      </ThemedText>
                    </ThemedView>
                  ))}
              </ThemedView> */}

              <ThemedView style={styles.timeInfo}>
                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Prep Time</ThemedText>
                    <TextInput
                      value={timeToPrep}
                      onChangeText={setTimeToPrep}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                    {errors.timeToPrep && (
                      <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.timeToPrep}</ThemedText>
                    )}
                  <ThemedText>minutes</ThemedText>
                </ThemedView>

                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
                    <TextInput
                      value={timeToCook}
                      onChangeText={setTimeToCook}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                    {errors.timeToCook && (
                      <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.timeToCook}</ThemedText>
                    )}
                  <ThemedText>minutes</ThemedText>
                </ThemedView>
                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Total Time</ThemedText>
                    <TextInput
                      value={timeTotal}
                      onChangeText={setTimeTotal}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                    {errors.timeTotal && (
                      <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.timeTotal}</ThemedText>
                    )}
                  <ThemedText>minutes</ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  Ingredients
                </ThemedText>
                  {errors.ingredients && (
                      <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.ingredients}</ThemedText>
                  )}
                {
                  ingredients.map((ingredient) => (
                    <ThemedView key={ingredient.id} style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
                      <Checkbox
                        value={isIngredientSelected(ingredient)}
                        onValueChange={() => handleTapIngredient(ingredient)}
                        color={'rgba(43, 175, 25, 1)'}
                      />
                      <ThemedText>  {ingredient.name}</ThemedText>
                    </ThemedView>
                  ))
                }
              </ThemedView>

              <ThemedView>
                <ThemedText type="subtitle" style={styles.subtitle}>Instructions</ThemedText>
                  <TextInput
                    value={instructions}
                    onChangeText={setInstruction}
                    multiline
                  />
                  {errors.instructions && (
                    <ThemedText style={{ color: 'red', fontSize: 12 }}>{errors.instructions}</ThemedText>
                  )}
              </ThemedView>

              <ThemedView>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  Recipe Tags
                </ThemedText>

                <ThemedView style={styles.allergySection}>
                  <ThemedView style={styles.buttonGrid}>

                    <AllergyDietButton
                      title = 'Breakfast'
                      isPressed = {isRecipeTagSelected('BREAKFAST')}
                      onPress = {() => handleTapRecipeTag('BREAKFAST')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Lunch'
                      isPressed = {isRecipeTagSelected('LUNCH')}
                      onPress = {() => handleTapRecipeTag('LUNCH')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Dinner'
                      isPressed = {isRecipeTagSelected('DINNER')}
                      onPress = {() => handleTapRecipeTag('DINNER')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Dessert'
                      isPressed = {isRecipeTagSelected('DESSERT')}
                      onPress = {() => handleTapRecipeTag('DESSERT')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Comfort'
                      isPressed = {isRecipeTagSelected('COMFORT')}
                      onPress = {() => handleTapRecipeTag('COMFORT')}
                    ></AllergyDietButton>
                    
                    <AllergyDietButton
                      title = 'Healthy'
                      isPressed = {isRecipeTagSelected('HEALTHY')}
                      onPress = {() => handleTapRecipeTag('HEALTHY')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Mexican'
                      isPressed = {isRecipeTagSelected('MEXICAN')}
                      onPress = {() => handleTapRecipeTag('MEXICAN')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Spanish'
                      isPressed = {isRecipeTagSelected('SPANISH')}
                      onPress = {() => handleTapRecipeTag('SPANISH')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Colombian'
                      isPressed = {isRecipeTagSelected('COLOMBIAN')}
                      onPress = {() => handleTapRecipeTag('COLOMBIAN')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Thai'
                      isPressed = {isRecipeTagSelected('THAI')}
                      onPress = {() => handleTapRecipeTag('THAI')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Vietnamese'
                      isPressed = {isRecipeTagSelected('VIETNAMESE')}
                      onPress = {() => handleTapRecipeTag('VIETNAMESE')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Chinese'
                      isPressed = {isRecipeTagSelected('CHINESE')}
                      onPress = {() => handleTapRecipeTag('CHINESE')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Japanese'
                      isPressed = {isRecipeTagSelected('JAPANESE')}
                      onPress = {() => handleTapRecipeTag('JAPANESE')}
                    ></AllergyDietButton>
                  
                    <AllergyDietButton
                      title = 'Indian'
                      isPressed = {isRecipeTagSelected('INDIAN')}
                      onPress = {() => handleTapRecipeTag('INDIAN')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Middle Eastern'
                      isPressed = {isRecipeTagSelected('MIDDLE_EASTERN')}
                      onPress = {() => handleTapRecipeTag('MIDDLE_EASTERN')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'Italian'
                      isPressed = {isRecipeTagSelected('ITALIAN')}
                      onPress = {() => handleTapRecipeTag('ITALIAN')}
                    ></AllergyDietButton>

                    <AllergyDietButton
                      title = 'American'
                      isPressed = {isRecipeTagSelected('AMERICAN')}
                      onPress = {() => handleTapRecipeTag('AMERICAN')}
                    ></AllergyDietButton>
                  </ThemedView>
                </ThemedView>




                {/* {
                  recipeTags.map((recipeTag) => (
                    <ThemedView key={recipeTag} style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
                      <Checkbox
                        value={isRecipeTagSelected(recipeTag)}
                        onValueChange={() => handleTapRecipeTag(recipeTag)}
                        color={'rgba(43, 175, 25, 1)'}
                      />
                      <ThemedText>  {recipeTag}</ThemedText>
                    </ThemedView>
                  ))
                } */}
              </ThemedView>
      
              <NewRecipeButton
                title="Create Recipe" 
                onPress={handleCreateRecipe}
                // onPress={() => router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)}
              />

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
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15
  },
  inputBox: {
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 100,
    marginLeft: 70,
  },
  timeTrack: {
    width: 60, 
    height: 30, 
    borderWidth: 1, 
    textAlign: 'center'
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
    marginTop: 15
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
});
