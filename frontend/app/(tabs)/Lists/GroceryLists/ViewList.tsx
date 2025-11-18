import { GroceryList } from '@/build/api_types'
import CheckList from '@/components/lists/check-list'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import { getGroceryListById, setGroceryListById } from '@/requests/GroceryLists'
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
  }, [groceryListId, setGroceryList]);


  function handleCrossOffChange(crossedOff: boolean, ingredientId: number) {
    if (!groceryList) return;
    
    const items = groceryList.items;
    const itemIndex = items.findIndex(item => item.ingredientId === ingredientId);
    if (itemIndex !== -1) {
      items[itemIndex].checked = crossedOff;
    }

    const newGroceryList = { ...groceryList, items: items };

    const response = setGroceryListById(groceryList?.id.toString() || '', newGroceryList);

    response.then((res) => {
      console.log(res);
    });

    setGroceryList(newGroceryList);
  }

  return (
    <ThemedView style={styles.rootContainer}>
      {groceryList ? (
      <>
        <ThemedText>{groceryList.name}</ThemedText>
        <ThemedText>{groceryList.description}</ThemedText>
        <CheckList list={groceryList} handleCrossOffChange={handleCrossOffChange} />
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