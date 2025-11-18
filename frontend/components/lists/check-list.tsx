import { GroceryList } from '@/build/api_types';
import React from 'react';
import { ThemedView } from '../themed/themed-view';
import CheckListItem from './check-list-item';

export default function CheckList(props: {list: GroceryList, handleCrossOffChange: (crossedOff: boolean, ingredientId: number) => void}) {

  

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