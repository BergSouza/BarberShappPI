import { Stack } from '@react-native-material/core';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface InputComponentProps extends TextInputProps {
    temErro?: boolean;
    textoErro?: string;
    borderRadius?: boolean;
}
const InputComponent: React.FC<InputComponentProps> = (props) => {
    return (
        <Stack spacing={1} style={styles.stack}>
            <TextInput {...props} style={props.temErro ? { ...styles.inputErro } : { ...styles.input }} placeholderTextColor="gray" />
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
        fontSize: 15,
        width: "100%",
        // borderRadius: 80,
        // fontStyle: ""
    },
    inputErro: {
        height: 50,
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        padding: 10,
        fontSize: 15,
        width: "100%",
        // borderRadius: 80 
    },
    text: {
        borderColor: 'red',
        borderRadius: 8,
        padding: 0,
        color: 'red'
    },

    searchIcon: {
        padding: 10,
    },
});

export default InputComponent;