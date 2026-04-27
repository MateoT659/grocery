import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { Stack } from "expo-router";
import React from "react";

export default function GroceryListsLayout() {
  return (
    <ThemedSafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GroceryListsIndex" />
        <Stack.Screen
          name="CreateModal"
          options={{ presentation: "modal", title: "Create Grocery List" }}
        />
      </Stack>
    </ThemedSafeAreaView>
  );
}
