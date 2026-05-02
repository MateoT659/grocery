import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet } from "react-native";
import { Chip, ChipProps } from "react-native-paper";

export type ThemedChipProps = ChipProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedChip({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedChipProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "chip",
  );

  return (
    <Chip
      style={[{ backgroundColor: backgroundColor }, styles.chipStyle, style]}
      {...otherProps}
    >
      {otherProps.children}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chipStyle: {},
});
