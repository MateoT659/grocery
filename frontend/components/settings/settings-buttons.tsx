import { useThemePalette } from "@/hooks/get-theme-color";
import { StyleSheet } from "react-native";
import ThemedButton from "../themed/themed-button";
import { ThemedText } from "../themed/themed-text";

type SettingsButtonProps = {
  title: string;
  onPress: () => void;
};
export default function SettingsButton({
  title,
  onPress,
}: SettingsButtonProps) {
  const theme = useThemePalette();
  return (
    <ThemedButton
      style={{
        backgroundColor: theme.positiveButton,
      }}
      onPress={onPress}
    >
      <ThemedText type="small" style={styles.buttonText}>
        {title}
      </ThemedText>
    </ThemedButton>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    // borderColor: 'black',
    // borderWidth: 0.5,
    padding: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
