import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Stack } from '@react-native-material/core';
import ButtonComponent from '../../components/Button';
import InputComponent from '../../components/Input';
import ChooseImageComponent from '../../components/ChooseImage';
import { criarBarbearia } from '../../controllers/barbearia.controller';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { lerIdUsuarioAsyncStorage } from '../../controllers/usuario.controller';

type BarbeariaEmpregadoraProps = NativeStackScreenProps<Navegacao, "BarbeariaEmpregadora">;

const BarbeariaEmpregadoraScreen: React.FC<BarbeariaEmpregadoraProps> = (props) => {
    const [endereco, setEndereco] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [fotoCaminho, setFotoCaminho] = useState<undefined | string>();

    const [erroEndereco, setErroEndereco] = useState(false);
    const [erroCNPJ, setErroCNPJ] = useState(false);
    const [erroNome, setErroNome] = useState(false);

    const tentarCadastrarBarbearia = async () => {
        if (!cnpj || !endereco) {
            !cnpj ? setErroCNPJ(true) : null;
            return;
        }
        const idUsuario = await lerIdUsuarioAsyncStorage();

        if (idUsuario) {
            const barbearia: Barbearia = {
                id: '',
                pertence: idUsuario,
                cnpj,
                foto: '',
                endereco,
                nome,
                ids_barbeiros: []
            }

            criarBarbearia(barbearia, fotoCaminho).then((idBarbearia) => {
                Alert.alert(
                    "Barbearia cadastrada com sucesso!",
                    "",
                    [{ text: "OK" }]
                );

                //props.navigation.push("Menu")
            }).catch((error) => {
                Alert.alert(
                    "Erro ao cadastrar barbearia!",
                    error,
                    [{ text: "OK" }]
                );
            });
        }


    }

    return (
        <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>

            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image style={{ width: "100%", height: 200, borderRadius: 5 }} source={fotoCaminho ? { uri: fotoCaminho } : require('../../imagens/sem_foto.jpg')} />
            </View>
            <View style={{ margin: 5 }} />
            <ChooseImageComponent setFotoUri={setFotoCaminho}></ChooseImageComponent>
            <View style={{ margin: 15 }} />

            <InputComponent placeholder="Digite o nome da barbearia" temErro={erroNome} textoErro={'Erro no campo nome'}
                setTexto={setNome} setTemErro={setErroNome} texto={nome} />

            <InputComponent placeholder="Digite o endereço da barbearia" temErro={erroEndereco} textoErro={'Erro no campo endereço'}
                setTexto={setEndereco} setTemErro={setErroEndereco} texto={endereco} />

            <InputComponent placeholder="Digite o CNPJ da barbearia" temErro={erroCNPJ} textoErro={'Erro no campo CNPJ'}
                setTexto={setCnpj} setTemErro={setErroCNPJ} texto={cnpj} />
            <View style={{ margin: 15 }} />
            <ButtonComponent texto='Cadastrar Barbearia' onPress={() => tentarCadastrarBarbearia()} />
            <View style={{ margin: 15 }} />
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

export default BarbeariaEmpregadoraScreen;