import { useThemePalette } from "@/hooks/get-theme-color";
import { StyleSheet } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";

export type ThemedSearchbarProps = SearchbarProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSearchbar({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedSearchbarProps) {
  const theme = useThemePalette();

  return (
    <Searchbar
      style={[
        { backgroundColor: theme.card, color: theme.text },
        styles.chipStyle,
        style,
      ]}
      inputStyle={{ color: theme.text }}
      iconColor={theme.icon}
      traileringIconColor={theme.icon}
      {...otherProps}
    >
      {otherProps.children}
    </Searchbar>
  );
}

const styles = StyleSheet.create({
  chipStyle: {},
});
