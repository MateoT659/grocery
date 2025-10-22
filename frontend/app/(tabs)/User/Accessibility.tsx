import React, { useState } from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Switch } from 'react-native'

export default function Accessibility() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  return (
    <SafeAreaView style={isDarkMode ? styles.safeAreaContainerDark : styles.safeAreaContainer}>
      <ScrollView style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainer}>
        <ThemedView style={isDarkMode ? styles.titleContainerDark : styles.titleContainer}>
          <ThemedText type="title">Accessibility Settings</ThemedText>
        </ThemedView>
        <ThemedText>(soon, dark mode/light mode introduce contexts here)</ThemedText>

        <ThemedView>
          <Switch 
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
            />

        
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
  safeAreaContainerDark: {
    height: 'auto',
    backgroundColor: 'black'
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    margin: 15
  },
  scrollContainerDark: {
    height: Dimensions.get('window').height,
    margin: 15,
    backgroundColor: 'black'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  titleContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  stepContainer: {
    marginBottom: 8,
  },
});