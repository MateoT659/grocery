import { RecipeTag } from "@/build/api_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext } from "react";



interface FilterContext {
  filters: RecipeTag[];
  setFilters: React.Dispatch<React.SetStateAction<RecipeTag[]>>;
}

export const FilterContext = createContext<FilterContext>(null as any);


export function FilterContextProvider({children}: {children: React.ReactNode}) {
  const [filters, setFilters] = React.useState<RecipeTag[]>([]);

  // allow the filters, setFilters elements to be available to any child components
    return (
      <FilterContext.Provider value={{filters, setFilters}}>
        {children}
      </FilterContext.Provider>
    )
  }
  