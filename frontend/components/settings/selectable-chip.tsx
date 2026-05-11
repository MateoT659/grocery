import { useThemePalette } from "@/hooks/get-theme-color";
import { StyleSheet } from "react-native";
import { ThemedChip } from "../themed/themed-chip";
import { ThemedText } from "../themed/themed-text";

type SelectableChipProps = {
  title: string;
  onPress: () => void;
  isPressed?: boolean;
  selectedIcon?: string;
  unselectedIcon?: string;
};
export default function SelectableChip({
  title,
  onPress,
  isPressed,
  selectedIcon = "check",
  unselectedIcon = "plus",
}: SelectableChipProps) {
  const theme = useThemePalette();
  return (
    <ThemedChip
      selected={isPressed}
      icon={isPressed ? selectedIcon : unselectedIcon}
      onPress={onPress}
      selectedColor={theme.positiveButton}
      style={isPressed && { backgroundColor: theme.positiveButton }}
    >
      <ThemedText style={styles.text} type={"small"}>
        {title}
      </ThemedText>
    </ThemedChip>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});
