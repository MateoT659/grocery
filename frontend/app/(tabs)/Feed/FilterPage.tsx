import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function FilterPage() {
  return (
    <View>
      <Text>FilterPage</Text>
      <Link href="/(tabs)/Feed/FeedIndex">Go to FeedIndex</Link>
    </View>
  )
}