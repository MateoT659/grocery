import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { createContext } from 'react';
import { Allergies, Diets, User } from '@/build/api_types';
export const unstable_settings = {
  anchor: '(tabs)',
};


interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateUserField: <K extends keyof User>(key: K, value: User[K]) => void;
}

export const UserContext = createContext<UserContext | undefined>(undefined);


export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = React.useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    allergiesList: [],
    dietsList: [],
  });

  const updateUserField = <K extends keyof User>(key: K, value: User[K]) => {
    setUser(prev => (prev ? { ...prev, [key]: value} : prev));
  }
  
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      catch (e) {
        console.log("Failed to get user.")
        console.log(e)
      }
    }
    getUser();
  }, [])

  React.useEffect(() => {
    const storeUser = async () => {
      try {
        const jsonUser = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonUser)
      }
      catch (e) {
        console.log("Failed to save user locally.")
        console.log(e)
      }
    }
    storeUser();
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser, updateUserField}}>
      {children}
    </UserContext.Provider>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserContextProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </UserContextProvider>
  );
}
