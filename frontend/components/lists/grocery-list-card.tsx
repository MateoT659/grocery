import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../themed/themed-view';

export type GroceryListCardProps = {
  color?: string;
}

export default function GroceryListCard({ color, ...props}: GroceryListCardProps) {
  const topColor = color ? color : 'lightgray';
  const bottomColor = color ? darkenColor(color, 0.2) : 'gray';

  function darkenColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount));
    const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }
  return (
    <ThemedView style ={styles.container}>
      <ThemedView style = {[styles.topNoteDiv, { backgroundColor: topColor }]} />
      <ThemedView style = {[styles.bottomNoteDiv, { backgroundColor: bottomColor }]} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    aspectRatio: 1,
  },
  topNoteDiv: {
    aspectRatio: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bottomNoteDiv: {
    position: 'absolute',
    zIndex: 0,
    bottom: -3,
    aspectRatio: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-5deg' }],
  },

})