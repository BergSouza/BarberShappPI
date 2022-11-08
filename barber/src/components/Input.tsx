import { Stack } from '@react-native-material/core';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

export interface InputComponentProps extends TextInputProps {
    temErro: boolean;
    textoErro: string;
}
const InputComponent: React.FC<InputComponentProps> = (props) => {
    return (
        <Stack spacing={1} style={styles.stack}>
            <TextInput {...props} style={props.temErro ? styles.inputErro : styles.input}/>
            {props.temErro ? <Text style={styles.text} >{props.textoErro}</Text> : null}
        </Stack>
    )
}

const styles = StyleSheet.create({
    stack: {
        marginBottom: 10
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        fontSize: 20,
        width: "100%"
    },
    inputErro: {
        height: 50,
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        padding: 10,
        fontSize: 20,
        width: "100%"

    },
    text: {
        borderColor: 'red',
        borderRadius: 8,
        padding: 0,
        color: 'red'
    },
});

export default InputComponent;