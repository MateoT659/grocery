import CreateGroceryListCard from '@/components/lists/create-grocery-list-card';
import GroceryListCard from '@/components/lists/grocery-list-card';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedScrollView style={styles.rootContainer}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery Lists Page!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <CreateGroceryListCard />
        <GroceryListCard color='#FF5733'/>
        <GroceryListCard color='#3cc9cbff'/>
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
