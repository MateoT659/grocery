import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type EyePasswordIconProps = {
  onPress: () => void;
  showPassword: boolean;
};

export default function EyePasswordIcon({
  onPress,
  showPassword,
}: EyePasswordIconProps) {
  return (
    <Pressable style={styles.eyeIcon} onPress={onPress}>
      <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} />
    </Pressable>
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
