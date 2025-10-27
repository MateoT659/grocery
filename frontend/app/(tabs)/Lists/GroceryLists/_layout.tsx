import ListHeader from '@/components/lists/list-header'
import { Stack } from 'expo-router'
import React from 'react'

export default function GroceryListsLayout() {
  return (
    <>
      <ListHeader />
      <Stack>
        <Stack.Screen name="GroceryListsIndex" options={{ headerShown: false }} />
      </Stack>
    </>
      )
}