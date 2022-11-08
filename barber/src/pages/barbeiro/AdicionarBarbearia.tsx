import * as React from 'react';
import { RootStackParamList } from '../../interfaces/navegation.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { Stack } from '@react-native-material/core';
import ButtonComponent from '../../components/Button';
import InputComponent from '../../components/Input';
import ChooseImageComponent from '../../components/ChooseImage';

type AdicionarBarbeariaProps = NativeStackScreenProps<RootStackParamList, "AdicionarBarbearia">;

const AdicionarBarbeariaScreen: React.FC<AdicionarBarbeariaProps> = (props) => {
    const [endereco, setEndereco] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [fotoCaminho, setFotoCaminho] = useState<undefined | string>();

    const [erroEndereco, setErroEndereco] = useState(false);
    const [erroCNPJ, setErroCNPJ] = useState(false);

    const tentarCadastrarBarbearia = () => {
        if (cnpj || endereco) {
            Alert.alert(
                "Preencha todos os campos!",
                "Confira se todos os campos estão preenchidos",
                [{ text: "OK" }]
            );
        }
    }

    return (
        <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>

            <View style={{ justifyContent: 'center', alignItems: "center", borderWidth: 1, borderColor: "black" }}>
                <Image style={{ width: 150, height: 200 }} source={fotoCaminho? {uri: fotoCaminho}: require('../../imagens/sem_foto.jpg')} />
            </View>
            <View style={{ margin: 30 }} />
            <ChooseImageComponent setFotoUri={setFotoCaminho}></ChooseImageComponent>
            <View style={{ margin: 15 }} />

            <InputComponent placeholder="Endereço" temErro={erroEndereco} textoErro={'Erro no campo endereço'}
                onChangeText={newEndereco => setEndereco(newEndereco)} onFocus={() => setErroEndereco(false)} />

            <InputComponent placeholder="CNPJ" temErro={erroCNPJ} textoErro={'Erro no campo CNPJ'}
                onChangeText={newCNPJ => setCnpj(newCNPJ)} onFocus={() => setErroCNPJ(false)}
            />
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

export default AdicionarBarbeariaScreen;