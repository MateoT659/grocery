import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import AllergyDietButton from '@/components/settings/settings-dietary-restrictions';


export default function Allergies() {
  
  function handleAllergyDiet() {
    return;
  }
  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
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
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Shellfish'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Fish'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Soy Beans'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Tree Nuts'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Sesame Seeds'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Peanuts'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Dairy'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Lactose'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

          </ThemedView>
            
        </ThemedView>

        <ThemedView style={styles.allergySection}>
        
          <ThemedText style={styles.subtitle} type="subtitle">Add a Dietary Restriction</ThemedText>
          
          <ThemedView style={styles.buttonGrid}>
            <AllergyDietButton
              title = 'Vegetarian'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Vegan'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Pescatarian'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Halal'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Kosher'
              onPress = {handleAllergyDiet}
            ></AllergyDietButton>

            <AllergyDietButton
              title = 'Gluten Free'
              onPress = {handleAllergyDiet}
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
    backgroundColor: 'white'
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

