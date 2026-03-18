import { User } from "@/build/api_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext } from "react";


interface UserContext {
  user: User | null;
  loadingUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUserField: <K extends keyof User>(key: K, value: User[K]) => void;
}

export const UserContext = createContext<UserContext>(null as any);

// function to make user data and update functions available to all child components
export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loadingUser, setLoadingUser] = React.useState(true);
      
  // function to update a singular user field, otherwise, the entire user object (all fields) would need to be updated everytime
  const updateUserField = <K extends keyof User>(key: K, value: User[K]) => {
    setUser(prev => (prev ? { ...prev, [key]: value} : prev));
  }


  // Retrieves stored user data from AsyncStorage as soon as the app starts and stores it into the user useState 
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        else {
          setUser(null);
        }
      }
      catch (e) {
        console.log("Failed to get user.")
        console.log(e)
        setUser(null);
      }
      finally {
        setLoadingUser(false);
      }
    }
    getUser();
  }, [])


  // Updates the user data in AsyncStorage when a change is made to the user useState (as long as the user is logged in)
  React.useEffect(() => {
    const storeUser = async () => {
      try {
        if (user) {
          const jsonUser = JSON.stringify(user);
          await AsyncStorage.setItem('user', jsonUser)
        }
        else {
          await AsyncStorage.removeItem('user');
        }
        
      }
      catch (e) {
        console.log("Failed to save user locally.")
        console.log(e)
      }
    }
    storeUser();
  }, [user])

  // allow the user, setUser, and updateUserField elements to be available to any child components
  return (
    <UserContext.Provider value={{user, loadingUser, setUser, updateUserField}}>
      {children}
    </UserContext.Provider>
  )
}
