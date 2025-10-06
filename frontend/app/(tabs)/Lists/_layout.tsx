import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function ListsLayout() {
  return (
    <Stack>
      <Stack.Screen name="GroceryLists" options={{ headerShown: false }} />
    </Stack>
  )
}