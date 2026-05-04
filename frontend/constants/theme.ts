/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const defaultColors = {
  lightgreen: "#98bf65",
  darkgreen: "#599d0f",
  lightpeach: "#D98586",
  darkpeach: "#D98586",
  card: "#F2F2F7",
  cardDark: "#e2e2ed",
  darkCard: "#2C2C2E",
  darkCardDark: "#252529",
};

export const LightColors = {
  text: "#11181C",
  background: "#fff",
  tint: tintColorLight,
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: defaultColors.darkgreen,
  card: defaultColors.card,
  darkCard: defaultColors.cardDark,
  positiveButton: defaultColors.lightgreen,
  negativeButton: defaultColors.lightpeach,
  taskBar: defaultColors.darkgreen,
  chip: defaultColors.card,
  link: "#53a6ff",
  errorMessage: "#914a4a",
};

export const DarkColors = {
  ...LightColors,
  text: "#ECEDEE",
  background: "#151718",
  tint: tintColorDark,
  icon: "#9BA1A6",
  tabIconDefault: "#9BA1A6",
  tabIconSelected: defaultColors.lightgreen,
  card: defaultColors.darkCard,
  chip: defaultColors.darkCard,
  darkCard: defaultColors.darkCardDark,
};

export const Colors = {
  light: LightColors,
  dark: DarkColors,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
