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

  // allow the filters, setFilters elements to be available to any child components
    return (
      <FilterContext.Provider value={{filters, setFilters}}>
        {children}
      </FilterContext.Provider>
    )
  }
  