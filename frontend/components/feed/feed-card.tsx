import { Recipe } from "@/build/api_types";
import { UserContext } from "@/contexts/user-context";
import { useThemePalette } from "@/hooks/get-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { TAG_ICONS } from "./tagicons";

type FeedCardProps = {
  recipe: Recipe;
  isFavRecipe: boolean;
  onPress: () => void;
};

export default function FeedCard({
  onPress,
  recipe,
  isFavRecipe,
}: FeedCardProps) {
  const userContext = useContext(UserContext);
  const theme = useThemePalette();

  // add/remove recipe from liked recipes when the heart button is clicked
  const handleLikeRecipe = async (recipeId: number) => {

    const currentLikedRecipes = userContext?.user?.likedRecipes ?? [];

    let updatedLikedRecipes: number[];

    if (currentLikedRecipes.includes(recipeId)) {
      updatedLikedRecipes = currentLikedRecipes.filter((r) => r !== recipeId);
    } else {
      updatedLikedRecipes = [...currentLikedRecipes, recipeId];
    }

    userContext.updateUserField("likedRecipes", updatedLikedRecipes);
  };

  return (
    <Pressable
      style={[styles.feed_card, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      <View style={styles.card_body}>
        <View style={styles.right_side}>
          <ThemedText type="subtitle" style={styles.title_text}>
            {recipe?.name}
          </ThemedText>
          <ThemedText style={styles.description_text}>
            {recipe?.description}
          </ThemedText>
        </View>
        <Image
          source={
            recipe.imageUrl
              ? { uri: recipe.imageUrl }
              : require("../../assets/images/No_Image_Available.jpg")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.footerRow}>
        <View style={styles.tagContainer}>
          {recipe.tags
            ?.filter((tag) => TAG_ICONS[tag])
            .map((tag) => (
              <View
                key={tag}
                style={[styles.tagBadge, { backgroundColor: theme.darkCard }]}
              >
                <ThemedText style={{ color: theme.text }}>
                  {TAG_ICONS[tag]}
                </ThemedText>
              </View>
            ))}
        </View>
        <Pressable onPress={() => handleLikeRecipe(recipe?.id)}>
          <Ionicons
            name={isFavRecipe ? "heart" : "heart-outline"}
            size={40}
            color={isFavRecipe ? "#c42b2b" : theme.icon}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  feed_card: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  card_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  right_side: {
    flex: 1,
  },
  title_text: {
    marginBottom: 10,
  },
  description_text: {
    flexWrap: "wrap",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  icons: {
    marginTop: 10,
    display: "flex",
    alignItems: "flex-end",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tagBadge: {
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
