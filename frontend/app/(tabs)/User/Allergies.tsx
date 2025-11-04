import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';


export default function Allergies() {

  function handleAllergy() {
    return;
  }
  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Allergies & Dietary Restrictions</ThemedText>
        </ThemedView>

        <TabSeparator />

        <ThemedView>
          <ThemedText type="subtitle">Add an Allergy</ThemedText>
        </ThemedView>
        
        <TabSeparator />

        <ThemedView>
          <ThemedText type="subtitle">Add a Dietary Restriction</ThemedText>
          

          {/*
              GLUTEN,
              SHELLFISH,
              EGGS,
              FISH,
              PEANUTS,
              SOYBEANS,
              TREE_NUTS,
              SESAME_SEEDS,
              DAIRY,
              LACTOSE,

              -----------------


              VEGETARIAN,
              VEGAN,
              PESCATARIAN,
              HALAL,
              KOSHER,
              GLUTEN_FREE,
          */}

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
});

