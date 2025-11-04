import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
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
    if (!q) return;

    if (!recentSearches.includes(q)) {
      setRecentSearches([q, ...recentSearches]);
    }
    setSearchQuery('');

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
      <Searchbar
        ref={searchbarRef} placeholder="Search" value={searchQuery} 
        onChangeText={setSearchQuery} onFocus={handleSearchPress} 
        
        onSubmitEditing={() => {
        handleSearch();
        }}
        traileringIcon={'filter'}
        onTraileringIconPress={handleFilterPress}
        onBlur={handleSearchCancel}
      />

        {/* eventually make it so these smoothly fade to transition */}
      {
        searchbarFocused ? (
          <SearchPage recentSearches={recentSearches} removeSearch={removeSearch} />
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
});