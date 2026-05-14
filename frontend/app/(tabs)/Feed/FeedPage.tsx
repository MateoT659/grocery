import { Recipe } from "@/build/api_types";
import FeedCard from "@/components/feed/feed-card";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { FilterContext } from "@/contexts/filter-context";
import { UserContext } from "@/contexts/user-context";
import { filterRecipesForFeed, getRecipeRecs } from "@/requests/Recipes";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

export default function FeedPage() {
  const userContext = useContext(UserContext);
  const filterContext = useContext(FilterContext);

  let favRecipeIds = userContext?.user?.likedRecipes;

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();
  const [filteredRecipes, setFilteredRecipes] = React.useState<Recipe[]>([]);

  //Shukria- added the diet and allergy logic to the filter function
  React.useEffect(() => {
    // Fetch recommended recipes for the logged-in user
    if (!userContext?.user) return;

    getRecipeRecs(userContext.user).then((data) => {
      setRecipes(data);
      setFilteredRecipes(data);
    });
  }, [userContext?.user]);

  React.useEffect(() => {
    // Clear filtered recipes if no recipes exist
    if (recipes.length === 0) {
      setFilteredRecipes([]);
      return;
    }

    const applyFilters = async () => {
      let result = recipes;

      // backend filters diets + allergies
      if (
        filterContext.includedDiets.length > 0 ||
        filterContext.excludedAllergies.length > 0
      ) {
        result = await filterRecipesForFeed(
          recipes,
          filterContext.includedDiets,
          filterContext.excludedAllergies,
        );
      }

      // frontend filters tags
      if (filterContext.filters.length > 0) {
        result = result.filter((recipe) =>
          recipe.tags?.some((tag) => filterContext.filters.includes(tag)),
        );
      }

      setFilteredRecipes(result);
    };

    // Apply filters whenever filters or recipes change
    applyFilters();
  }, [
    recipes,
    filterContext.filters,
    filterContext.includedDiets,
    filterContext.excludedAllergies,
  ]);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedText type="title" style={{ padding: 8, paddingTop: 0 }}>
        Feed Page
      </ThemedText>
      <ThemedView style={styles.recipeFeed}>
        {filteredRecipes.length == 0 ? (
          <ThemedText>
            No recipes found with selected filters. Please modify your filter
            choices and try again.
          </ThemedText>
        ) : Array.isArray(filteredRecipes) ? (
          filteredRecipes.map((recipe) => (
            <FeedCard
              key={recipe.id}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/Feed/ViewPost/[id]",
                  params: { id: recipe.id.toString() },
                })
              }
              recipe={recipe}
              isFavRecipe={favRecipeIds?.includes(recipe.id) ? true : false}
            ></FeedCard>
          ))
        ) : (
          <ThemedText type="defaultItalic">
            No Recipes with your allergies.
          </ThemedText>
        )}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
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
