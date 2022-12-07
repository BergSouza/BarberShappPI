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

type BarbeariaScreenProps = NativeStackScreenProps<Navegacao, "Barbearia">;

const BarbeariaScreen: React.FC<BarbeariaScreenProps> = (props) => {
    const { barbearia } = props.route.params;

    return (
        <ScrollView style={{ margin: 16, marginTop: 30 }}>
            <View style={{ justifyContent: 'center', alignItems: "center", borderWidth: 1 }}>
                <Image style={{ width: "100%", height: 200, borderRadius: 5 }} source={barbearia.link_foto ? { uri: barbearia.link_foto } : require('../../imagens/sem_foto.jpg')} />
            </View>
            <View style={{ margin: 15 }} />
            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "center", width: "100%" }}>{barbearia.nome}AA</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ fontWeight: "bold" }}>CNPJ: {barbearia.cnpj}</Text>
                <View style={{ margin: 10 }} />
                <Text style={{ borderWidth: 1, width: "100%", padding: 10 }}>{barbearia.endereco}</Text>
            </View>


        </ScrollView>

    )
}

export default BarbeariaScreen;