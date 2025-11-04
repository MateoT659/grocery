import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SearchModal from './SearchModal';
import FilterModal from './FilterModal'
import { FilterKey} from '../../../constants/FilterOptions';

export default function HomeScreen() {
  // searchbar state
  const [searchQuery, setSearchQuery] = useState('');
  // search modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  // filter modal state
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterKey[]>([]);

  const searchbarRef = useRef<TextInput>(null);

  const handleSearchPress = () => {
    setIsModalVisible(true);
    if (searchbarRef.current) {
      searchbarRef.current.blur();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // search logic here
  };

  const openFilter = () => setIsFilterVisible(true);

  const applyFilters = (filters: FilterKey[]) => {
    setSelectedFilters(filters);
    // Example: call your data fetcher with the chosen filters
    console.log('Apply filters:', filters);
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
          />
        }>
        <Searchbar
          ref={searchbarRef} placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} onFocus={handleSearchPress} onSubmitEditing={() => {
            //search in the database for things, store recent searches in local storage
          }}
          traileringIcon={'filter'}
          onTraileringIconPress={() => {
            //open filter modal
            //alert('Filter button pressed');
            openFilter();
          }}
        />

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Feed Page</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Recipe 1</ThemedText>
          <ThemedText>
            {`Tap to explore mroe about the recipe`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">Recipe 2</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert('Share pressed')}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert('Delete pressed')}
                />
              </Link.Menu>
            </Link.Menu>
          </Link>

          <ThemedText>
            {`Tap to explore mroe about the recipe`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Recipe 3</ThemedText>
          <ThemedText>
            {`Tap to explore mroe about the recipe`}
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>

      <SearchModal
        Visible={isModalVisible}
        OnClose={handleCloseModal}
        OnSearch={handleSearch}
      />
      <FilterModal
        visible={isFilterVisible}
        selected={selectedFilters}
        onClose={() => setIsFilterVisible(false)}
        onApply={applyFilters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});