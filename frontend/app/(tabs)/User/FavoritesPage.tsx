import { Recipe } from '@/build/api_types';
import FeedCard from '@/components/feed/feed-card';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { UserContext } from '@/contexts/user-context';
import getAllRecipes, { getRecipeRecs } from '@/requests/Recipes';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import FilterHeader from '@/components/chevron-back';
import NewRecipeButton from '@/components/create-new-recipe-button';


export default function FavoritesPage() {
  const userContext = useContext(UserContext);

  let favRecipeIds = userContext?.user?.likedRecipes;

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const recipesData = getAllRecipes();
    recipesData.then(data => setRecipes(data));
  }, []);

  const favRecipes = recipes.filter(recipe => favRecipeIds?.includes(recipe.id));

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
        <FilterHeader />
        <ThemedScrollView style={styles.rootContainer}>
        <ThemedText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Favorite Recipes</ThemedText>
        
        <ThemedView style={styles.recipeFeed}>
          <NewRecipeButton 
            title="Create New Recipe" 
            onPress={() => router.push(`/(tabs)/User/CreateNewRecipe`)} 
          />
            {favRecipes.length === 0 ? (
              <ThemedText>You don't have any favorite recipes yet! Liked Recipes will appear here.</ThemedText>
            ) :
            (favRecipes.map((recipe) => (
                <FeedCard 
                    key={recipe.id}
                    onPress={() => router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)}
                    recipe={recipe} isFavRecipe={favRecipeIds?.includes(recipe.id) ? true : false}>

                </FeedCard>
            )))}
        </ThemedView>

        </ThemedScrollView>
    </ThemedSafeAreaView>
        
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: '100%',
  },
  rootContainer: {
    flex: 1,
    padding: 32,
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  recipeFeed: {
    gap: 25
  }
})