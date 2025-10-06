import { View, Text } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Link } from 'expo-router'

export default function Recipes() {
  return (
    <ThemedView style={{paddingTop: 150}}>
      <ThemedText>Recipes page</ThemedText>
      <Link href='/(tabs)/Lists/GroceryLists'> <ThemedText>Go to grocery lists page</ThemedText> </Link>
    </ThemedView>
  )
}