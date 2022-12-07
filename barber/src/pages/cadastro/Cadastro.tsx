import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { cadastrarUsuarioAuthFirestore } from '../../controllers/usuario.controller';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import LoadingComponent from '../../components/Loading';

type CadastroScreenProps = NativeStackScreenProps<Navegacao, "Cadastro">;

const CadastroScreen: React.FC<CadastroScreenProps> = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [carregando, setCarregando] = useState(false);
    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);

    const tentarCadastrar = () => {
        setCarregando(true)
        if (!senha || !confirmarSenha || !email) {
            !email ? setErroEmail(true) : null;
            !senha ? setErroSenha(true) : null;
            !confirmarSenha ? setErroConfirmarSenha(true) : null;
            setCarregando(false)

            return
        }
        if (senha !== confirmarSenha) {
            setErroSenha(true);
            setErroConfirmarSenha(true);
            setCarregando(false)

            return
        }
        cadastrarUsuarioAuthFirestore(email, senha).then((foiRegistrado) => {
            if (foiRegistrado) {
                Alert.alert(
                    "Cadastro realizado com sucesso!",
                    "Entre em sua conta",
                    [{ text: "OK" }]
                );

                props.navigation.push("Entrar")
            } else {
                Alert.alert(
                    "Erro inesperado ao cadastrar!", "Verifique suas informações",
                    [{ text: "OK" }]
                );
            }
            setCarregando(false)

        }).catch((error) => {
            Alert.alert(
                "Erro inesperado ao cadastrar!", error,
                [{ text: "OK" }]
            );
            console.log(error);
            setCarregando(false)
        })
    }
    if (carregando) {
        return (<LoadingComponent />)
    }

    return (
        <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image style={{ width: 200, height: 100 }} source={require('../../imagens/logo.png')} />
                <Text style={{ color: "black", fontSize: 25, fontFamily: "courrier" }}>BarberShapp</Text>
            </View>

            <View style={{ margin: 50 }} />
            <InputComponent placeholder="Email" temErro={erroEmail} textoErro={'Erro no campo email'}
                setTexto={setEmail} setTemErro={setErroEmail} texto={email}
            />
            <InputComponent placeholder="Senha" temErro={erroSenha} textoErro={senha !== confirmarSenha ? 'Senhas não são iguais' : 'Erro no campo senha'} secureTextEntry={true}
                setTexto={setSenha} setTemErro={setErroSenha} texto={senha}
            />
            <InputComponent placeholder="Confirmar Senha" temErro={erroConfirmarSenha} textoErro={senha !== confirmarSenha ? 'Senhas não são iguais' : 'Erro no campo senha'} secureTextEntry={true}
                setTexto={setConfirmarSenha} setTemErro={setErroConfirmarSenha} texto={confirmarSenha}
            />
            <View style={{ margin: 15 }} />
            <ButtonComponent texto='Cadastrar' onPress={() => tentarCadastrar()} />
            <View style={{ margin: 15 }} />
        </Stack>

    )
}

export default CadastroScreen;