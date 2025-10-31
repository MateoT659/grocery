import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { createContext } from 'react';
import { Allergies, Diets } from '@/build/api_types';
export const unstable_settings = {
  anchor: '(tabs)',
};

//everything from User except the password
interface UserInfo {
  firstName: string,
  lastName: string,
  allergies: Array<Allergies>,
  diets: Array<Diets>
}

interface UserContext {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  updateUserField: <K extends keyof UserInfo>(key: K, value: UserInfo[K]) => void;
}

export const UserContext = createContext<UserContext | undefined>(undefined);


export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = React.useState<UserInfo>({
    firstName: "",
    lastName: "",
    allergies: [],
    diets: [],
  });

  const updateUserField = <K extends keyof UserInfo>(key: K, value: UserInfo[K]) => {
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
