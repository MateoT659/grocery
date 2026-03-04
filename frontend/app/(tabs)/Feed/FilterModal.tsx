/* 1) when I click the filter icon on the home page, it pops up the filter page. 
2) In the search bar, user can filter by something the the seachers.
3) At the bottom I have some options for filter based on some topics that I have for filter page such as ingredient amounts, theme, ..
4) I want the user to be able click on icons of filter and they be chossen by showing up there. 
5) I want the user to be able to click on "x" and remove them from the seclected section on the top of the page. */

import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedView } from '@/components/themed/themed-view';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Chip, IconButton, Searchbar, Text } from 'react-native-paper';
// import { FilterOption, FilterOptionsArray } from '../../../constants/FilterOptions';
import { RecipeTag, RecipeTagValues } from '@/build/api_types';
import { FilterContext } from '@/contexts/filter-context';
// import { getRecipeTags } from '@/requests/Recipes';
import { ThemedText } from '@/components/themed/themed-text';

//properties 

export default function FilterModal() {
    const router = useRouter();  

    const { filters, setFilters } = useContext(FilterContext);
    const [filterQuery, setFilterQuery] = useState('');
    const[selectedFilters, setSelectedFilters] = useState<RecipeTag[]>(filters);

    const[filterOptions, setFilterOptions] = useState<RecipeTag[]>(RecipeTagValues as unknown as RecipeTag[]);
    

    const toggle = (tag: RecipeTag) => {setSelectedFilters((prev) => prev.includes(tag) ? prev.filter(k => k !==tag): [...prev, tag]); }; //remove the key when selected, otherwise add it
    const remove =  (tag: RecipeTag)  => {setSelectedFilters((prev) => prev.filter(k => k !==tag));}; //remove a key when click "x"
    const clearAll = () => setSelectedFilters([]); 

    //search filtering
    // const filteredOptions = useMemo(() => {
    //   const q = filterQuery.trim().toLowerCase(); //trim removes the white space
    //   if (!q) return filterOptions;
      
    //   return filterOptions.filter( tag => 
    //     tag.toLowerCase().includes(q)
    //   );
    // }, [filterQuery, filterOptions]);


    const applyFilters = () => {
        setFilters(selectedFilters);
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

        <ThemedText style={{paddingLeft: 20, fontWeight: 'bold'}}>Selected Filters</ThemedText>
        {/* choose/unchoose fitler options provided */}
        <ThemedView style={styles.selectedWrap}>
          {selectedFilters.length === 0 ? (
            <Text style={{ opacity: 0.6 }}> No filters selected </Text>
          ) : (
            selectedFilters.map(k => {
              const opt = filterOptions.find(o => o === k)!;
              return (
                <Chip key={`sel-${k}`} mode="outlined" onClose={() => remove(k)} style={styles.optionChip}>
                  {opt}
                </Chip>
              );
            })
          )}
        </ThemedView> 

        <ThemedView style={{ flex: 5}} />
        {/* Filter Options*/} 
        <ThemedScrollView contentContainerStyle={styles.optionsWrap}>
          {filterOptions.map(opt => (
            <Chip
              key={opt}
              mode="outlined"
              selected={selectedFilters.includes(opt)}
              onPress={() => toggle(opt)}
              style={styles.optionChip}
            >
              {opt}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 16,
  },
  optionChip: { marginRight: 6, marginBottom: 6 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
