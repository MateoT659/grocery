import { useThemeColor } from '@/hooks/use-theme-color'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from '../themed/themed-text'
import { ThemedView } from '../themed/themed-view'

export interface CreateModalHeaderProps {
  leftText: string
  rightText: string
}

export default function CreateModalHeader({ leftText, rightText }: CreateModalHeaderProps) {
  return (
    <ThemedView style={styles.rootContainer}>
      <ThemedView style={styles.leftBox}>
        <ThemedText style={{ textDecorationLine: 'underline' }}>{leftText}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.modalTab} />
      <ThemedView style={styles.rightBox}>
        <ThemedText style={{ textDecorationLine: 'underline', color: useThemeColor({ light: 'blue', dark: 'cyan' }, 'text') }}>{rightText}</ThemedText>
      </ThemedView>
      
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  leftBox: {
    alignItems: 'flex-start',

  },
  rightBox: {
    alignItems: 'flex-end',
  },
  modalTab: {
    borderRadius: 100,
    position: 'absolute',
    top: 8,
    right: '50%',
    left: '50%',
    width: 40,
    height: 5,
    backgroundColor: 'gray',
  }
})