import { Recipetag } from "@/build/api_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext } from "react";



interface FilterContext {
  filters: Recipetag[];
  setFilters: React.Dispatch<React.SetStateAction<Recipetag[]>>;
}

export const FilterContext = createContext<FilterContext>(null as any);


export function FilterContextProvider({children}: {children: React.ReactNode}) {
  const [filters, setFilters] = React.useState<Recipetag[]>([]);

  // Retrieves stored filter data from AsyncStorage as soon as the app starts and stores it into the filter useState 
  React.useEffect(() => {
    const getFilters = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem('filters');
        if (storedFilters) {
          setFilters(JSON.parse(storedFilters));
        }
        else {
          setFilters([]);
        }
      }
      catch (e) {
        console.log("Failed to get filters.")
        console.log(e)
        setFilters([]);
      }
    }
    getFilters();
  }, [])

  // Updates the filter data in AsyncStorage when a change is made to the filters useState
  React.useEffect(() => {
    const storeFilters = async () => {
      try {
        if (filters) {
          const jsonFilters = JSON.stringify(filters);
          await AsyncStorage.setItem('filters', jsonFilters)
        }
        else {
          await AsyncStorage.removeItem('filters');
        }
        
      }
      catch (e) {
        console.log("Failed to save filters locally.")
        console.log(e)
      }
    }
    storeFilters();
  }, [filters])

  // allow the filters, setFilters elements to be available to any child components
    return (
      <FilterContext.Provider value={{filters, setFilters}}>
        {children}
      </FilterContext.Provider>
    )
  }
  