import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import TabSeparator from '@/components/tab-seperator';


export default function Allergies() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
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
        </ThemedView>
    
      </ScrollView>
    </SafeAreaView>
      

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