import { Recipe } from "@/build/api_types";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedSearchbar } from "@/components/themed/themed-searchbar";
import { ThemedText } from "@/components/themed/themed-text";
import { useThemePalette } from "@/hooks/get-theme-color";
import { searchRecipes } from "@/requests/Search";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FeedPage from "./FeedPage";
import SearchPage from "./SearchPage";

export default function FeedIndex() {
  return <HomeScreen />;
}

function HomeScreen() {
  const theme = useThemePalette();
  const router = useRouter();
  //acts as a routing page to route data and the user between the feed page, search page, and filter modal

  // searchbar state
  const [searchbarFocused, setSearchbarFocused] = useState(false);
  const searchbarRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Egg",
    "Milk",
    "Bread",
  ]);

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  const handleSearchPress = () => {
    setSearchbarFocused(true);
  };

  const handleSearchCancel = () => {
    setSearchbarFocused(false);
    setSearchQuery("");
    setRecipes([]); //clear results when canceling
  };

  const HandleSearch = (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) {
      Alert.alert("Please enter a search term");
      return;
    }

    if (!recentSearches.includes(q)) {
      setRecentSearches([q, ...recentSearches]);
    }

    searchRecipes(q).then((recipesData) => {
      setRecipes(recipesData);
    });

    searchbarRef.current?.blur();
  };

  const removeSearch = (term: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== term));
  };

  const handleFilterPress = () => {
    if (searchbarRef.current) {
      searchbarRef.current.blur();
    }
    router.push("/(tabs)/Feed/FilterModal");
  };
  return (
    <ThemedSafeAreaView edges={["top"]} style={styles.rootContainer}>
      <View style={styles.searchContainer}>
        <ThemedSearchbar
          style={[styles.searchBar]}
          ref={searchbarRef}
          placeholder="Search"
          placeholderTextColor={"grey"}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (recipes) setRecipes([]); //clear results if user start typing
          }}
          onFocus={handleSearchPress}
          onSubmitEditing={() => {
            HandleSearch(searchQuery);
          }}
          traileringIcon={"filter"}
          onTraileringIconPress={handleFilterPress}
        />
        {searchbarFocused && (
          <TouchableOpacity
            onPress={() => {
              searchbarRef.current?.blur();
              handleSearchCancel();
            }}
          >
            <ThemedText style={[styles.cancelButton, { color: theme.link }]}>
              Cancel
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      {searchbarFocused ? (
        <SearchPage
          recentSearches={recentSearches}
          removeSearch={removeSearch}
          searchResult={recipes}
          handleSearchPage={(term) => {
            setSearchQuery(term);
            HandleSearch(term);
          }}
        />
      ) : (
        <FeedPage />
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 10,
  },
  searchBar: {
    flex: 1,
  },
});
