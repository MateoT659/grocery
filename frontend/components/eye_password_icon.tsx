import { useThemePalette } from "@/hooks/get-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type EyePasswordIconProps = {
  onPress: () => void;
  showPassword: boolean;
};

export default function EyePasswordIcon({
  onPress,
  showPassword,
}: EyePasswordIconProps) {
  const theme = useThemePalette();
  return (
    <TouchableOpacity style={styles.eyeIcon} onPress={onPress}>
      <Ionicons
        name={showPassword ? "eye-off" : "eye"}
        size={22}
        color={theme.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
  },
});
