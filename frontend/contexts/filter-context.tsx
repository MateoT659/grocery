import { Allergies, Diets, RecipeTag } from "@/build/api_types";
import React, { createContext } from "react";

interface FilterContext {
  excludedAllergies: Allergies[];
  setExcludedAllergies: React.Dispatch<React.SetStateAction<Allergies[]>>;
  includedDiets: Diets[];
  setIncludedDiets: React.Dispatch<React.SetStateAction<Diets[]>>;
  filters: RecipeTag[];
  setFilters: React.Dispatch<React.SetStateAction<RecipeTag[]>>;
}

export const FilterContext = createContext<FilterContext>(null as any);

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = React.useState<RecipeTag[]>([]);
  const [excludedAllergies, setExcludedAllergies] = React.useState<Allergies[]>(
    [],
  );
  const [includedDiets, setIncludedDiets] = React.useState<Diets[]>([]);
  // allow the filters, setFilters elements to be available to any child components
  return (
    <FilterContext.Provider
      value={{
        excludedAllergies,
        setExcludedAllergies,
        includedDiets,
        setIncludedDiets,
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
