import { GroceryList, ListIngredientWrapper } from '@/build/api_types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

export default function CheckList(props: {list: GroceryList, handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void}) {

  const CheckListItem = (
      itemProps: { item: ListIngredientWrapper, handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void }) => {
      return (
        <ThemedView style={styles.itemContainer}>
          <ThemedText onPress={() => itemProps.handleCrossOffChange(!itemProps.item.checked, itemProps.item.ingredientId)} style={[styles.listDescription, {textDecorationLine: itemProps.item.checked ? 'line-through' : 'none' }]}>
            {itemProps.item.ingredientDisplayName}
          </ThemedText>
          {props.list.recipes.length > 0 &&
          <ThemedText style={styles.listSubtext}>
            Used in {props.list.recipes.filter(
              recipe => 
              itemProps.item.fromRecipesIds.includes(recipe.recipeId))
              .map(recipe=>recipe.recipeName)
              .join(', ')}
          </ThemedText>
      }
        </ThemedView>
      )
    }

  return (
    <ThemedView>
      {props.list.items.map((item, index) => {
        return (
          <CheckListItem key={index} item={item} handleCrossOffChange={props.handleCrossOffChange} />
        );
      })}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  listDescription: {
    fontSize: 18,
  },
  listSubtext: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic'
  },
})