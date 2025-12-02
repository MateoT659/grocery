import { Recipe } from '@/build/api_types';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';


interface SearchModalComp {
  recentSearches: string[];
  removeSearch: (term: string) => void;
  searchResult: Recipe[]; //recieve recipes from FeedIndex
  handleSearchPage: (term: string) => void; //call FeedIndex to search
}

export default function SearchPage({ 
  recentSearches, 
  removeSearch, 
  searchResult, 
  handleSearchPage
 }: SearchModalComp) {

  if(searchResult !== null){
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.sectionTitle}>
          Restuls ({searchResult.length})
          </ThemedText>

          <FlatList
            data={searchResult}
            keyExtractor={(item)=> item.id ? item.id.toString() : Math.random().toString()}
            renderItem={({ item }) => (
              <ThemedView style={styles.resultItem}>
                <ThemedText style={styles.resultTitle}>{item.name || "Recipe Name"}</ThemedText>
              </ThemedView>
            )}
            ListEmptyComponent={
            <ThemedText style={{marginTop: 20, textAlign: 'center'}}>
              No recipes found.
            </ThemedText>
            }
            />
        </ThemedView>
        );
  }
   
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Recent Searches</ThemedText>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ThemedView style={styles.recentItem}>
            <TouchableOpacity
              style={styles.recentTextContainer}
              onPress={() => handleSearchPage(item)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5
  },
  resultTitle: {
    fontSize: 16, 
    fontWeight: 'bold'
  },
  micIcon: {
    marginLeft: 0,
  },
  cancelButton: {
    marginRight: 10,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
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
  },
  removeButton: {
    padding: 4,
  },
  separator: {
    height: 1,
  },
});
