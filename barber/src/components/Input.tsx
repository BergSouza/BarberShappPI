import { Stack } from '@react-native-material/core';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface InputComponentProps extends TextInputProps {
    temErro?: boolean;
    textoErro?: string;
    setTemErro?: React.Dispatch<React.SetStateAction<boolean>>;
    setTexto: React.Dispatch<React.SetStateAction<string>>;
    texto: string;
    nomeIcon?: string;
}
const InputComponent: React.FC<InputComponentProps> = (props) => {
    const [temFoco, setTemFoco] = React.useState(false);

    const estaEmFoco = () => {
        setTemFoco(true);
        props.setTemErro ? props.setTemErro(false) : null;
    }

    const styles = StyleSheet.create({
        stack: {
            marginBottom: 10,
        },
        view: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            flex: 6,
            height: props.multiline? 100 : 50,
            textAlignVertical: props.multiline? "top" : "center",
            borderWidth: 1,
            padding: 10,
            fontSize: 15,
            width: "100%",
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomColor: props.temErro ? "red" : temFoco ? "blue" : "black",
            color: props.temErro ? "red" : temFoco ? "blue" : "black",
        },
        text: {
            borderColor: 'red',
            borderRadius: 8,
            padding: 0,
            color: 'red'
        },

        icon: {
            flex: 1,
            height: 50,
            borderWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingTop: 10,
            borderBottomColor: props.temErro ? "red" : temFoco ? "blue" : "black",
        },
    });

    return (
        <Stack spacing={1} style={styles.stack}>
            <View style={styles.view}>
                <TextInput {...props} style={{ ...styles.input }} placeholderTextColor="gray"
                    onChangeText={(text) => { props.setTexto(text); }} value={props.texto}
                    onFocus={() => estaEmFoco()} onBlur={() => setTemFoco(false)} />
                {props.nomeIcon ? <Icon name={props.nomeIcon} size={30} color="black" style={{ ...styles.icon }} /> : null}
            </View>
            {props.temErro ? <Text style={styles.text} >{props.textoErro}</Text> : null}
        </Stack>
    )
}

export default InputComponent;