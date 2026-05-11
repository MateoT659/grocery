import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./themed/themed-view";

interface FilterHeaderProps {
  onBack?: () => void;
}

export default function FilterHeader({ onBack }: FilterHeaderProps) {
  const iconColorUnavailable = useThemeColor({}, "icon");
  const router = useRouter();
  const iconSize = 30;

  return (
    <ThemedView style={styles.header}>
      <Ionicons
        name="chevron-back"
        size={iconSize}
        color={iconColorUnavailable}
        onPress={onBack ?? (() => router.back())}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
});
