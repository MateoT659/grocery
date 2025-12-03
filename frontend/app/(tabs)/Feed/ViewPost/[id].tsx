import { Recipe } from "@/build/api_types";
import { imageSources } from "@/components/feed/feed-card";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { getRecipeById } from "@/requests/Recipes";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from 'react-native';


export default function ViewPost() {
    const { id: recipe_id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = React.useState<Recipe | null>(null);
    
    React.useEffect(() => {
      if (!recipe_id) return;
      
      getRecipeById(recipe_id).then(data => setRecipe(data))
    }, [recipe_id]);

    if (!recipe) {
        return <ThemedText>Loading recipe...</ThemedText>
    }

    return (
      <ThemedSafeAreaView style={styles.safeAreaContainer}>
        <ScrollView style={styles.scrollContainer}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type='title'>{recipe.name}</ThemedText>
          </ThemedView>
          <Image source={imageSources[recipe.id % 4]} style={styles.image} />

          <ThemedView style={styles.mainPage}>
            <ThemedView>
              <ThemedText type='subtitle' style={styles.subtitle}>Description</ThemedText>
              <ThemedText>{recipe.description}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.timeInfo}>
              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type='defaultSemiBold'>Prep Time</ThemedText>
                <ThemedText style={styles.timeRequired}>15</ThemedText>
                <ThemedText>minutes</ThemedText>
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type='defaultSemiBold'>Cook Time</ThemedText>
                <ThemedText style={styles.timeRequired}>25</ThemedText>
                <ThemedText>minutes</ThemedText>
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type='defaultSemiBold'>Total Time</ThemedText>
                <ThemedText style={styles.timeRequired}>40</ThemedText>
                <ThemedText>minutes</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type='subtitle' style={styles.subtitle}>Ingredients</ThemedText>
                <ThemedView style={styles.stepContainer}>
                  {recipe.ingredients.map((riw, index) => (
                    <ThemedText key={index} style={{fontSize: 14}}>
                      - {riw.ingredientDisplayName}
                    </ThemedText>
                  ))}
                </ThemedView>
            </ThemedView>

          </ThemedView>
        </ScrollView>
      </ThemedSafeAreaView>
      
    )

}


const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
  },
  scrollContainer: {
    height: '100%',
    margin: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  mainPage: {
    gap: 20
  },
  timeInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  timeInfoSection: {
    display: 'flex',
    alignItems: 'center'
  },
  timeRequired: {
    fontSize: 20
  },
  stepContainer: {
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15
  }

})