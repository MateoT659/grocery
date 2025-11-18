import { ListIngredientWrapper } from '@/build/api_types';
import React from 'react';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

//todo: add default crossed off state in props as bitstring

export default function CheckListItem(props: { item: ListIngredientWrapper, handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void }) {
  function toggleCrossOff() {
      props.handleCrossOffChange(!props.item.checked, props.item.ingredientId);
  }

  return (
    <ThemedView onTouchStart={toggleCrossOff}>
        <ThemedText style={{ fontStyle: 'italic', textDecorationLine: props.item.checked ? 'line-through' : 'none' }}>
          {props.item.ingredientDisplayName} - {props.item.quantity} {props.item.unit}
        </ThemedText>
    </ThemedView>
  )
}