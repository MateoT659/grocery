import { Pressable, StyleSheet, Text } from "react-native";

type NewRecipeButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};
export default function NewRecipeButton({
  title,
  onPress,
  color = "rgba(43, 175, 25, 1)",
}: NewRecipeButtonProps) {
  return (
    <Pressable
      style={[styles.newRecipeButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  newRecipeButton: {
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
});
