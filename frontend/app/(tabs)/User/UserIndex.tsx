import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import SettingsTab from '@/components/settings-tab';
import TabSeparator from '@/components/tab-seperator';

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User page. this one is also an example.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>

        <TabSeparator />

        <SettingsTab 
          icon='nutrition' 
          title='Allergies' subtext={'Set your allergies!'}
          route='/(tabs)/User/Allergies'
        />

        <TabSeparator />

        <SettingsTab 
          icon='accessibility' 
          title='Accessibilities' subtext={'Set your preferences!'}
          route='/(tabs)/User/Accessibility'
        />
        <TabSeparator />

     
      </ThemedView>
    
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
