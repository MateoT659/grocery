import { Pressable, Text, StyleSheet } from "react-native";

type LoginButtonProps = {
    title: string;
    onPress: () => void;
}
export default function LoginButton({title, onPress}: LoginButtonProps) {
    return (
        <Pressable style={styles.loginButton} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: 'rgba(43, 175, 25, 1)',
        // borderColor: 'black',
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    }
})