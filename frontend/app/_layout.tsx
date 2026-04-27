import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserContextProvider } from '@/contexts/user-context';
import { FilterContextProvider } from '@/contexts/filter-context';
import { FilterContext } from '@/contexts/filter-context';
export const unstable_settings = {
  // anchor: '(tabs)',
};



export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserContextProvider>
      <FilterContextProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </FilterContextProvider>
    </UserContextProvider>
  );
}
