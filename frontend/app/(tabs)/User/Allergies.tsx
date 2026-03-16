import { Allergies, Diets } from '@/build/api_types';
import AllergyDietButton from '@/components/settings/settings-dietary-restrictions';
import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { UserContext } from '@/contexts/user-context';
import { updateUserFields } from '@/requests/Users';
import React, { useContext } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import FilterHeader from '@/components/chevron-back';


export default function AllergiesDiet() {
  const userContext = useContext(UserContext)
  
  const handleAllergy = async (allergy: Allergies) => {
    // update allergies list appropriately
    const currentAllergies = userContext?.user?.allergiesList ?? [];

    let updatedAllergies: Allergies[];
    
    if (currentAllergies.includes(allergy)) {
      updatedAllergies = currentAllergies.filter(a => a !== allergy);
    }
    else {
      updatedAllergies = [...currentAllergies, allergy];
    }

    const updatedAllergiesBackend = await updateUserFields(userContext.user?.id, { allergiesList: updatedAllergies})
    userContext?.updateUserField('allergiesList', updatedAllergies)
   
  }

  const handleDiet = async (diet: Diets) => {
    // update diets list appropriately 
    
    const currentDiets = userContext?.user?.dietsList ?? [];

    let updatedDiets: Diets[];

    if (currentDiets.includes(diet)) {
      updatedDiets = currentDiets.filter(d => d !== diet);
    }
    else {
      updatedDiets = [...currentDiets, diet];
    }
    
    const updatedDietsBackend = await updateUserFields(userContext.user?.id, { dietsList: updatedDiets})
    userContext?.updateUserField('dietsList', updatedDiets)
    
  }

  
  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Allergies & Dietary Restrictions</ThemedText>
        </ThemedView>

        <TabSeparator />

        <ThemedView style={styles.allergySection}>
          <ThemedText style={styles.subtitle} type="subtitle">Add an Allergy</ThemedText>

          <ThemedView style={styles.buttonGrid}>
            <AllergyDietButton
              title = 'Eggs'
              isPressed = {userContext?.user?.allergiesList.includes('EGGS')}
              onPress = {() => handleAllergy('EGGS')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Shellfish'
              isPressed = {userContext?.user?.allergiesList.includes('SHELLFISH')}
              onPress = {() => handleAllergy('SHELLFISH')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Fish'
              isPressed = {userContext?.user?.allergiesList.includes('FISH')}
              onPress = {() => handleAllergy('FISH')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Soybeans'
              isPressed = {userContext?.user?.allergiesList.includes('SOYBEANS')}
              onPress = {() => handleAllergy('SOYBEANS')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Tree Nuts'
              isPressed = {userContext?.user?.allergiesList.includes('TREE_NUTS')}
              onPress = {() => handleAllergy('TREE_NUTS')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Sesame Seeds'
              isPressed = {userContext?.user?.allergiesList.includes('SESAME_SEEDS')}
              onPress = {() => handleAllergy('SESAME_SEEDS')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Peanuts'
              isPressed = {userContext?.user?.allergiesList.includes('PEANUTS')}
              onPress = {() => handleAllergy('PEANUTS')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Dairy'
              isPressed = {userContext?.user?.allergiesList.includes('DAIRY')}
              onPress = {() => handleAllergy('DAIRY')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Lactose'
              isPressed = {userContext?.user?.allergiesList.includes('LACTOSE')}
              onPress = {() => handleAllergy('LACTOSE')}
            ></AllergyDietButton>

          </ThemedView>
            
        </ThemedView>

        <ThemedView style={styles.allergySection}>
        
          <ThemedText style={styles.subtitle} type="subtitle">Add a Dietary Restriction</ThemedText>
          
          <ThemedView style={styles.buttonGrid}>
            <AllergyDietButton
              title = 'Vegetarian'
              isPressed = {userContext?.user?.dietsList.includes('VEGETARIAN')}
              onPress = {() => handleDiet('VEGETARIAN')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Vegan'
              isPressed = {userContext?.user?.dietsList.includes('VEGAN')}
              onPress = {() => handleDiet('VEGAN')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Pescatarian'
              isPressed = {userContext?.user?.dietsList.includes('PESCATARIAN')}
              onPress = {() => handleDiet('PESCATARIAN')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Halal'
              isPressed = {userContext?.user?.dietsList.includes('HALAL')}
              onPress = {() => handleDiet('HALAL')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Kosher'
              isPressed = {userContext?.user?.dietsList.includes('KOSHER')}
              onPress = {() => handleDiet('KOSHER')}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Gluten Free'
              isPressed = {userContext?.user?.dietsList.includes('GLUTEN_FREE')}
              onPress = {() => handleDiet('GLUTEN_FREE')}
            ></AllergyDietButton>
        

          </ThemedView>

        </ThemedView>
    
      </ScrollView>
    </ThemedSafeAreaView>
      

  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    margin: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  stepContainer: {
    marginBottom: 8,
  },
  allergySection: {
    marginTop: 15
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  subtitle: {
    marginBottom: 5
  },
});

