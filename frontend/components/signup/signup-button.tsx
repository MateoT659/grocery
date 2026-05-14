import { useThemePalette } from "@/hooks/get-theme-color";
import { StyleSheet } from "react-native";
import ThemedButton from "../themed/themed-button";

type SignupButtonProps = {
  title: string;
  onPress: () => void;
};

export default function SignupButton({ title, onPress }: SignupButtonProps) {
  const theme = useThemePalette();
  return (
    <ThemedButton onPress={onPress} color={theme.positiveButton}>
      Sign Up
    </ThemedButton>
  );
}

const styles = StyleSheet.create({
  SignUpButton: {
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});
