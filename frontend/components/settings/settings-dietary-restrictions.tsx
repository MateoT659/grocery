import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type AllergyDietButtonProps = {
    title: string;
    onPress: () => void;
}
export default function AllergyDietButton({title, onPress}: AllergyDietButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    
    return (
        <Pressable style={isPressed ? styles.allergyDietButtonPressed : styles.allergyDietButton} onPress={() => setIsPressed(!isPressed)}>
            <Text style={isPressed ? styles.buttonTextPressed : styles.buttonText}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    allergyDietButtonPressed: {
        backgroundColor: 'rgba(43, 175, 25, 1)',
        // borderColor: 'black',
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 5,
        width: 110
    },
     allergyDietButton: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(43, 175, 25, 1)',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5,
        width: 110
    },
    buttonTextPressed: {
        color: 'white',
        textAlign: 'center'
    },
    buttonText: {
        color: 'rgba(43, 175, 25, 1)',
        textAlign: 'center'
    }
})