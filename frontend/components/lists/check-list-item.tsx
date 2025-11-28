import { ListIngredientWrapper } from '@/build/api_types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

//todo: add default crossed off state in props as bitstring

export default function CheckListItem(props: { item: ListIngredientWrapper, handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void }) {
  function toggleCrossOff() {
      props.handleCrossOffChange(!props.item.checked, props.item.ingredientId);
  }

  return (
    <ThemedView style={styles.container}>
        <ThemedText onPress={toggleCrossOff} style={[styles.text, {textDecorationLine: props.item.checked ? 'line-through' : 'none' }]}>
          {props.item.ingredientDisplayName} - {props.item.quantity} {props.item.unit}
        </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});