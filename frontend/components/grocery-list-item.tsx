import React from 'react'
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';

export default function GroceryListItem(props: { item: string }) {
  const [crossedOff, setCrossedOff] = React.useState(false);
  
  function toggleCrossOff() {
    setCrossedOff(!crossedOff);
  }

  return (
    <ThemedView onTouchStart={toggleCrossOff}>
      <ThemedText style={{ textDecorationLine: crossedOff ? 'line-through' : 'none' }}>
        {props.item}
      </ThemedText>
    </ThemedView>
  )
}