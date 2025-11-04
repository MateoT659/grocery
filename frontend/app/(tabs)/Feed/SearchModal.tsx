import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import {ThemedView} from '@/components/themed/themed-view';
import {ThemedText} from '@/components/themed/themed-text';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';


interface SearchModalComp {
  Visible: boolean;
  OnClose: () => void;
  OnSearch: (query: string) => void;  
}

export default function SearchModal({ Visible, OnClose, OnSearch }: SearchModalComp) {

  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['']);

  //function to active search button
  //Here the changes are just saving the searchQuery to a constant
  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;

    if (!recentSearches.includes(q)) {
      setRecentSearches([q, ...recentSearches]);
    }
    OnSearch(q);
    setSearchQuery('');
    OnClose();
  };

  //cancle option
  const handleClose = () => {
    setSearchQuery('');
    OnClose();
  };

  //remove recent search
  const removeSearch = (term: string) => {
    setRecentSearches(recentSearches.filter(item => item !== term));
  };

  //use recent search to search- history
  const searchpress = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <Modal visible={Visible} animationType="slide" onRequestClose={OnClose} presentationStyle="fullScreen" >

      <ThemedSafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

          {/* Search Bar */}
          <ThemedView style={{ padding: 16, backgroundColor: '#ffffffff' }}>
            <Searchbar
              placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} onSubmitEditing={handleSearch} autoFocus right={() => (
              <ThemedView style={{ flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity onPress={() => { /* voice search */ }}>
                  <Ionicons name="mic" size={20} color="#999" style={{ marginRight: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={OnClose}>
                  <ThemedText style={{ color: '#007AFF', fontSize: 16, fontWeight: '500' }}>Cancel</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          />
        </ThemedView>

        {/* Recent Searches */}
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.recentTitle}>Recent Searches</ThemedText>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ThemedView style={styles.recentItem}>
                <TouchableOpacity
                  style={styles.recentTextContainer}
                  onPress={() => searchpress(item)}
                >
                  <ThemedText style={styles.recentText}>{item}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeSearch(item)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle-outline" size={22} color="#999" />
                </TouchableOpacity>
              </ThemedView>
            )}
            ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
          />
        </ThemedView>
      </ThemedSafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c2c2c',},
  micIcon: {marginLeft: 0},
  cancelButton: {marginRight: 10},
  cancelText: {color: '#007AFF',fontSize: 16,fontWeight: '500'},
  contentContainer: {flex: 1,backgroundColor: '#fff',padding: 16},
  recentTitle: {fontSize: 18, fontWeight: '600', marginBottom: 16,color: '#000'},
  recentItem: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12},
  recentTextContainer: {flex: 1},
  recentText: {fontSize: 16,color: '#333'},
  removeButton: {padding: 4},
  separator: {height: 1, backgroundColor: '#e5e5e5'},
});
