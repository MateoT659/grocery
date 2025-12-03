import { GroceryList } from '@/build/api_types';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

export type GroceryListCardProps = {
  color?: string;
  groceryList?: GroceryList;
}

export default function GroceryListCard({ color, groceryList, ...props}: GroceryListCardProps) {
  const topColor = color ? color : 'lightgray';
  const bottomColor = color ? darkenColor(color, 0.2) : 'gray';

  function darkenColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount));
    const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  function isDarkColor(hex: string): boolean {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = (num >> 16);
    const g = ((num >> 8) & 0x00ff);
    const b = (num & 0x0000ff);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }

  return (
    <Link href={`/Lists/ViewList?id=${groceryList?.id}`} style={styles.container}>
      <ThemedView style={styles.internalContainer}>
        
        <ThemedView style={[styles.topNoteDiv, { backgroundColor: topColor }]}>
          <ThemedView style={styles.textContainer}>
            <ThemedText style={[styles.title, { color: isDarkColor(topColor) ? 'white' : 'black' }]}>{groceryList?.name}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={[styles.bottomNoteDiv, { backgroundColor: bottomColor }]} />
      
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    aspectRatio: 1,
  },
  internalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  textContainer: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title:{
    fontWeight: 'bold',
    textAlign: 'center',
  }

})