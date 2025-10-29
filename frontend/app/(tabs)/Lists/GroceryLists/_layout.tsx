import ListHeader from '@/components/lists/list-header'
import { Stack } from 'expo-router'
import React from 'react'

export default function GroceryListsLayout() {
  return (
    <>
      <ListHeader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GroceryListsIndex"/>
        <Stack.Screen name="CreateModal" options={{ presentation: 'modal', title: 'Create Grocery List' }}/>
      </Stack>
    </>
      )
}