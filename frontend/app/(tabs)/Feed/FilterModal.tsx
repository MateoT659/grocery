/* 1) when I click the filter icon on the home page, it pops up the filter page. 
2) In the search bar, user can filter by something the the seachers.
3) At the bottom I have some options for filter based on some topics that I have for filter page such as ingredient amounts, theme, ..
4) I want the user to be able click on icons of filter and they be chossen by showing up there. 
5) I want the user to be able to click on "x" and remove them from the seclected section on the top of the page. */

import React, { useMemo, useState, useEffect } from 'react';
import { Modal, StatusBar, StyleSheet } from 'react-native';
import { Button, Chip, Searchbar, Text, IconButton } from 'react-native-paper';
import { FilterKey, FilterOption, FilterOptionsArray} from '../../../constants/FilterOptions';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import {ThemedView} from '@/components/themed/themed-view'; 
import {ThemedScrollView} from '@/components/themed/themed-scroll-view'; 





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
    useEffect(() => setLocalSelected (selected), [selected, visible]); 

    const toggle = (key: FilterKey) => {setLocalSelected((prev) => prev.includes(key) ? prev.filter(k => k !==key): [...prev, key]); }; //remove the key when selected, otherwise add it
    const remove =  (key: FilterKey)  => {setLocalSelected((prev) => prev.filter(k => k !==key));}; //remove a key when click "x"
    const clearAll = () => setLocalSelected([]); 

    //search filtering
    const filteredOptions: FilterOption[] = useMemo(() => {
      const q = FilterQuery.trim().toLowerCase(); //trim removes the white space
      if (!q) return FilterOptionsArray;
      return FilterOptionsArray.filter( opt => 
        opt.label.toLowerCase().includes(q)
      );
    }, [FilterQuery]);
      
  return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        
      <ThemedSafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header and close button */}
        <ThemedView style={styles.header}>
          <IconButton icon="close" onPress={onClose} />
        </ThemedView>

        {/* Filter using-bar */}
        <ThemedView style={{ paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#fff' }}>
          <Searchbar
            placeholder="Filter by" value={FilterQuery} onChangeText={setFilterQuery} autoCorrect={false} autoCapitalize="none" />
        </ThemedView>

        {/* choose/unchoose fitler options provided */}
        <ThemedView style={styles.selectedWrap}>
          {localSelected.length === 0 ? (
            <Text style={{ opacity: 0.6, marginLeft: 16 }}> No filters selected </Text>
          ) : (
            localSelected.map(k => {
              const opt = FilterOptionsArray.find(o => o.key === k)!;
              return (
                <Chip key={`sel-${k}`} mode="outlined" onClose={() => remove(k)} style={styles.optionChip}>
                  {opt.label}
                </Chip>
              );
            })
          )}
        </ThemedView> 

        <ThemedView style={{ flex: 5}} />
        {/* Filter Options*/} 
        <ThemedScrollView contentContainerStyle={styles.optionsWrap}>
          {filteredOptions.map(opt => (
            <Chip
              key={opt.key}
              mode="outlined"
              selected={localSelected.includes(opt.key)}
              onPress={() => toggle(opt.key)}
              style={styles.optionChip}
            >
              {opt.label}
            </Chip>
          ))}
        </ThemedScrollView> 

        {/* Footer */}
        <ThemedView style={styles.footer}>
          <Button onPress={() => setLocalSelected([])}>Clear all</Button>
          <Button mode="contained" onPress={() => { onApply(localSelected); onClose(); }}>
            Apply
          </Button>
        </ThemedView>
      </ThemedSafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {flex: 3, backgroundColor: '#fff' },
  header: { paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' },
  selectedWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, paddingVertical: 16},
  optionsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 16 },
  optionChip: { marginRight: 6, marginBottom: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#eee' },
});
