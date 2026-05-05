import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedView } from "@/components/themed/themed-view";
import { useRouter } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Chip, IconButton, Text } from "react-native-paper";
// import { FilterOption, FilterOptionsArray } from '../../../constants/FilterOptions';
import {
  Allergies,
  AllergiesValues,
  Diets,
  DietsValues,
  RecipeTag,
  RecipeTagValues,
} from "@/build/api_types";
import { FilterContext } from "@/contexts/filter-context";
// import { getRecipeTags } from '@/requests/Recipes';
import { ThemedText } from "@/components/themed/themed-text";

//function to help with displaycase of the filter options
function toDisplayCase(filterString: string) {
  return filterString
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function FilterModal() {
  const router = useRouter();

  const filterContext = useContext(FilterContext);

  const [filterQuery, setFilterQuery] = useState("");

  type FilterKey = Diets | Allergies | RecipeTag;

  //selected filters state - what is currently selected
  const [selectedFilters, setSelectedFilters] = useState<FilterKey[]>([
    ...filterContext.filters,
    ...filterContext.includedDiets,
    ...filterContext.excludedAllergies,
  ]);

  const filteredOptions: FilterKey[] = useMemo(() => {
    const q = filterQuery.trim().toLowerCase(); //trim removes the white space
    if (!q)
      return [
        ...DietsValues,
        ...AllergiesValues,
        ...RecipeTagValues,
      ] as FilterKey[]; //if there is no query, show all options
    return [...DietsValues, ...AllergiesValues, ...RecipeTagValues].filter(
      (opt) => toDisplayCase(opt).toLowerCase().includes(q),
    ) as FilterKey[];
  }, [filterQuery]);

  //utility functions for changing selectedFilters array
  const toggle = (tag: FilterKey) => {
    setSelectedFilters((prev) =>
      prev.includes(tag) ? prev.filter((k) => k !== tag) : [...prev, tag],
    );
  };

  const remove = (tag: FilterKey) => {
    setSelectedFilters((prev) => prev.filter((k) => k !== tag));
  };

  const clearAll = () => setSelectedFilters([]);

  const applyFilters = () => {
    //update filter context

    const selectedRecipeFilters = selectedFilters.filter((f) =>
      RecipeTagValues.includes(f as RecipeTag),
    ) as RecipeTag[];

    const selectedDiets = selectedFilters.filter((f) =>
      DietsValues.includes(f as Diets),
    ) as Diets[];

    const selectedAllergies = selectedFilters.filter((f) =>
      AllergiesValues.includes(f as Allergies),
    ) as Allergies[];

    filterContext.setExcludedAllergies(selectedAllergies);
    filterContext.setIncludedDiets(selectedDiets);
    filterContext.setFilters(selectedRecipeFilters);

    router.back();
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* Header and close button */}
      <ThemedView style={styles.header}>
        <IconButton icon="close" onPress={() => router.back()} />
      </ThemedView>

      {/* Filter using-bar */}
      {/* <ThemedView style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <Searchbar
            placeholder="Filter by" value={filterQuery} onChangeText={setFilterQuery} autoCorrect={false} autoCapitalize="none" />
        </ThemedView> */}

      <ThemedText style={{ paddingLeft: 20, fontWeight: "bold" }}>
        Selected Filters
      </ThemedText>
      {/* choose/unchoose fitler options provided */}
      <ThemedView style={styles.selectedWrap}>
        {selectedFilters.length === 0 ? (
          <Text style={{ opacity: 0.6 }}> No filters selected </Text>
        ) : (
          selectedFilters.map((k) => {
            return (
              <Chip
                key={`sel-${k}`}
                mode="outlined"
                onClose={() => remove(k)}
                style={styles.optionChip}
              >
                {toDisplayCase(k)}
              </Chip>
            );
          })
        )}
      </ThemedView>

      <ThemedView style={{ flex: 5 }} />

      {/* Filter Options*/}
      <ThemedScrollView contentContainerStyle={styles.optionsWrap}>
        {filteredOptions.map((opt) => (
          <Chip
            key={opt}
            mode="outlined"
            selected={selectedFilters.includes(opt)}
            onPress={() => toggle(opt)}
            //Brought changes here, shukria to fix the style bug

            style={[
              styles.optionChip,
              {
                backgroundColor: DietsValues.includes(opt as Diets)
                  ? "#9ae8db"
                  : AllergiesValues.includes(opt as Allergies)
                    ? "#f4deb4"
                    : "#d1cfcf",
              },
            ]}
          >
            {toDisplayCase(opt)}
          </Chip>
        ))}
      </ThemedScrollView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <Button onPress={() => setSelectedFilters([])}>Clear all</Button>
        <Button mode="contained" onPress={applyFilters}>
          Apply
        </Button>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
  },
  optionChip: { marginRight: 6, marginBottom: 6 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});
