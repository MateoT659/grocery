import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function ListsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarPosition: 'top',
      }}>
      <Tabs.Screen
        name="GroceryLists"
        options={{
          title: 'Grocery Lists',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Recipes" 
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'folder-open' : 'folder-open-outline'}
              color={color}
              size={24}
            />
          )
        }}
      />
    </Tabs>
  )
}