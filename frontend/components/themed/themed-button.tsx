import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { ThemedText } from "./themed-text";

type ThemedButtonProps = ButtonProps & {
  onPress: () => void;
  color?: string;
  textColor?: string;
};
export default function ThemedButton({
  onPress,
  color,
  textColor,
  ...otherProps
}: ThemedButtonProps) {
  const isString = typeof otherProps.children == "string";

  return (
    <Button
      style={[styles.loginButton]}
      buttonColor={color}
      rippleColor="#FFFFFF88"
      onPress={onPress}
      {...otherProps}
    >
      {isString ? (
        <ThemedText
          type="small"
          style={[styles.buttonText, textColor && { color: textColor }]}
        >
          {otherProps.children}
        </ThemedText>
      ) : (
        otherProps.children
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  loginButton: { borderRadius: 999 },
  buttonText: {
    textAlign: "center",
  },
});
