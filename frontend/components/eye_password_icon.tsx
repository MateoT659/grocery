import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type EyePasswordIconProps = {
    onPress: () => void;
    showPassword: boolean;
}

export default function EyePasswordIcon({onPress, showPassword} : EyePasswordIconProps) {
    return (
        <Pressable onPress={onPress}>
            <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
            />
        </Pressable>
    )
}
