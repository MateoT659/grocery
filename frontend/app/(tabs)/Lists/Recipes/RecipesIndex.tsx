import { Ingredient } from '@/build/api_types'
import { ThemedScrollView } from '@/components/themed/themed-scroll-view'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import getAllIngredients from '@/requests/Ingredients'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function Recipes() {

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  React.useEffect(() => {
    getAllIngredients().then(data => setIngredients(data));
  }, []);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      <ThemedText style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Recipes Index</ThemedText>
      {ingredients.map((ingredient) => (
        <ThemedView key={ingredient.id} style={{marginBottom: 12}}>
          <ThemedText style={{fontSize: 18, fontWeight: '600'}}>{ingredient.name}</ThemedText>
          <ThemedText style={{fontSize: 14}}>ID: {ingredient.id}</ThemedText>
        </ThemedView>
      ))}
    </ThemedScrollView>
    
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
  }
})