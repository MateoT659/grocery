import { Recipe } from "@/build/api_types";
import { imageSources } from "@/components/feed/feed-card";
import { TAG_ICONS } from "@/components/feed/tagicons";
import SettingsButton from '@/components/settings/settings-buttons';
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { getRecipeById, patchRecipe } from "@/requests/Recipes";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";



export default function ViewPost() {
    const { id: recipe_id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = React.useState<Recipe | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [timeToPrep, setTimeToPrep] = React.useState("");
    const [timeToCook, setTimeToCook] = React.useState("");
    const [timeTotal, setTimeTotal] = React.useState("");
    const [instructions, setInstruction] = React.useState("");
  
    const badgeBackground = useThemeColor({}, "card");
    const badgeTextColor = useThemeColor({}, "text");
    
    React.useEffect(() => {
      if (!recipe_id) return;
      
      getRecipeById(recipe_id).then((data) => {
        setRecipe(data);
        setDescription(data.description);
        setTimeToPrep(String(data.timeToPrep));
        setTimeToCook(String(data.timeToCook));
        setTimeTotal(String(data.timeTotal));
        setInstruction(String(data.instructions));
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps='handled' contentContainerStyle={{ paddingBottom: 10 }}>
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

              <ThemedView style={styles.tagContainer}>
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
              </ThemedView>

              <ThemedView style={styles.timeInfo}>
                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Prep Time</ThemedText>
                  {isEditing ? (
                    <TextInput
                      value={timeToPrep}
                      onChangeText={setTimeToPrep}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                  ) : (
                    <ThemedText style={styles.timeRequired}>{timeToPrep}</ThemedText>
                  )}
                  <ThemedText>minutes</ThemedText>
                </ThemedView>

                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
                  {isEditing ? (
                    <TextInput
                      value={timeToCook}
                      onChangeText={setTimeToCook}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                  ) : (
                    <ThemedText style={styles.timeRequired}>{timeToCook}</ThemedText>
                  )}
                  <ThemedText>minutes</ThemedText>
                </ThemedView>
                <ThemedView style={styles.timeInfoSection}>
                  <ThemedText type="defaultSemiBold">Total Time</ThemedText>
                  {isEditing ? (
                    <TextInput
                      value={timeTotal}
                      onChangeText={setTimeTotal}
                      style={[styles.timeRequired, styles.timeTrack]}
                    />
                  ) : (
                    <ThemedText style={styles.timeRequired}>{timeTotal}</ThemedText>
                  )}
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
                <ThemedText type="subtitle" style={styles.subtitle}>Instructions</ThemedText>
                {isEditing ? (
                  <TextInput
                    value={instructions}
                    onChangeText={setInstruction}
                    multiline
                  />
                ) : (
                  <ThemedText>{recipe.instructions}</ThemedText>
                )}
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
                      timeToCook: Number(timeToCook),
                      timeTotal: Number(timeTotal),
                      instructions: instructions,
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
        </KeyboardAvoidingView>
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
});
