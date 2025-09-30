import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        
        
      }}>
      <Tabs.Screen
        name="Feed/FeedPage"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Lists/GroceryLists" 
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "script-text" : 'script-text-outline'}
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="User/UserIndex"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
