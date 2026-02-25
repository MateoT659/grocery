import { Allergies, Diets } from "@/build/api_types";
import { createContext, useState } from "react";

interface FilterContext {
  excludedAllergies: Allergies[];
  setExcludedAllergies: React.Dispatch<React.SetStateAction<Allergies[]>>;
  includedDiets: Diets[];
  setIncludedDiets: React.Dispatch<React.SetStateAction<Diets[]>>;
  // TODO: add recipeTags here as well
}

export const FilterContext = createContext<FilterContext>(null as any);

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [excludedAllergies, setExcludedAllergies] = useState<Allergies[]>([]);
  const [includedDiets, setIncludedDiets] = useState<Diets[]>([]);

  return (
    <FilterContext.Provider
      value={{
        excludedAllergies,
        setExcludedAllergies,
        includedDiets,
        setIncludedDiets,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
