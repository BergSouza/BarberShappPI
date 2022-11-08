import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { RootStackParamList } from '../../interfaces/navegation.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { cadastrarUsuarioAuthFirestore, lerIdUsuarioAsyncStorage } from '../../controllers/usuario.controller';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { Agendamento } from '../../interfaces/agendamento.interface';
import { criarAgendamento } from '../../controllers/agendamento.controller';

type AgendamentoScreenProps = NativeStackScreenProps<RootStackParamList, "Agendamento">;

const AgendamentoScreen: React.FC<AgendamentoScreenProps> = (props) => {
    const [barbeiro, setBarbeiro] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');

    const [erroBarbeiro, setErroBarbeiro] = useState(false);
    const [erroData, setErroData] = useState(false);
    const [erroHorario, setErroHorario] = useState(false);

    const tentarAgendar = async () => {
        if (!barbeiro || !data || !horario) {
            !barbeiro ? setErroBarbeiro(true) : null;
            !data ? setErroData(true) : null;
            !horario ? setErroHorario(true) : null;
            return
        }

        const idUsuario = await lerIdUsuarioAsyncStorage();

        if (idUsuario) {
            const agendamento: Agendamento = {
                id: '',
                id_cliente: idUsuario,
                barbeiro: barbeiro,
                horario: horario,
                data: data
            }
            criarAgendamento(agendamento).then((foiRegistrado) => {
                if (foiRegistrado) {
                    Alert.alert(
                        "Agendamento realizado com sucesso!",
                        "",
                        [{ text: "OK" }]
                    );

                    props.navigation.push("Menu")
                } else {
                    Alert.alert(
                        "Erro inesperado ao agendar!", "Verifique suas informações",
                        [{ text: "OK" }]
                    );
                }

            }).catch((error) => {
                Alert.alert(
                    "Erro inesperado ao cadastrar!", error,
                    [{ text: "OK" }]
                );
                console.log(error);
            })
        }
    }

    return (
        <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Text style={{ color: "black", fontSize: 25, fontFamily: "courrier" }}>Agendar Atendimento</Text>
            </View>

            <View style={{ margin: 50 }} />
            <InputComponent placeholder="Barbeiro" temErro={erroBarbeiro} textoErro={'Erro no campo barbeiro'}
                onChangeText={newBarbeiro => setBarbeiro(newBarbeiro)} onFocus={() => setErroBarbeiro(false)}
            />
            <InputComponent placeholder="Data" temErro={erroData} textoErro={'Erro no campo data'}
                onChangeText={newData => setData(newData)} onFocus={() => setErroData(false)}
            />
            <InputComponent placeholder="Horario" temErro={erroHorario} textoErro={'Erro no campo horario'}
                onChangeText={newHorario => setHorario(newHorario)} onFocus={() => setErroHorario(false)}
            />
            <View style={{ margin: 15 }} />
            <ButtonComponent texto='Agendar' onPress={() => tentarAgendar()} />
            <View style={{ margin: 15 }} />
        </Stack>

    )
}

export default AgendamentoScreen;