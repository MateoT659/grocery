import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";
import { StyleSheet } from 'react-native';

type EyePasswordIconProps = {
    onPress: () => void;
    hidePassword: boolean;
}

export default function EyePasswordIcon({onPress, hidePassword} : EyePasswordIconProps) {
    const colorScheme = useColorScheme();

    const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
    return (
        <Pressable style={styles.eyeIcon} onPress={onPress}>
            <Ionicons
                name={hidePassword ? "eye-off" : "eye"}
                size={22}
                color={iconColor}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    eyeIcon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center'
    }
})