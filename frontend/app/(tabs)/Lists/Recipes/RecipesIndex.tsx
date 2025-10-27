import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function Recipes() {
  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      <ThemedView>
        <ThemedText>Recipes page</ThemedText>
      </ThemedView>
    </ThemedSafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
  }
})