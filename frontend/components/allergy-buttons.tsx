import { Pressable, Text, StyleSheet, Image } from "react-native";

type AllergyButtonProps = {
    title: string;
    onPress: () => void;
    image: any;
}
export default function AllergyButton({title, onPress, image}: AllergyButtonProps) {
    return (
        <Pressable style={styles.allergyButton} onPress={onPress}>
            <Image source={image} style={styles.image}/>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    allergyButton: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(43, 175, 25, 1)',
        // borderColor: 'black',
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        marginLeft: 46,
        alignContent: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        
    },
    image: {
        width: 40,
        aspectRatio: 1
    }
})