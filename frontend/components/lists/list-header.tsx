import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../themed/themed-view';

export default function ListHeader() {
  const iconColor = useThemeColor({}, 'text');
  const iconColorUnavailable = useThemeColor({}, 'icon');
  const router = useRouter();
  const iconSize = 36;

  //this will eventulaly have to use a context that stores the list of visited pages
  return (
    <ThemedView style={styles.rootContainer}>
      <ThemedView style={styles.chevronContainer}>
        <Ionicons name='chevron-back' size={iconSize} color={router.canGoBack() ? iconColor : iconColorUnavailable} onPress={() => router.back()} />
        <Ionicons name='chevron-forward' size={iconSize} color={iconColor} onPressOut={() => {}} />
      </ThemedView>

      <ThemedView style={styles.actionIconContainer}>
        <Ionicons name='filter' size={iconSize} color={iconColor} />
        <Ionicons name='search' size={iconSize} color={iconColor} />
        <Ionicons name='add' size={iconSize} color={iconColor} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    borderColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 12,
  },
  chevronContainer: {
    flexDirection: 'row',
    gap: 32,
    width: '50%',
    
  },
  actionIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 32,
    width: '50%',
  },
});