import { GroceryList } from '@/build/api_types';
import CreateGroceryListCard from '@/components/lists/create-grocery-list-card';
import GroceryListCard from '@/components/lists/grocery-list-card';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import getAllGroceryLists from '@/requests/GroceryLists';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [groceryLists, setGroceryLists] = useState<GroceryList[]>([]);

  const COLORS = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC'];

  useEffect(() => {
    getAllGroceryLists().then((lists) => {
      setGroceryLists(lists);
    });
  }, []);

  return (
    <ThemedScrollView style={styles.rootContainer}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery Lists Page!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <CreateGroceryListCard />
        {groceryLists.map((list) => (
          <GroceryListCard key={list.id} groceryList={list} color={COLORS[list.id*2 % COLORS.length]} />
        ))}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 40,
  }
});
