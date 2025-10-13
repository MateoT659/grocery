import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import SettingsTab from '@/components/settings-tab';
import TabSeparator from '@/components/tab-seperator';
import { SafeAreaView } from 'react-native-safe-area-context';

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  
  return (
    <SafeAreaView>
      <ScrollView>
        
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Sam Smith</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>

          <TabSeparator />

          <SettingsTab 
            icon='settings' 
            title='Account Settings' subtext={'username, password, etc.'}
            route='/(tabs)/User/AccountSettings'
          />
          
          <TabSeparator />

          <SettingsTab 
            icon='heart' 
            title='Favorite Recipes' subtext={'See recipes you have saved!'}
            route='/(tabs)/User/Allergies'
          />

          <TabSeparator />

          <SettingsTab 
            icon='nutrition' 
            title='Allergies & Dietary Restrictions' subtext={'Set your allergies!'}
            route='/(tabs)/User/Allergies'
          />

          <TabSeparator />

          <SettingsTab 
            icon='accessibility' 
            title='Accessibility' subtext={'Set your preferences!'}
            route='/(tabs)/User/Accessibility'
          />
          <TabSeparator />

      
        </ThemedView>
      
      </ScrollView>
    </SafeAreaView>
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
