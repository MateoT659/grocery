import React from 'react';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

//todo: add default crossed off state in props as bitstring

export default function GroceryListItem(props: { item: string }) {
  const [crossedOff, setCrossedOff] = React.useState(false);
  
  function toggleCrossOff() {
    setCrossedOff(!crossedOff);
  }

  return (
    <ThemedView onTouchStart={toggleCrossOff}>
        <ThemedText style={{ fontStyle: 'italic', textDecorationLine: crossedOff ? 'line-through' : 'none' }}>
          {props.item}
        </ThemedText>
    </ThemedView>
  )
}