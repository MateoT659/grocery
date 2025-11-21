import { GroceryList, Ingredient } from '@/build/api_types'
import CreateModalHeader from '@/components/lists/create-modal-header'
import TabSeparator from '@/components/settings/tab-seperator'
import { ThemedScrollView } from '@/components/themed/themed-scroll-view'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedTextInput } from '@/components/themed/themed-text-input'
import { ThemedView } from '@/components/themed/themed-view'
import { addGroceryList, generateGroceryList } from '@/requests/GroceryLists'
import getAllIngredients from '@/requests/Ingredients'
import { wrapIngredientForList } from '@/utils/Ingredient'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'

export default function CreateModal() {
  const DEFAULT_GROCERY_LIST: GroceryList = {id: -1, name: '', description: '', items: []};
  const [groceryList, setGroceryList] = React.useState<GroceryList>(DEFAULT_GROCERY_LIST);
  const [page, setPage] = React.useState<number>(0);
  const router = useRouter();

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState<Ingredient[]>([]);

  const [missedRequiredFields, setMissedRequiredFields] = React.useState<boolean>(false);

  const [manualEnter, setManualEnter] = React.useState<boolean>(false);

  useEffect(() => {
    getAllIngredients().then((fetchedIngredients) => {
      setIngredients(fetchedIngredients);
    });
  }, []);

  const handleTapIngredient = (ingredient: Ingredient) => {
    if (isIngredientSelected(ingredient)) {
      handleRemoveIngredient(ingredient);
    } else {
      handleAddIngredient(ingredient);
    }
  };

  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some(item => item.id === ingredient.id);
  }

  const handleAddIngredient = (ingredient: Ingredient) => {
    const existingItem = groceryList.items.find(item => item.ingredientId === ingredient.id);
    if (!existingItem) {
      const newItem = { ingredientId: ingredient.id, checked: false };
      setGroceryList({
        ...groceryList,
        items: [...groceryList.items, wrapIngredientForList(ingredient)]
      });
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setGroceryList({
      ...groceryList,
      items: groceryList.items.filter(item => item.ingredientId !== ingredient.id)
    });
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredient.id));
  }
  

  const nextPage = () => {
    if (page == 0 && (!groceryList.name || !groceryList.description)) {
      setMissedRequiredFields(true);
      return;
    }

    if (page == 1 && manualEnter && groceryList.items.length == 0) {
      setMissedRequiredFields(true);
      return;
    }

    if (page == 1) {
      if(manualEnter) {
      //dismiss modal then view the new list
        addGroceryList(groceryList).then((response) => {
          if(!response.success) {
            console.log("Failed to create grocery list:", response.message);
            router.back();
            return;
          }
          
          router.back();
          router.push(`/Lists/GroceryLists/ViewList?id=${response.newGroceryList.id}`);
        });
      }
      else {
        generateGroceryList(5, groceryList).then((response) => {
          if(!response.success) {
            console.log("Failed to generate grocery list:", response.message);
            router.back();
            return;
          }

          router.back();
          router.push(`/Lists/GroceryLists/ViewList?id=${response.generatedGroceryList.id}`);          
        });
      }
    }
    setMissedRequiredFields(false);
    setPage(page + 1);
  }

  const lastPage = () => {
    if (page == 0) {
      //dismiss modal
      router.back();
    }
    setPage(page - 1);
    setMissedRequiredFields(false);
  }

  const manualEntryPage = (
    <>
      { missedRequiredFields ? <ThemedText style={{ color: '#914a4aff', padding: 10 }}>Please select at least one ingredient.</ThemedText> : null }
      {
        ingredients.map((ingredient) => (
          <ThemedView key={ingredient.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <ThemedText onPress={() => handleTapIngredient(ingredient)} style={{ flex: 1, fontWeight: isIngredientSelected(ingredient) ? 'bold' : 'normal' }}>{ingredient.name}{isIngredientSelected(ingredient) ? ' - ' : ' + '}</ThemedText>
          </ThemedView>
        ))
      }
      <ThemedText onPress={() => setManualEnter(!manualEnter)} style={styles.manualInputSwapButton}>Generate a List</ThemedText>
    </>
  )

  const pages = [
    (
      <>
        <ThemedTextInput
          placeholder="Name*"
          placeholderTextColor={missedRequiredFields ? '#914a4aff' : ''}
          value={groceryList.name}
          onChangeText={(text) => setGroceryList({...groceryList, name: text})}
          style={styles.textInputs}
        />
        <TabSeparator color='gray' />
        <ThemedTextInput
          placeholder="Description*"
          placeholderTextColor={missedRequiredFields ? '#914a4aff' : ''}
          value={groceryList.description}
          onChangeText={(text) => setGroceryList({...groceryList, description: text})}
          style={styles.textInputs}
        />
        <TabSeparator color='gray' />
        <ThemedText style={{ fontSize: 18, padding: 10 }}>Icon:</ThemedText>
        <ThemedText style={{ fontStyle: 'italic', paddingLeft:25 }}>To be added</ThemedText>
      </>
      // title, description color
    ),
    (
      <>
        {manualEnter ? manualEntryPage : (
          <>
            { missedRequiredFields ? <ThemedText style={{ color: '#914a4aff', padding: 10 }}>Please select at least one ingredient.</ThemedText> : null }
            <ThemedText style={{ fontSize: 18, padding: 10 }}>Generate list (coming soon):</ThemedText>
            <ThemedText onPress={() => setManualEnter(!manualEnter)} style={styles.manualInputSwapButton}>Choose Ingredients Manually</ThemedText>
          </>
        )}
      </>
      // generation params
    )
  ]

  

  return (
    <ThemedView style={styles.rootContainer}>
      <CreateModalHeader leftText={["Cancel", "Back"]} rightText={["Next", "Generate"]} onLeftPress={lastPage} onRightPress={nextPage} page={page} />
      <ThemedScrollView style={styles.internalScrollContainer}>
        {pages[page]}
      </ThemedScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%'
  },
  internalScrollContainer: {},
  textInputs: {
    fontSize: 18,
    padding: 10
  },
  manualInputSwapButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
  }
})