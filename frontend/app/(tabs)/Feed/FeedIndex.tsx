import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import FeedPage from './FeedPage';
import SearchPage from './SearchPage';

export default function HomeScreen() {
  const router = useRouter();
  //acts as a routing page to route data and the user between the feed page, search page, and filter modal

  // searchbar state
  const [searchbarFocused, setSearchbarFocused] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(["Eggs", "Milk", "Bread"]);

  const searchbarRef = useRef<TextInput>(null);

  const handleSearchPress = () => {
    setSearchbarFocused(true);
  };

  const handleSearchCancel = () => {
    setSearchbarFocused(false);
    setSearchQuery('');
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q){
      handleSearchCancel();
      return;
    }

    if (!recentSearches.includes(q)) {
      setRecentSearches([q, ...recentSearches]);
    }
    handleSearchCancel();
    //handle the rest of the search by calling an API or filtering data
  };

  const removeSearch = (term: string) => {
    setRecentSearches(recentSearches.filter(item => item !== term));
  };

  const handleFilterPress = () => {
    if (searchbarRef.current) {
      searchbarRef.current.blur();
    }
    router.push('/(tabs)/Feed/FilterModal');
  }

  

  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      <View style={styles.searchContainer}>
        <Searchbar
        style={styles.searchBar}
        ref={searchbarRef} placeholder="Search" value={searchQuery} 
        
        onChangeText={setSearchQuery} 
        onFocus={handleSearchPress} 
        
        onSubmitEditing={() => {
          handleSearch();
        }}
        traileringIcon={'filter'}
        onTraileringIconPress={handleFilterPress}
      />
      {searchbarFocused && 
        <TouchableOpacity onPress={() => {searchbarRef.current?.blur(); handleSearchCancel();}}> 
          <ThemedText style={styles.cancelButton}>
            Cancel
          </ThemedText>
        </TouchableOpacity>}
      </View>
      


        {/* eventually make it so these smoothly fade to transition */}
      {
        searchbarFocused ? (
          <SearchPage recentSearches={recentSearches} removeSearch={removeSearch} dismissSearchPage={handleSearchCancel} />
        ) : (
          <FeedPage/>
        )
      }
      
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 10,
  },
  searchBar: {
    flex: 1,
  },
});