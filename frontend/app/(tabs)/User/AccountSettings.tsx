import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import ParallaxScrollView from '@/components/parallax-scroll-view';
import SettingsTab from '@/components/settings-tab';
import TabSeparator from '@/components/tab-seperator';
import { Image } from 'expo-image';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function AccountSettings() {
  return (
    <SafeAreaView>
      <ScrollView>
      <ThemedView>
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