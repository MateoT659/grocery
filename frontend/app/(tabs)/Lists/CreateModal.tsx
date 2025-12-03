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
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function CreateModal() {
  const DEFAULT_GROCERY_LIST: GroceryList = {id: -1, name: '', description: '', items: [], recipes: []};
  const [groceryList, setGroceryList] = React.useState<GroceryList>(DEFAULT_GROCERY_LIST);
  const [nRecipes, setNRecipes] = React.useState<number>(0);
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
    setMissedRequiredFields(false);
    if (page == 0 && (!groceryList.name || !groceryList.description)) {
      setMissedRequiredFields(true);
      return;
    }

    if (page == 1 && manualEnter && groceryList.items.length == 0) {
      setMissedRequiredFields(true);
      return;
    }

    if(page == 1 && !manualEnter && (nRecipes <= 0 || isNaN(nRecipes))) {
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
          router.push(`/Lists/ViewList?id=${response.newGroceryList.id}`);
        });
      }
      else {
        generateGroceryList(nRecipes, groceryList).then((response) => {
          if(!response.success) {
            console.log("Failed to generate grocery list:", response.message);
            router.back();
            return;
          }

          router.back();
          router.push(`/Lists/ViewList?id=${response.generatedGroceryList.id}`);          
        });
      }
    }
    setMissedRequiredFields(false);
    setPage(page + 1);
  }

  const lastPage = () => {
    setMissedRequiredFields(false);
    if (page == 0) {
      //dismiss modal
      router.back();
    }
    setPage(page - 1);
  }

  const manualEntryPage = (
    <ThemedView style={{ paddingBottom: 32 }}>
      { missedRequiredFields ? <ThemedText style={{ color: '#914a4aff', padding: 10 }}>Please select at least one ingredient.</ThemedText> : null }
      {
        ingredients.map((ingredient) => (
          <ThemedView key={ingredient.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
            <ThemedText onPress={() => handleTapIngredient(ingredient)} style={{ flex: 1, fontWeight: isIngredientSelected(ingredient) ? 'bold' : 'normal' }}>{ingredient.name}{isIngredientSelected(ingredient) ? ' - ' : ' + '}</ThemedText>
          </ThemedView>
        ))
      }
      <TouchableOpacity onPress={()=> setManualEnter(!manualEnter)} style={styles.manualInputSwapContainer}>
            <ThemedView style={styles.manualInputSwapButton}>
              <Ionicons name='add-outline' size={20} color='cyan' />
              <ThemedText style={styles.manualInputSwapButtonText}>Generate a List</ThemedText>
            </ThemedView>
         </TouchableOpacity>
    </ThemedView>
  )

  const pages = [
    (
      // title, description color
      <>
        <ThemedTextInput
          placeholder="Name*"
          placeholderTextColor={missedRequiredFields ? '#914a4aff' : '#545454ff'}
          value={groceryList.name}
          onChangeText={(text) => setGroceryList({...groceryList, name: text})}
          style={styles.textInputs}
        />
        <TabSeparator color='gray' />
        <ThemedTextInput
          placeholder="Description*"
          placeholderTextColor={missedRequiredFields ? '#914a4aff' : '#545454ff'}
          value={groceryList.description}
          onChangeText={(text) => setGroceryList({...groceryList, description: text})}
          style={styles.textInputs}
        />
        <TabSeparator color='gray' />
      </>
    ),
    (
      // generation params or manual entry
      <>
        {manualEnter ? manualEntryPage : (
          <>
            <ThemedTextInput
              keyboardType='number-pad'
              placeholder="Number of Recipes*"
              placeholderTextColor={missedRequiredFields ? '#914a4aff' : '#545454ff'}
              value={nRecipes == 0 ? "" : nRecipes.toString()}
              onChangeText={(text) => setNRecipes(isNaN(Number(text)) ? 0 : Number(text))}
              style={styles.textInputs}
            />
        <TabSeparator color='gray' />
          <TouchableOpacity onPress={()=> setManualEnter(!manualEnter)} style={styles.manualInputSwapContainer}>
            <ThemedView style={styles.manualInputSwapButton}>
              <Ionicons name='add-outline' size={20} color='cyan' />
              <ThemedText style={styles.manualInputSwapButtonText}>Choose Ingredients Manually</ThemedText>
            </ThemedView>
         </TouchableOpacity>
          </>
        )}
      </>
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
  manualInputSwapContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  manualInputSwapButton:{
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    borderColor: 'cyan', 
    borderWidth: 1, 
    borderRadius: 99, 
    padding:12,

  },
  manualInputSwapButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'cyan',
    borderWidth:1,
  }
})