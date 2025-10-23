import { Pressable, Text, StyleSheet } from "react-native";

type SettingsButtonProps = {
    title: string;
    onPress: () => void;
}
export default function SettingsButton({title, onPress}: SettingsButtonProps) {
    return (
        <Pressable style={styles.settingsButton} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    settingsButton: {
        backgroundColor: 'rgba(43, 175, 25, 1)',
        // borderColor: 'black',
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        marginLeft: 46,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    }
})