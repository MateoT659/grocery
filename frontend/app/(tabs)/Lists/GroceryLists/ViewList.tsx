import GroceryList from '@/components/lists/grocery-list'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ViewList() {
  return (
    <ThemedView style={styles.rootContainer}>
      <ThemedText>ViewList</ThemedText>
      <GroceryList items={['bbq sauce', 'eggs', 'milk', 'bread']}/>
      
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%'
  }
})