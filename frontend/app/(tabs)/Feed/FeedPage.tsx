import { Recipe } from "@/build/api_types";
import FeedCard from "@/components/feed/feed-card";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { FilterContext } from "@/contexts/filter-context";
import { UserContext } from "@/contexts/user-context";
import { getRecipeRecs } from "@/requests/Recipes";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

export default function FeedPage() {
  const userContext = useContext(UserContext);
  const filterContext = useContext(FilterContext);

  let favRecipeIds = userContext?.user?.likedRecipes;

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    if (!userContext?.user) return;
    
    const recipesData = getRecipeRecs(userContext?.user);
    recipesData.then(data => setRecipes(data));
    
  }, []);
    
  const filteredRecipes = React.useMemo(() => {
    if (!filterContext?.filters?.length) return recipes;

    return recipes.filter((recipe) =>
      recipe.tags?.some((tag) => filterContext.filters.includes(tag)),
    );
  }, [recipes, filterContext?.filters]);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedText
        style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
      >
        Feed Page
      </ThemedText>

      <ThemedView style={styles.recipeFeed}>
        {filteredRecipes.length == 0 ? (
          <ThemedText>
            No recipes found with selected filters. Please modify your filter
            choices and try again.
          </ThemedText>
        ) : (
          filteredRecipes.map((recipe) => (
            <FeedCard
              key={recipe.id}
              onPress={() =>
                router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)
              }
              // pathname: '/(tabs)/Feed/ViewPost/[id]',
              // params: { recipe_id: recipe.id.toString() },
          /*})}*/ recipe={recipe} isFavRecipe={favRecipeIds?.includes(recipe.id) ? true : false} /*id={recipe.id}*/></FeedCard>

        )))}

      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
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
