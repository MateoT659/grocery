import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import SettingsTab from '@/components/settings-tab';
import TabSeparator from '@/components/tab-seperator';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function AccountSettings() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>

      <TabSeparator />

      <SettingsTab 
          icon='settings' 
          title='Username' subtext={'Change your username'}
          route='/(tabs)/User/Allergies'
      />

      <TabSeparator />

      <SettingsTab 
          icon='settings' 
          title='Password' subtext={'Change your password'}
          route='/(tabs)/User/Allergies'
      />

      <TabSeparator />


      </ScrollView>
    </SafeAreaView>
  )
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