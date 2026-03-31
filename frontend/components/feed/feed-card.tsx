import { Recipe } from "@/build/api_types";
import { UserContext } from "@/contexts/user-context";
import { updateUserFields } from "@/requests/Users";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";
import { TAG_ICONS } from "./tagicons";
import { useThemeColor } from "@/hooks/use-theme-color";

type FeedCardProps = {
  recipe: Recipe;
  isFavRecipe: boolean;
  onPress: () => void;
  // id: number;
};

export const imageSources = [
  require("@/assets/images/arayes.png"),
  require("@/assets/images/arroz.jpeg"),
  require("@/assets/images/ribs.jpg"),
  require("@/assets/images/bbqchick.jpeg"),
];

export default function FeedCard({
  onPress,
  recipe,
  isFavRecipe,
}: FeedCardProps) {
  const userContext = useContext(UserContext);

  const [likedRecipe, setLikedRecipe] = useState(isFavRecipe ?? false);
  const badgeBackground = useThemeColor({}, "card");
  const badgeTextColor = useThemeColor({}, "text");

  const handleLikeRecipe = async (recipeId: number) => {
    setLikedRecipe(!likedRecipe);

    const currentLikedRecipes = userContext?.user?.likedRecipes ?? [];

    let updatedLikedRecipes: number[];

    if (currentLikedRecipes.includes(recipeId)) {
      updatedLikedRecipes = currentLikedRecipes.filter((r) => r !== recipeId);
    } else {
      updatedLikedRecipes = [...currentLikedRecipes, recipeId];
    }

    const updatedLikedRecipesBackend = await updateUserFields(
      userContext.user?.id,
      { likedRecipes: updatedLikedRecipes },
    );
    userContext?.updateUserField("likedRecipes", updatedLikedRecipes);
  };

  return (
    <Pressable style={styles.feed_card} onPress={onPress}>
      <ThemedView style={styles.card_body}>
        <ThemedView style={styles.right_side}>
          <ThemedText type="subtitle" style={styles.title_text}>
            {recipe?.name}
          </ThemedText>
          <ThemedText style={styles.description_text}>
            {recipe?.description}
          </ThemedText>
        </ThemedView>
        <Image
          source={
            recipe.imageUrl
              ? { uri: recipe.imageUrl }
              : imageSources[recipe.id % imageSources.length]
          }
          style={styles.image}
        />
      </ThemedView>
      <ThemedView style={styles.footerRow}>
      <ThemedView style={styles.tagContainer}>
          {recipe.tags
            ?.filter(tag => TAG_ICONS[tag])
            .map(tag => (
              <ThemedView
                key={tag}
                style={[
                  styles.tagBadge,
                  { backgroundColor: "#f5f2f7ff" }
                ]}
              >
                <ThemedText style={{ color: badgeTextColor }}>
                  {TAG_ICONS[tag]}
                </ThemedText>
              </ThemedView>
            ))}
        </ThemedView>
        <Pressable onPress={() => handleLikeRecipe(recipe?.id)}>
          <Ionicons
            name={likedRecipe ? "heart" : "heart-outline"}
            size={40}
            color={likedRecipe ? "#a11b1b" : "black"}
          />
        </Pressable>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  feed_card: {
    backgroundColor: "#f5f2f7ff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  card_body: {
    flexDirection: "row",
    backgroundColor: "#f5f2f7ff",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  right_side: {
    backgroundColor: "#f5f2f7ff",
    flex: 1,
  },
  title_text: {
    color: "black",
    marginBottom: 10,
  },
  description_text: {
    color: "black",
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
    backgroundColor: "#f5f2f7ff",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    backgroundColor: "#f5f2f7ff",
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
    backgroundColor: "#f5f2f7ff",
  },
});
