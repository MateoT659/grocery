import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import TabSeparator from '@/components/tab-seperator';


export default function Allergies() {
  return (
    <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
            <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
            />
    
    }>
      <ThemedView>
        <ThemedText type="title">Allergies & Dietary Restrictions</ThemedText>
      </ThemedView>

    <TabSeparator />

      <ThemedView>
        <ThemedText type="subtitle">Add an Allergy</ThemedText>
      </ThemedView>
      
    <TabSeparator />

      <ThemedView>
        <ThemedText type="subtitle">Add a Dietary Restriction</ThemedText>
      </ThemedView>
  
    </ParallaxScrollView>

  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
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