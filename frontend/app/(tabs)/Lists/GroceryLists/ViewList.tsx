import { GroceryList } from '@/build/api_types'
import CheckList from '@/components/lists/check-list'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import { getGroceryListById } from '@/requests/GroceryLists'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ViewList() {
  const route = useRoute();
  const urlParams = new URLSearchParams(route.params as Record<string, string>);
  const groceryListId = urlParams.get('id');
  const [groceryList, setGroceryList] = React.useState<GroceryList | null>(null);

  React.useEffect(() => {
    getGroceryListById(groceryListId || '').then((list) => {
      setGroceryList(list);
    });
  }, [groceryListId]);


  return (
    <ThemedView style={styles.rootContainer}>
      {groceryList ? (
      <>
        <ThemedText>{groceryList.name}</ThemedText>
        <ThemedText>{groceryList.description}</ThemedText>
        <CheckList items={groceryList.items || []} />
      </>
      ) : (
      <ThemedText>Loading...</ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    padding: 16,
  }
})