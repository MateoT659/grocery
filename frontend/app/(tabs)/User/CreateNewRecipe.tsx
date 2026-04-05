import { Recipe, CreateRecipeDto, Ingredient, RecipeIngredientWrapper, RecipeTag, RecipeTagValues, Diets, Allergies } from "@/build/api_types";
import { imageSources } from "@/components/feed/feed-card";
import { TAG_ICONS } from "@/components/feed/tagicons";
import SettingsButton from '@/components/settings/settings-buttons';
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { createRecipe, getRecipeById, patchRecipe } from "@/requests/Recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";
import FilterHeader from '@/components/chevron-back';
import NewRecipeButton from "@/components/create-new-recipe-button";
import getAllIngredients from "@/requests/Ingredients";
import Checkbox from "expo-checkbox";
import AllergyDietButton from "@/components/settings/settings-dietary-restrictions";

export default function ViewPost() {
  const router = useRouter();
  
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
  
  const mappedIngredients = selectedIngredients.map((ingredient) => ({
    ingredientId: ingredient.ingredientId,
    ingredientDisplayName: ingredient.ingredientDisplayName,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    notes: ingredient.notes,
    optional: ingredient.optional
  }))

  const createRecipeInput: CreateRecipeDto = {
    name: recipeTitle,
    imageUrl,
    timeToPrep,
    timeToCook,
    timeTotal,
    description,
    ingredients: mappedIngredients,
    instructions,
  };

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
    console.log("called backend")

    try {
      const recipeData = await createRecipe(createRecipeInput);

      console.log("called backend")
      
      router.push(`/(tabs)/Feed/ViewPost/${recipeData.id.toString()}`);
    }
    catch (err: any) {
      console.log(err)
    }
  }

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
                  <ThemedText>minutes</ThemedText>
                </ThemedView>

                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
                    <TextInput
                      value={timeToCook}
                      onChangeText={setTimeToCook}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                  <ThemedText>minutes</ThemedText>
                </ThemedView>
                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Total Time</ThemedText>
                    <TextInput
                      value={timeTotal}
                      onChangeText={setTimeTotal}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                  <ThemedText>minutes</ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  Ingredients
                </ThemedText>
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
                </ThemedView>

              <ThemedView>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  Recipe Tags
                </ThemedText>
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


              <ThemedView style={styles.allergySection}>
                <ThemedText >Add an Allergy</ThemedText>
      
                <ThemedView style={styles.buttonGrid}>
                  <AllergyDietButton
                    title = 'Eggs'
                    isPressed = {isAllergySelected('EGGS')}
                    onPress = {() => handleAllergyTap('EGGS')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Shellfish'
                    isPressed = {isAllergySelected('SHELLFISH')}
                    onPress = {() => handleAllergyTap('SHELLFISH')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Fish'
                    isPressed = {isAllergySelected('FISH')}
                    onPress = {() => handleAllergyTap('FISH')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Soybeans'
                    isPressed = {isAllergySelected('SOYBEANS')}
                    onPress = {() => handleAllergyTap('SOYBEANS')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Tree Nuts'
                    isPressed = {isAllergySelected('TREE_NUTS')}
                    onPress = {() => handleAllergyTap('TREE_NUTS')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Sesame Seeds'
                    isPressed = {isAllergySelected('SESAME_SEEDS')}
                    onPress = {() => handleAllergyTap('SESAME_SEEDS')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Peanuts'
                    isPressed = {isAllergySelected('PEANUTS')}
                    onPress = {() => handleAllergyTap('PEANUTS')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Dairy'
                    isPressed = {isAllergySelected('DAIRY')}
                    onPress = {() => handleAllergyTap('DAIRY')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Lactose'
                    isPressed = {isAllergySelected('LACTOSE')}
                    onPress = {() => handleAllergyTap('LACTOSE')}
                  ></AllergyDietButton>
      
                </ThemedView>
                  
              </ThemedView>
      
              <ThemedView style={styles.allergySection}>
              
                <ThemedText>Add a Dietary Restriction</ThemedText>
                
                <ThemedView style={styles.buttonGrid}>
                  <AllergyDietButton
                    title = 'Vegetarian'
                    isPressed = {isDietSelected('VEGETARIAN')}
                    onPress = {() => handleDietTap('VEGETARIAN')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Vegan'
                    isPressed = {isDietSelected('VEGAN')}
                    onPress = {() => handleDietTap('VEGAN')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Pescatarian'
                    isPressed = {isDietSelected('PESCATARIAN')}
                    onPress = {() => handleDietTap('PESCATARIAN')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Halal'
                    isPressed = {isDietSelected('HALAL')}
                    onPress = {() => handleDietTap('HALAL')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Kosher'
                    isPressed = {isDietSelected('KOSHER')}
                    onPress = {() => handleDietTap('KOSHER')}
                  ></AllergyDietButton>
      
                  <AllergyDietButton
                    title = 'Gluten Free'
                    isPressed = {isDietSelected('GLUTEN_FREE')}
                    onPress = {() => handleDietTap('GLUTEN_FREE')}
                  ></AllergyDietButton>           
      
              </ThemedView>

              <ThemedView style={styles.allergySection}>

                <ThemedText >Add a Recipe Tag</ThemedText>
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

              <NewRecipeButton
                title="Create Recipe" 
                onPress={handleCreateRecipe}
                // onPress={() => router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)}
              />
              </ThemedView>

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
