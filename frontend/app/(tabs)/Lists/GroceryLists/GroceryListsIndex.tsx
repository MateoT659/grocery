import ExampleApiView from '@/components/example-api-view';
import { HelloWave } from '@/components/hello-wave';
import GroceryList from '@/components/lists/grocery-list';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      <ExampleApiView />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery Lists Page! Another example</ThemedText>
        <HelloWave />
      </ThemedView>
      <GroceryList items={['bbq sauce', 'eggs', 'milk', 'bread']}/>
      <Link href="/(tabs)/Lists/Recipes"> <ThemedText>Go to recipes page</ThemedText> </Link>
    </ThemedSafeAreaView>
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
