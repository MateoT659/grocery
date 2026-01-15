import { Tabs, Redirect } from 'expo-router';
import React, { useContext } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserContext } from '@/contexts/user-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useContext(UserContext);

  if (!user) {
    return <Redirect href="/login" />
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        
        
      }}>
      <Tabs.Screen
        name="Feed"
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
        name="Lists" 
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
        name="User"
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
