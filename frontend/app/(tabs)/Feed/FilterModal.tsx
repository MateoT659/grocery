/* 1) when I click the filter icon on the home page, it pops up the filter page. 
2) In the search bar, user can filter by something the the seachers.
3) At the bottom I have some options for filter based on some topics that I have for filter page such as ingredient amounts, theme, ..
4) I want the user to be able click on icons of filter and they be chossen by showing up there. 
5) I want the user to be able to click on "x" and remove them from the seclected section on the top of the page. */

import {
  Allergies,
  AllergiesValues,
  Diets,
  DietsValues,
} from "@/build/api_types";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedView } from "@/components/themed/themed-view";
import { FilterContext } from "@/contexts/filter-context";
import { useRouter } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Chip, IconButton, Searchbar, Text } from "react-native-paper";

//properties
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

  type FilterKey = Diets | Allergies;

  const [selectedFilters, setSelectedFilters] = useState<FilterKey[]>([
    ...filterContext.includedDiets,
    ...filterContext.excludedAllergies,
  ]); //initialize with current filters in context

  const applyFilters = (filters: FilterKey[]) => {
    //update filter context
    const selectedDiets = selectedFilters.filter((f) =>
      DietsValues.includes(f),
    ) as Diets[];
    const selectedAllergies = selectedFilters.filter((f) =>
      AllergiesValues.includes(f),
    ) as Allergies[];

    filterContext.setExcludedAllergies(selectedAllergies);
    filterContext.setIncludedDiets(selectedDiets);
  };

  const toggle = (key: FilterKey) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }; //remove the key when selected, otherwise add it
  const remove = (key: FilterKey) => {
    setSelectedFilters((prev) => prev.filter((k) => k !== key));
  }; //remove a key when click "x"
  const clearAll = () => setSelectedFilters([]);

  //search filtering
  const filteredOptions: FilterKey[] = useMemo(() => {
    const q = filterQuery.trim().toLowerCase(); //trim removes the white space
    if (!q) return [...DietsValues, ...AllergiesValues] as FilterKey[]; //if there is no query, show all options
    return [...DietsValues, ...AllergiesValues].filter((opt) =>
      toDisplayCase(opt).toLowerCase().includes(q),
    ) as FilterKey[];
  }, [filterQuery]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* Header and close button */}
      <ThemedView style={styles.header}>
        <IconButton icon="close" onPress={() => router.back()} />
      </ThemedView>

      {/* Filter using-bar */}
      <ThemedView style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Searchbar
          placeholder="Filter by"
          value={filterQuery}
          onChangeText={setFilterQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </ThemedView>

      {/* choose/unchoose fitler options provided */}
      <ThemedView style={styles.selectedWrap}>
        {selectedFilters.length === 0 ? (
          <Text style={{ opacity: 0.6, marginLeft: 16 }}>
            {" "}
            No filters selected{" "}
          </Text>
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
        {filteredOptions.map((opt, idx) => (
          <Chip
            key={idx}
            mode="outlined"
            selected={selectedFilters.includes(opt)}
            onPress={() => toggle(opt)}
            style={
              (styles.optionChip,
              {
                backgroundColor: DietsValues.includes(opt)
                  ? "#9ae8db"
                  : "#f4deb4",
              })
            }
          >
            {toDisplayCase(opt)}
          </Chip>
        ))}
      </ThemedScrollView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <Button onPress={() => setSelectedFilters([])}>Clear all</Button>
        <Button
          mode="contained"
          onPress={() => {
            applyFilters(selectedFilters);
            router.back();
          }}
        >
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
