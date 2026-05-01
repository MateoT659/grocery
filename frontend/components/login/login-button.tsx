import { Pressable, StyleSheet, Text } from "react-native";

type LoginButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};
export default function LoginButton({
  title,
  onPress,
  color = "rgba(43, 175, 25, 1)",
}: LoginButtonProps) {
  return (
    <Pressable
      style={[styles.loginButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
