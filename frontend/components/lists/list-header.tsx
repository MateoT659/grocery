import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../themed/themed-view';

export default function ListHeader() {
  const iconColor = useThemeColor({}, 'text');
  return (
    <ThemedView style={styles.rootContainer}>
      <ThemedView style={styles.chevronContainer}>
        <Ionicons name='chevron-back' size={24} color={iconColor} />
        <Ionicons name='chevron-forward' size={24} color={iconColor} />
      </ThemedView>

      <ThemedView style={styles.actionIconContainer}>
        <Ionicons name='filter' size={24} color={iconColor} />
        <Ionicons name='search' size={24} color={iconColor} />
        <Ionicons name='add' size={24} color={iconColor} />
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
    gap: 20,
    width: '50%',
    
  },
  actionIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    width: '50%',
  },
});