import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../themed/themed-view";

export default function ListHeader() {
  const iconColor = useThemeColor({}, "text");
  const iconColorUnavailable = useThemeColor({}, "icon");
  const router = useRouter();
  const iconSize = 30;

  //this will eventulaly have to use a context that stores the list of visited pages
  return (
    <ThemedView style={styles.rootContainer}>
      <ThemedView style={styles.chevronContainer}>
        <Ionicons
          name="chevron-back"
          size={iconSize}
          color={
            router.canGoBack() ? iconColorUnavailable : iconColorUnavailable
          }
          onPress={() => router.back()}
        />
        <Ionicons
          name="chevron-forward"
          size={iconSize}
          color={iconColorUnavailable}
          onPressOut={() => {}}
        />
      </ThemedView>

      <ThemedView style={styles.actionIconContainer}>
        <Ionicons name="filter" size={iconSize} color={iconColorUnavailable} />
        <Ionicons name="search" size={iconSize} color={iconColorUnavailable} />
        <Ionicons name="add" size={iconSize} color={iconColorUnavailable} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 12,
  },
  chevronContainer: {
    flexDirection: "row",
    gap: 32,
    width: "50%",
  },
  actionIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 32,
    width: "50%",
  },
  card_body: {
    flexDirection: "row",
    backgroundColor: "#f5f2f7ff",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  right_side: {
    backgroundColor: "#f5f2f7ff",
    flex: 1,
  },
  title_text: {
    color: "black",
    marginBottom: 10,
  },
  description_text: {
    color: "black",
    flexWrap: "wrap",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  icons: {
    marginTop: 10,
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#f5f2f7ff",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    backgroundColor: "#f5f2f7ff",
  },
  tagBadge: {
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f5f2f7ff",
  },
});
