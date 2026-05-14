import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedView } from "@/components/themed/themed-view";
import { useRouter } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import { Allergies, AllergiesValues, Diets, DietsValues, RecipeTag, RecipeTagValues } from "@/build/api_types";
import { FilterContext } from "@/contexts/filter-context";
import ThemedButton from "@/components/themed/themed-button";
import { ThemedChip } from "@/components/themed/themed-chip";
import { ThemedText } from "@/components/themed/themed-text";
import { useThemePalette } from "@/hooks/get-theme-color";
import { toDisplayCase } from "@/utils/ToDisplayCase";

//function to help with displaycase of the filter options

export default function FilterModal() {
  const router = useRouter();
  const theme = useThemePalette();
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


      <ThemedText type="subtitle">Selected Filters</ThemedText>

      {/* choose/unchoose fitler options provided */}
      <ThemedView style={styles.selectedWrap}>
        {selectedFilters.length === 0 ? (
          <ThemedText type="defaultItalic"> No filters selected </ThemedText>
        ) : (
          selectedFilters.map((k) => {
            return (
              <ThemedChip
                key={`sel-${k}`}
                onClose={() => remove(k)}
                style={styles.optionChip}
              >
                {toDisplayCase(k)}
              </ThemedChip>
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
        <ThemedButton onPress={() => setSelectedFilters([])} textColor="gray">
          Clear all
        </ThemedButton>
        <ThemedButton
          mode="contained"
          onPress={applyFilters}
          color={theme.positiveButton}
          textColor="white"
        >
          Apply
        </ThemedButton>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingVertical: 16,
  },
  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
