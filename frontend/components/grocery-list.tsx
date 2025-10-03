import React from 'react'
import GroceryListItem from './grocery-list-item';
import { ThemedView } from './themed-view';

export default function GroceryList() {
  const [items] = React.useState<string[]>(['john\'s', 'eggs', 'milk', 'bread']);
  
  return (
    <ThemedView>
      {items.map((item, index) => (
        <GroceryListItem key={index} item={item} />
      ))}
    </ThemedView>
  )
}