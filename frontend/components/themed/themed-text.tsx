import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "defaultItalic"
    | "subtitle"
    | "link"
    | "button"
    | "small"
    | "smallItalic";
  invert?: boolean;
  themeColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  colorOverride?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  invert = false,
  themeColor = "text",
  colorOverride = undefined,
  ...rest
}: ThemedTextProps) {
  const color =
    colorOverride ||
    useThemeColor({ light: lightColor, dark: darkColor }, themeColor);

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "defaultItalic" ? styles.defaultItalic : undefined,
        type === "small" ? styles.small : undefined,
        type === "smallItalic" ? styles.smallItalic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  defaultItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: "grey",
  },
  small: {
    fontSize: 14,
    lineHeight: 18,
  },
  smallItalic: {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "italic",
    color: "grey",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
