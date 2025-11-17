import { ListIngredientWrapper } from '@/build/api_types';
import React from 'react';
import { ThemedView } from '../themed/themed-view';
import CheckListItem from './check-list-item';

export default function CheckList(props: {items?: ListIngredientWrapper[]}) {
  const [items] = React.useState<ListIngredientWrapper[]>(props.items ?? []);

  return (
    <ThemedView>
      {items.map((item, index) => (
        <CheckListItem key={index} item={item}/>
      ))}
    </ThemedView>
  )
}