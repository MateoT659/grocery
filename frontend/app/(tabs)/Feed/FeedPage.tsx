import { Recipe } from '@/build/api_types';
import FeedCard from '@/components/feed/feed-card';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import getAllRecipes from '@/requests/Recipes';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function FeedPage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    const recipesData = getAllRecipes();
    recipesData.then(data => setRecipes(data));
  }, []);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Feed Page</ThemedText>
      
      <FeedCard title={''} onPress={() => console.log("hello")}></FeedCard>

      {recipes.map((recipe) => (
        <ThemedView key={recipe.id} style={styles.titleContainer}>
          <ThemedText style={{fontSize: 18, fontWeight: '600'}}>{recipe.name}</ThemedText>          
          <ThemedView style={styles.stepContainer}>
            {recipe.ingredients.map((riw, index) => (
              <ThemedText key={index} style={{fontSize: 14}}>
                - {riw.ingredientDisplayName} (id: {riw.ingredientId})
              </ThemedText>
            ))}
          </ThemedView>
        </ThemedView>
      ))}

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
})