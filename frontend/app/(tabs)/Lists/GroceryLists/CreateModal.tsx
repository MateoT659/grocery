import CreateModalHeader from '@/components/lists/create-modal-header'
import { ThemedScrollView } from '@/components/themed/themed-scroll-view'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CreateModal() {
  return (
    <ThemedView style={styles.rootContainer}>
      <CreateModalHeader leftText="Cancel" rightText="Done" />
      <ThemedScrollView style={styles.internalScrollContainer}>
        <ThemedText>CreateModal</ThemedText>
      </ThemedScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%'
  },
  internalScrollContainer: {
    paddingVertical: 24
  }
})