import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../themed/themed-view';


export default function CreateGroceryListCard() {

  return (
    <Link href={"/(tabs)/Lists/CreateModal"} style={styles.container}>
    <ThemedView style={styles.internalContainer}>
      <ThemedView style={styles.createOutline}>
        <Ionicons name='add-circle-outline' size={64} color='gray' />
      </ThemedView>
    </ThemedView>
    </Link>

  )
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
  createOutline: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'gray',
    aspectRatio: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderRadius: 45,
  }
})