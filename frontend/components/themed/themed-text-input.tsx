import { StyleSheet } from "react-native";

import { useThemePalette } from "@/hooks/get-theme-color";
import { TextInput, TextInputProps } from "react-native-paper";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const theme = useThemePalette();

  return (
    <TextInput
      style={[{ backgroundColor: theme.card }, styles.container, style]}
      textColor={theme.text}
      selectionColor={theme.positiveButton}
      underlineColor="#00000000"
      activeUnderlineColor={theme.positiveButton}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 5, margin: 5 },
});
