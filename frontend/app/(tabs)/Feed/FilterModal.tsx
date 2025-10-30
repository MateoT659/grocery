/* 1) when I click the filter icon on the home page, it pops up the filter page. 
2) In the search bar, user can filter by something the the seachers.
3) At the bottom I have some options for filter based on some topics that I have for filter page such as ingredient amounts, theme, ..
4) I want the user to be able click on icons of filter and they be chossen by showing up there. 
5) I want the user to be able to click on "x" and remove them from the seclected section on the top of the page. */

import {View, ScrollView, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FilterKey, FilterOption, FilterOptions} from '../../../constants/FilterOptions';
import { Chip, IconButton, Button, Text,Searchbar,Modal } from 'react-native-paper';



//properties 
  type props = {
    visible: boolean; //show or hide the filter page
    selected: FilterKey[];//current selection
    onClose: () => void;//cose the filter page
    onApply:(choosenFilters: FilterKey[]) => void //send the choosen filters back to home
  }

export default function FilterModal({visible, selected, onClose, onApply}:props) {
    // searchbar state
    const [FilterQuery, setFilterQuery] = useState('');
    const [localSelected, setLocalSelected] = useState <FilterKey[]> (selected);  //local select for users=> not committing the changes
    //reset local
    React.useEffect(() => setLocalSelected(selected), [selected, visible]);

    const toggle = (key: FilterKey) => {setLocalSelected((prev) => prev.includes(key) ? prev.filter(k => k !==key): [...prev, key]); }; //remove the key when selected, otherwise add it
    const remove =  (key: FilterKey)  => {setLocalSelected((prev) => prev.filter(k => k !==key));}; //remove a key when click "x"
    const clearAll = () => setLocalSelected([]); 

    //search filtering
    const filteredOptions: FilterOption[] = useMemo(() => {
      const q = FilterQuery.trim().toLowerCase(); //trim removes the white space
      if (!q) return FilterOptions;
      return FilterOptions.filter( opt => 
        opt.label.toLowerCase().includes(q)
      );
    }, [FilterQuery]);
      
  return (
      <Modal visible = {visible} onDismiss={onClose} contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text variant="titleMedium">Filter</Text>
          <IconButton icon="close" onPress={onClose} accessibilityLabel='Close Filter'/>
        </View>
        <Searchbar placeholder="Filter by" value={FilterQuery} onChangeText={setFilterQuery} style={styles.search} autoCorrect={false} autoCapitalize="none"/>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectedRow}>
          {localSelected.length === 0 ? (
            <Text style={{ opacity: 0.6 }}>No filters selected</Text>) : (
            localSelected.map(k => {
              const opt = FilterOptions.find(o => o.key === k)!;
              return (
                <Chip
                  key={`sel-${k}`}
                  style={styles.selectedChip}
                  selected
                  onClose={() => remove(k)}     // shows the little "x"
                >
                  {opt.label}
                </Chip>
              );
            })
          )}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.optionsWrap}>
          {filteredOptions.map(opt => {
            const isSelected = localSelected.includes(opt.key);
            return (
              <Chip
                key={opt.key}
                mode="outlined"
                selected={isSelected}
                onPress={() => toggle(opt.key)}
                style={styles.optionChip}
              >
                {opt.label}
              </Chip>
            );
          })}
        </ScrollView>
        <View style={styles.footer}>
          <Button onPress={clearAll}>Clear all</Button>
          <Button mode="contained" onPress={() => { onApply(localSelected); onClose(); }}>Apply
          </Button>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 12,
    maxHeight: '85%',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  search: { marginTop: 8, marginBottom: 8 },
  selectedRow: { gap: 8, paddingVertical: 8 },
  selectedChip: { marginRight: 8 },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 8,
  },
  optionChip: { marginRight: 6, marginBottom: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});