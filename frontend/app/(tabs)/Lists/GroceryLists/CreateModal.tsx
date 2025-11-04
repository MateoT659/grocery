import CreateModalHeader from '@/components/lists/create-modal-header'
import { ThemedScrollView } from '@/components/themed/themed-scroll-view'
import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CreateModal() {
  const [page, setPage] = React.useState<number>(0);
  const router = useRouter();

  const nextPage = () => {
    if (page == 1) {
      //dismiss modal then view the new list
      router.back();
      router.push('/(tabs)/Lists/GroceryLists/ViewList');
    }
    setPage(page + 1);
  }

  const lastPage = () => {
    if (page == 0) {
      //dismiss modal
      router.back();
    }
    setPage(page - 1);
  }

  return (
    <ThemedView style={styles.rootContainer}>
      <CreateModalHeader leftText={["Cancel", "Back"]} rightText={["Next", "Generate"]} onLeftPress={lastPage} onRightPress={nextPage} page={page} />
      <ThemedScrollView style={styles.internalScrollContainer}>
        <ThemedText>CreateModal</ThemedText>
        <ThemedText>Page {page + 1}. To be made after generation.</ThemedText>
      </ThemedScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%'
  },
  internalScrollContainer: {
    paddingVertical: 24
  }
})