import { getThemeColors } from "@/hooks/get-theme-color";
import { Pressable, StyleSheet, Text } from "react-native";

type SettingsButtonProps = {
  title: string;
  onPress: () => void;
};
export default function SettingsButton({
  title,
  onPress,
}: SettingsButtonProps) {
  const theme = getThemeColors();
  return (
    <Pressable
      style={{
        ...styles.settingsButton,
        backgroundColor: theme.positiveButton,
      }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    // borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginLeft: 46,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
