import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

interface SearchModalComp {
  Visible: boolean;
  OnClose: () => void;
  OnSearch: (query: string) => void;  
}

export default function SearchModal({ Visible, OnClose, OnSearch }: SearchModalComp) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  //function to active search button
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

  //removes recent search
  const removeSearch = (term: string) => {
    setRecentSearches(recentSearches.filter(item => item !== term));
  };

  //use recent search to search- history
  const searchpress = (term: string) => {
    setSearchQuery(term);
    // optionally trigger a search immediately:
    // OnSearch(term); OnClose();
  };

  return (
    <Modal visible={Visible} animationType="slide" onRequestClose={OnClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Search Bar — matches FeedIndex.tsx props & feel */}
        <View style={{ padding: 16, backgroundColor: '#ffffffff' }}>
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus
            right={() => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { /* voice search */ }}>
        <Ionicons name="mic" size={20} color="#999" style={{ marginRight: 12 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={OnClose}>
        <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '500' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )}
/>

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
