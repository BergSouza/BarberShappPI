import * as React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

export interface ButtonComponentProps extends PressableProps {
    texto: string;
    width?: string;
}
const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            // borderRadius: 4,
            height: 42,
            elevation: 3,
            backgroundColor: 'black',
            width: props.width? props.width : "100%"
        },
        text: {
            fontSize: 18,
            lineHeight: 19,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
    });

    return (
        <Pressable {...props} style={styles.button} >
            <Text style={styles.text}>{props.texto}</Text>
        </Pressable>
    )
}


export default ButtonComponent;