import { Image } from 'expo-image';
import {StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import GroceryList from '@/components/grocery-list';
import ExampleApiView from '@/components/example-api-view';

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  // Example API usage. Calls from the backend example API (ExampleController.java)
 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ExampleApiView />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery Lists Page! Another example</ThemedText>
        <HelloWave />
      </ThemedView>
      <GroceryList items={['bbq sauce', 'eggs', 'milk', 'bread']}/>
      <Link href="/(tabs)/Lists/Recipes"> <ThemedText>Go to recipes page</ThemedText> </Link>

    </ParallaxScrollView>
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
