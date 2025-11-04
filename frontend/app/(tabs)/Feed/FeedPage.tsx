import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function FeedPage() {
  return (
    <>
    <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Feed Page</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Recipe 1</ThemedText>
          <ThemedText>
            {`Tap to explore more about the recipe`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Recipe 2</ThemedText>

          <ThemedText>
            {`Tap to explore more about the recipe`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Recipe 3</ThemedText>
          <ThemedText>
            {`Tap to explore more about the recipe`}
          </ThemedText>
        </ThemedView>
      </>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
})