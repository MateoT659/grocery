import { Recipe } from "@/build/api_types";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemePalette } from "@/hooks/get-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface SearchModalComp {
  recentSearches: string[];
  removeSearch: (term: string) => void;
  searchResult: Recipe[] | null; //recieve recipes from FeedIndex
  handleSearchPage: (term: string) => void; //call FeedIndex to search
}

export default function SearchPage({
  recentSearches,
  removeSearch,
  searchResult,
  handleSearchPage,
}: SearchModalComp) {
  const router = useRouter();
  const theme = useThemePalette();
  if (searchResult !== null && searchResult.length > 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Results ({searchResult.length})</ThemedText>
        <FlatList
          data={searchResult}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => router.push(`/(tabs)/Feed/ViewPost/${item.id}`)}
              >
                <ThemedView style={styles.resultItem}>
                  <ThemedText>{item.name || "Recipe Name"}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
              <TabSeparator color="gray" />
            </>
          )}
          ListEmptyComponent={
            <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
              No recipes found.
            </ThemedText>
          }
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle"> Recent Searches </ThemedText>

      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <>
            <ThemedView style={styles.recentItem}>
              <TouchableOpacity
                style={styles.recentTextContainer}
                onPress={() => handleSearchPage(item)}
              >
                <ThemedText>{item}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeSearch(item)}
                style={styles.removeButton}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  color={theme.icon}
                />
              </TouchableOpacity>
            </ThemedView>
            <TabSeparator color="gray" />
          </>
        )}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      ></FlatList>
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
    fontWeight: "600",
    marginBottom: 16,
  },
  resultItem: {
    padding: 15,
    marginBottom: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  micIcon: {
    marginLeft: 0,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  recentTextContainer: {
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  separator: {
    height: 1,
  },
});
