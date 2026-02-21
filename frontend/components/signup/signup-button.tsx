import { Pressable, Text, StyleSheet } from "react-native";

type SignupButtonProps = {
    title: string;
    onPress: () => void;
    color?: string;
}

export default function SignupButton({title, onPress, color='rgba(43, 175, 25, 1)',}: SignupButtonProps) {
    return (
        <Pressable style={[styles.SignUpButton, {backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    SignUpButton: {
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    }
})