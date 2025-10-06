import React from 'react'
import GroceryListItem from './grocery-list-item';
import { ThemedView } from './themed-view';

export default function GroceryList(props: {items?: string[]}) {
  const [items] = React.useState<string[]>(props.items ?? ['no items found']);

  return (
    <ThemedView>
      {items.map((item, index) => (
        <GroceryListItem key={index} item={item}/>
      ))}
    </ThemedView>
  )
}