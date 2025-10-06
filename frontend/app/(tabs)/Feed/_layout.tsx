import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen name="FeedIndex" options={{ headerShown: false }} />
    </Stack>
  )
}