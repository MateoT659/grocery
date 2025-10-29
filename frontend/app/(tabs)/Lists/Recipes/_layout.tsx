import ListHeader from '@/components/lists/list-header'
import { Stack } from 'expo-router'
import React from 'react'

export default function RecipesLayout() {
  return (
    <>
      <ListHeader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipesIndex" />
      </Stack>
    </>
    
  )
}