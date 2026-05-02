import { getThemeColors } from "@/hooks/get-theme-color";
import { StyleSheet } from "react-native";
import { ThemedChip } from "../themed/themed-chip";
import { ThemedText } from "../themed/themed-text";

type SelectableChipProps = {
  title: string;
  onPress: () => void;
  isPressed?: boolean;
};
export default function SelectableChip({
  title,
  onPress,
  isPressed,
}: SelectableChipProps) {
  const theme = getThemeColors();
  return (
    <ThemedChip
      selected={isPressed}
      icon={isPressed ? "check" : "plus"}
      onPress={onPress}
      selectedColor="green"
      style={isPressed && { backgroundColor: theme.positiveButton }}
    >
      <ThemedText style={styles.text}>{title}</ThemedText>
    </ThemedChip>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    textAlign: "center",
  },
});
