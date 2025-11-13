import { Recipe } from '@/build/api_types';
import FeedCard from '@/components/feed/feed-card';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import getAllRecipes from '@/requests/Recipes';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function FeedPage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const recipesData = getAllRecipes();
    recipesData.then(data => setRecipes(data));
  }, []);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Feed Page</ThemedText>
      
      <ThemedView style={styles.recipeFeed}>
        {recipes.map((recipe) => (
          <FeedCard 
            key={recipe.id}
            onPress={() => router.push(`/(tabs)/Feed/ViewPost/${recipe.id.toString()}`)}
              // pathname: '/(tabs)/Feed/ViewPost/[id]',
              // params: { recipe_id: recipe.id.toString() },
          /*})}*/ title={recipe.name} description={recipe.description}></FeedCard>
        ))}
      </ThemedView>

    </ThemedScrollView>
  )
}

const styles = StyleSheet.create({
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