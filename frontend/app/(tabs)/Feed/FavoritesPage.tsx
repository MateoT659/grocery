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

export default function FavoritesPage() {
  const userContext = useContext(UserContext);

  let favRecipeIds = userContext?.user?.likedRecipes;

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const recipesData = getAllRecipes();
    recipesData.then(data => setRecipes(data));
  }, []);

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
    
        <ThemedScrollView style={styles.rootContainer}>
        <ThemedText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Favorite Recipes</ThemedText>
        
        <ThemedView style={styles.recipeFeed}>
            {recipes.filter(recipe =>
                favRecipeIds?.includes(recipe.id)
                ).map((recipe) => (
                <FeedCard 
                    key={recipe.id}
                    onPress={() => router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)}
                    id={recipe.id} title={recipe.name} description={recipe.description} defaultLiked={true}>

                </FeedCard>
            ))}
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