import { useThemePalette } from "@/hooks/get-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function CreateGroceryListCard() {
  const theme = useThemePalette();
  return (
    <Link href={"/(tabs)/Lists/CreateModal"} style={styles.container}>
      <Ionicons name="add-circle-outline" size={40} color={theme.icon} />
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
});
