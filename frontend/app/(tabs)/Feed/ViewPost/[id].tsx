import { Recipe } from "@/build/api_types";
import FilterHeader from "@/components/chevron-back";
// import { imageSources } from "@/components/feed/feed-card";
// import { imageSources } from "@/components/feed/feed-card";
import { TAG_ICONS } from "@/components/feed/tagicons";
import SettingsButton from "@/components/settings/settings-buttons";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { getRecipeById, patchRecipe } from "@/requests/Recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ViewPost() {
  const { id: recipe_id, from } = useLocalSearchParams<{
    id: string;
    from?: string;
  }>();
  const router = useRouter();

  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [timeToPrep, setTimeToPrep] = React.useState("");
  const [timeToCook, setTimeToCook] = React.useState("");
  const [timeTotal, setTimeTotal] = React.useState("");
  const [instructions, setInstruction] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const badgeBackground = useThemeColor({}, "card");
  const badgeTextColor = useThemeColor({}, "text");

  React.useEffect(() => {
    if (!recipe_id) return;

    getRecipeById(recipe_id).then((data) => {
      setRecipe(data);
      setName(data.name);
      setDescription(data.description);
      setTimeToPrep(String(data.timeToPrep));
      setTimeToCook(String(data.timeToCook));
      setTimeTotal(String(data.timeTotal));
      setInstruction(String(data.instructions));
      setImageUrl(String(data.imageUrl));
    });
  }, [recipe_id]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  if (!recipe) {
    return (
      <ThemedSafeAreaView style={styles.safeAreaContainer}>
        <ThemedText>Loading recipe...</ThemedText>
      </ThemedSafeAreaView>
    );
  }

  const ViewPageEditing = (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader onBack={handleBack} />
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
            <ThemedTextInput value={name} onChangeText={setName} />
          </ThemedView>

          <Image
            source={
              imageUrl
                ? { uri: recipe.imageUrl }
                : require("../../../../assets/images/No_Image_Available.jpg") /*imageSources[recipe.id % imageSources.length]*/
            }
            style={styles.image}
          />

          <ThemedView style={styles.mainPage}>
            <ThemedView>
              <ThemedText type="subtitle">Image URL</ThemedText>
              <ThemedTextInput
                value={imageUrl}
                multiline
                onChangeText={setImageUrl}
                placeholder="Paste image URL here"
              />
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle">Description</ThemedText>
              <ThemedTextInput
                value={description}
                onChangeText={setDescription}
                multiline
              />
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
                <ThemedTextInput
                  value={timeToPrep}
                  onChangeText={setTimeToPrep}
                  style={[styles.timeTrack]}
                />
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
                <ThemedTextInput
                  value={timeToCook}
                  onChangeText={setTimeToCook}
                  style={[styles.timeTrack]}
                />
              </ThemedView>
              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Total Time</ThemedText>
                <ThemedTextInput
                  value={timeTotal}
                  onChangeText={setTimeTotal}
                  style={[styles.timeTrack]}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle">Ingredients</ThemedText>
              <ThemedView style={styles.stepContainer}>
                {recipe.ingredients.map((riw, index) => (
                  <ThemedText key={index}>
                    - {riw.ingredientDisplayName}
                  </ThemedText>
                ))}
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle">Instructions</ThemedText>
              <ThemedTextInput
                value={instructions}
                onChangeText={setInstruction}
                multiline
              />
            </ThemedView>

            <ThemedView style={styles.editButtons}>
              <SettingsButton
                title="Stop Editing"
                onPress={() => setIsEditing(false)}
              />
              <SettingsButton
                title="Apply"
                onPress={async () => {
                  if (!recipe) return;
                  const update = {
                    name: name,
                    description: description,
                    timeToPrep: Number(timeToPrep),
                    timeToCook: Number(timeToCook),
                    timeTotal: Number(timeTotal),
                    instructions: instructions,
                    imageUrl: imageUrl,
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

  return isEditing ? (
    ViewPageEditing
  ) : (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader onBack={handleBack} />
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
            <ThemedText type="title">{recipe.name}</ThemedText>
          </ThemedView>

          <Image
            source={
              imageUrl
                ? { uri: recipe.imageUrl }
                : require("../../../../assets/images/No_Image_Available.jpg") /*imageSources[recipe.id % imageSources.length]*/
            }
            style={styles.image}
          />

          <ThemedView style={styles.mainPage}>
            <ThemedView>
              <ThemedText type="subtitle">Description</ThemedText>
              <ThemedText>{recipe.description}</ThemedText>
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
                <ThemedText>{timeToPrep}m</ThemedText>
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Cook Time</ThemedText>
                <ThemedText>{timeToCook}m</ThemedText>
              </ThemedView>

              <ThemedView style={styles.timeInfoSection}>
                <ThemedText type="defaultSemiBold">Total Time</ThemedText>
                <ThemedText>{timeTotal}m</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle">Ingredients</ThemedText>
              <ThemedView style={styles.stepContainer}>
                {recipe.ingredients.map((riw, index) => (
                  <ThemedText key={index}>
                    - {riw.ingredientDisplayName}
                  </ThemedText>
                ))}
              </ThemedView>
            </ThemedView>

            <ThemedView>
              <ThemedText type="subtitle">Instructions</ThemedText>
              <ThemedText style={styles.stepContainer}>
                {recipe.instructions}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.editButtons}>
              <SettingsButton title="Edit" onPress={() => setIsEditing(true)} />
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
  stepContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  editButtons: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    gap: 16,
    flexDirection: "row",
  },
  timeTrack: {
    width: 60,
    height: 30,
    borderWidth: 1,
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
});
