import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons'

interface SearchModalComp {
  Visible: boolean;
  OnClose: () => void;
  OnSearch: (query: string) => void;  
}

export default function SearchModal ({Visible, OnClose, OnSearch}: SearchModalComp) {

const [searchQuery, setSearchQuery] = useState('');
const [recentSearches, setRecentSearches] = useState(['']);

//function to active search button
const handleSearch = () => {
  if (searchQuery.trim()){
    if (!recentSearches.includes(searchQuery.trim())){
      setRecentSearches([searchQuery.trim(), ...recentSearches]);
    }
  }
  OnSearch(searchQuery);
  setSearchQuery('');
  OnClose();
}

//cancle option 
const handleClose = () => {
  setSearchQuery('');
  OnClose();
}

//removes recent search
const removeSearch = (term : string) => {
  setRecentSearches(recentSearches.filter(item => item !== term));
}

//use recent search to search- history
const searchpress = (term: string) => {
  setSearchQuery(term);
}

return(
  <Modal visible={Visible} animationType="slide" onRequestClose={OnClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              autoFocus
              returnKeyType="search"
            />
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="mic" size={20} color="#999" style={styles.micIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={OnClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.contentContainer}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.recentItem}>
                <TouchableOpacity
                  style={styles.recentTextContainer}
                  onPress={() => searchpress(item)}
                >
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeSearch(item)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle-outline" size={22} color="#999" />
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
  },
  searchContainer: {
    backgroundColor: '#e5e5e5',
    padding: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  micIcon: {
    marginLeft: 8,
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  recentTextContainer: {
    flex: 1,
  },
  recentText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
  },
});