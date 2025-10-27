import React from 'react';
import { ThemedView } from '../themed/themed-view';
import GroceryListItem from './grocery-list-item';

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