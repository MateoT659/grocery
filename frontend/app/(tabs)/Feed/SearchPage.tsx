import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';


interface SearchModalComp {
  recentSearches: string[];
  removeSearch: (term: string) => void;
}

export default function SearchPage({ recentSearches, removeSearch }: SearchModalComp) {

  return (
        <ThemedView style={styles.container}>
          <ThemedText style={styles.recentTitle}>Recent Searches</ThemedText>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ThemedView style={styles.recentItem}>
                <TouchableOpacity
                  style={styles.recentTextContainer}
                  onPress={() => { /* handle recent press - search for this item */ }}
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
