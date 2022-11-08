import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { RootStackParamList } from '../../interfaces/navegation.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { cadastrarUsuarioAuthFirestore } from '../../controllers/usuario.controller';

type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, "Cadastro">;

const CadastroScreen: React.FC<CadastroScreenProps> = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const cadastrarUsuario = async () => {
        if (!senha || !confirmarSenha || !email) {
            Alert.alert(
                "Preencha todos os campos!",
                "Confira se todos os campos estão preenchidos",
                [{ text: "OK" }]
            );
        } else if (senha !== confirmarSenha) {
            Alert.alert(
                "Erro nas senhas",
                "Senhas não batem",
                [{ text: "OK" }]
            );
        }else{
            const foiRegistrado = await cadastrarUsuarioAuthFirestore(email, senha);
            if(foiRegistrado){
                Alert.alert(
                    "Cadastro realizado com sucesso!",
                    "Entre em sua conta",
                    [{ text: "OK" }]
                );

                props.navigation.push("Home")
            }else{
                Alert.alert(
                    "Algo deu errado!",
                    "Erro inesperado...",
                    [{ text: "OK" }]
                );
            }
        }
    }

    return (
        <Stack spacing={2} style={{ margin: 16 }}>
            <TextInput placeholder="Email"
                variant="outlined"
                onChangeText={newEmail => setEmail(newEmail)}
            />
            <TextInput placeholder="Senha"
                variant="outlined"
                onChangeText={newSenha => setSenha(newSenha)}
            />
            <TextInput placeholder="Confirmar Senha"
                variant="outlined"
                onChangeText={newConfirmarSenha => setConfirmarSenha(newConfirmarSenha)}
            />
            <Pressable style={styles.button} onPress={() => cadastrarUsuario()}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
        </Stack>

    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 5,
        width: "95%"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default CadastroScreen;