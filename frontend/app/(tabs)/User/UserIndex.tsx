import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import SettingsTab from '@/components/settings/settings-tab';
import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  
  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
        
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
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
    backgroundColor: 'white'
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    margin: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  stepContainer: {
    marginBottom: 8,
  },
});
