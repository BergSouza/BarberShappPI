import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { atualizarSenha, atualizarUsuarioFirestore, cadastrarUsuarioAuthFirestore } from '../../controllers/usuario.controller';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { Usuario } from '../../interfaces/usuario.interface';
import { usuarioReducer } from '../../reducers/UsuarioReducer';
import ChooseImageComponent from '../../components/ChooseImage';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingComponent from '../../components/Loading';

type MinhaContaScreenProps = NativeStackScreenProps<Navegacao, "MinhaConta">;

const MinhaContaScreen: React.FC<MinhaContaScreenProps> = (props) => {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [fotoCaminho, setFotoCaminho] = useState<undefined | string>("");

    const [estaEditando, setEstaEditando] = useState<boolean>(false);
    const [esperando, setEsperando] = useState<boolean>(false);

    React.useEffect(() => {
        setUsuario(usuarioReducer.getState().value);
        usuarioReducer.subscribe(() => {
            if (usuarioReducer.getState().value.id) {
                setUsuario(usuarioReducer.getState().value);
                setNome(usuarioReducer.getState().value.nome);
                setTelefone(usuarioReducer.getState().value.telefone);
            }
        });
    }, []);

    const editarUsuario = () => {
        setEstaEditando(false);
        if (usuario !== null) {
            let novoUsuario: Usuario = { ...usuario };
            novoUsuario.telefone = telefone;
            novoUsuario.nome = nome;
            setEsperando(true);

            atualizarUsuarioFirestore(novoUsuario, fotoCaminho).then(() => {
                Alert.alert(
                    "Usuario atualizado com sucesso!",
                    "",
                    [{ text: "OK" }]
                );
                setEsperando(false);

            }).catch(() => {
                Alert.alert(
                    "Erro inesperado ao editar!", "Verifique suas informações",
                    [{ text: "OK" }]
                );
                setEsperando(false);

            });
        }
    }

    const editarSenha = () => {
        if (usuario !== null) {
            setEsperando(true);
            atualizarSenha(usuario.email).then(() => {
                Alert.alert(
                    "Email enviado com sucesso!",
                    "Um email com as instruções de mudança de senha foi enviado para você",
                    [{ text: "OK" }]
                );
                setEsperando(false);

            }).catch(() => {
                Alert.alert(
                    "Erro inesperado ao enviar email de recuperação!", "Verifique suas conexão",
                    [{ text: "OK" }]
                );
                setEsperando(false);
            });
        }
    }

    const cancelarEdicao = () => {
        if (usuario !== null) {
            setNome(usuario.nome);
            setTelefone(usuario.telefone);
            setFotoCaminho(usuario.link_foto_perfil);
        } else {
            setNome("");
            setTelefone("");
            setFotoCaminho("");
        }

        setEstaEditando(false);
    }

    if (usuario === null || !usuario.id || esperando) {
        return (
            <LoadingComponent />
        )
    }

    return (
        <ScrollView style={{ margin: 16 }}>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image style={{ width: "100%", height: 200, borderRadius: 5 }} source={fotoCaminho ? { uri: fotoCaminho }
                    : usuario.link_foto_perfil ? { uri: usuario.link_foto_perfil } : require('../../imagens/sem_foto.jpg')} />
            </View>
            <View style={{ margin: 5 }} />
            <ChooseImageComponent setFotoUri={setFotoCaminho} texto="Escolher Foto"></ChooseImageComponent>
            <View style={{ margin: 15 }} />

            <Text style={{ fontWeight: "bold", textAlign: "center" }}>{usuario.email}</Text>

            <View style={{ margin: 15 }} />
            <InputComponent placeholder="Digite aqui seu nome" setTexto={setNome} texto={nome} editable={estaEditando} />
            <InputComponent placeholder="Digite aqui seu telefone: 88996797735" setTexto={setTelefone} texto={telefone}
                keyboardType="phone-pad" editable={estaEditando} />

            <View style={{ margin: 15 }} />
            <ButtonComponent texto={estaEditando ? 'Salvar' : 'Editar Informações'}
                onPress={() => { estaEditando ? editarUsuario() : setEstaEditando(true) }} />
            {!estaEditando ? null :
                <>
                    <View style={{ margin: 5 }} />
                    <ButtonComponent texto={'Cancelar'} onPress={() => { cancelarEdicao() }} />
                </>
            }

            <View style={{ margin: 5 }} />
            {estaEditando ? null : <ButtonComponent texto={'Editar Senha'}
                onPress={() => { editarSenha() }} />}
            <View style={{ margin: 5 }} />

        </ScrollView>

    )
}

export default MinhaContaScreen;