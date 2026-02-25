import { FilterContextProvider } from "@/contexts/filter-context";
import { Stack } from "expo-router";
import React from "react";

export default function FeedLayout() {
  return (
    <FilterContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FeedIndex" />
        <Stack.Screen name="FilterModal" options={{ presentation: "modal" }} />
      </Stack>
    </FilterContextProvider>
  );
}
