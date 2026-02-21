import { Recipe } from "@/build/api_types";
import { imageSources } from "@/components/feed/feed-card";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { getRecipeById } from "@/requests/Recipes";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from 'react-native';

import SettingsButton from '@/components/settings/settings-buttons';
import { patchRecipe } from "@/requests/Recipes";
import { TextInput } from "react-native-paper";

export default function ViewPost() {
    const { id: recipe_id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = React.useState<Recipe | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [timeToPrep, setTimeToPrep] = React.useState("");

    
    React.useEffect(() => {
      if (!recipe_id) return;
      
      getRecipeById(recipe_id).then((data) => {
        setRecipe(data);
        setDescription(data.description);
        setTimeToPrep(String(data.timeToPrep));
        });
    }, [recipe_id]);

  if (!recipe) {
    return (
      <ThemedSafeAreaView style={styles.safeAreaContainer}>
        <ThemedText>Loading recipe...</ThemedText>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{recipe.name}</ThemedText>
        </ThemedView>
        <Image
          source={
            recipe.imageUrl
              ? { uri: recipe.imageUrl }
              : imageSources[recipe.id % imageSources.length]
          }
          style={styles.image}
        />

        <ThemedView style={styles.mainPage}>
          <ThemedView>
            <ThemedText type='subtitle' style={styles.subtitle}>Description</ThemedText>
            {isEditing ? (
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
              />
            ) : (
              <ThemedText>{recipe.description}</ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.timeInfo}>
            <ThemedView style={styles.timeInfoSection}>
              <ThemedText type="defaultSemiBold">Prep Time</ThemedText>
              <ThemedText style={styles.timeRequired}>
                {recipe.timeToPrep}
              </ThemedText>
              <ThemedText>minutes</ThemedText>
            </ThemedView>

            <ThemedView style={styles.timeInfoSection}>
              <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
              <ThemedText style={styles.timeRequired}>
                {recipe.timeToCook}
              </ThemedText>
              <ThemedText>minutes</ThemedText>
            </ThemedView>

            <ThemedView style={styles.timeInfoSection}>
              <ThemedText type="defaultSemiBold">Total Time</ThemedText>
              <ThemedText style={styles.timeRequired}>
                {recipe.timeTotal}
              </ThemedText>
              <ThemedText>minutes</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Ingredients
            </ThemedText>
            <ThemedView style={styles.stepContainer}>
              {recipe.ingredients.map((riw, index) => (
                <ThemedText key={index} style={{ fontSize: 14 }}>
                  - {riw.ingredientDisplayName}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
          <ThemedView>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Instructions
            </ThemedText>
            <ThemedView style={styles.stepContainer}>
              <ThemedText>{recipe.instructions}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.editButtons}>
            <SettingsButton
              title="Edit"
              onPress={() => setIsEditing(true)}
            />
            <SettingsButton
              title="Apply"
              onPress={async () => {
                if (!recipe) return;
                const update = {
                  description: description,
                  timeToPrep: Number(timeToPrep),
                };

                try {
                  const updatedRecipe = await patchRecipe(recipe.id, update);
                  setRecipe(updatedRecipe);
                  setIsEditing(false);
                } catch (error) {
                  console.error("Failed to update recipe:", error);
                }
              }}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "auto",
  },
  scrollContainer: {
    height: "100%",
    margin: 15,
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
  stepContainer: {},
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
  
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 100,
    marginLeft: 70,
  }

});
