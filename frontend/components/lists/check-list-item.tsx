import { ListIngredientWrapper } from '@/build/api_types';
import React from 'react';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

//todo: add default crossed off state in props as bitstring

export default function CheckListItem(props: { item: ListIngredientWrapper }) {
  const [crossedOff, setCrossedOff] = React.useState(props.item.checked ?? false);
  
  function toggleCrossOff() {
    setCrossedOff(!crossedOff);
  }

  return (
    <ThemedView onTouchStart={toggleCrossOff}>
        <ThemedText style={{ fontStyle: 'italic', textDecorationLine: crossedOff ? 'line-through' : 'none' }}>
          {props.item.ingredientDisplayName} - {props.item.quantity} {props.item.unit}
        </ThemedText>
    </ThemedView>
  )
}