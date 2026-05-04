/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";

export function useThemePalette() {
  const color = useColorScheme();
  return Colors[color ?? "light"];
}
