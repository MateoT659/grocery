import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";

export interface CreateModalHeaderProps {
  leftText: string[];
  onLeftPress?: () => void;
  rightText: string[];
  onRightPress?: () => void;
  page?: number;
}

export default function CreateModalHeader({
  leftText,
  onLeftPress,
  rightText,
  onRightPress,
  page = 0,
}: CreateModalHeaderProps) {
  return (
    <ThemedView style={styles.rootContainer}>
      <TouchableOpacity style={styles.leftBox} onPress={onLeftPress}>
        <ThemedText>{leftText[page]}</ThemedText>
      </TouchableOpacity>
      <ThemedView style={styles.modalTab} />
      <TouchableOpacity style={styles.rightBox} onPress={onRightPress}>
        <ThemedText
          style={{
            color: useThemeColor({}, "link"),
          }}
        >
          {rightText[page]}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  leftBox: {
    alignItems: "flex-start",
  },
  rightBox: {
    alignItems: "flex-end",
  },
  modalTab: {
    borderRadius: 100,
    position: "absolute",
    top: 8,
    right: "50%",
    left: "50%",
    width: 40,
    height: 5,
    backgroundColor: "gray",
  },
});
