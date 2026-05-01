import { Recipe } from "@/build/api_types";
import FilterHeader from "@/components/chevron-back";
import FeedCard from "@/components/feed/feed-card";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import getAllRecipes from "@/requests/Recipes";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

export default function FavoritesPage() {
  const userContext = useContext(UserContext);

  let favRecipeIds = userContext?.user?.likedRecipes;

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const recipesData = getAllRecipes();
    recipesData.then((data) => setRecipes(data));
  }, []);

  const favRecipes = recipes.filter((recipe) =>
    favRecipeIds?.includes(recipe.id),
  );

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <ThemedScrollView style={styles.rootContainer}>
        <ThemedText type="title">Favorite Recipes</ThemedText>

        <ThemedView style={styles.recipeFeed}>
          {favRecipes.length === 0 ? (
            <ThemedText type="defaultItalic">
              You don't have any favorite recipes yet! Liked recipes will appear
              here.
            </ThemedText>
          ) : (
            <ThemedText type="subtitle">
              Your Favorites ({favRecipes.length})
            </ThemedText>
          )}

          {favRecipes.map((recipe) => (
            <FeedCard
              key={recipe.id}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/User/ViewPost/[id]",
                  params: { id: recipe.id.toString() },
                })
              }
              recipe={recipe}
              isFavRecipe={favRecipeIds?.includes(recipe.id) ? true : false}
            ></FeedCard>
          ))}
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
  },
  rootContainer: {
    flex: 1,
    padding: 32,
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  recipeFeed: {
    gap: 25,
  },
});
