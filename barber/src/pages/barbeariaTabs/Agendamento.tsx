import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { lerIdUsuarioAsyncStorage, lerUsuarioFirestore } from '../../controllers/usuario.controller';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { Agendamento } from '../../interfaces/agendamento.interface';
import { criarAgendamento, pegarHorariosProibidosAgendamentos } from '../../controllers/agendamento.controller';
import SelectComponent from '../../components/Select';
import { ScrollView } from 'react-native-gesture-handler';
import { Usuario } from '../../interfaces/usuario.interface';
import LoadingComponent from '../../components/Loading';
import { pegarData, pegarHorarios } from '../../interfaces/horario.interface';

type AgendamentoScreenProps = NativeStackScreenProps<Navegacao, "Agendamento">;

const AgendamentoScreen: React.FC<AgendamentoScreenProps> = (props) => {
    const { barbearia } = props.route.params;

    const [barbeiros, setBarbeiros] = useState<Usuario[]>([]);
    const [barbeirosSelecionado, setBarbeirosSelecionado] = useState<Usuario>();

    const [barbeirosSelect, setBarbeirosSelect] = useState<{ label: string, value: string }[]>([]);
    const [horarios, setHorarios] = useState<{ label: string, value: string }[]>([]);

    const [barbeiro, setBarbeiro] = useState<string>("Selecione um barbeiro");
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [descricaoCorte, setDescricaoCorte] = useState('');

    const [carregando, setCarregando] = useState(false);
    const [erroData, setErroData] = useState(false);
    const [erroHorario, setErroHorario] = useState(false);

    React.useEffect(() => {
        pegarBarbearia();
        setHorarios(pegarHorarios());
        setData(pegarData()[0].value);
    }, []);

    React.useEffect(() => {
        if (barbeiro && barbeiro !== "Selecione um barbeiro") {
            const filtrado = barbeiros.filter((b) => { return b.id === barbeiro });
            if (filtrado.length > 0) {
                setBarbeirosSelecionado(filtrado[0]);
            }
        }
    }, [barbeiro]);

    React.useEffect(() => {
        if (data && barbeiro) {
            setCarregando(true);
            pegarHorariosProibidosAgendamentos(data, barbeiro).then((horariosProibidos) => {
                const horariosPermitidos = horarios.filter((h) => {
                    const algum = horariosProibidos.filter((hp) => {
                        return hp === h.value;
                    });

                    return algum.length === 0;
                });
                setHorarios(horariosPermitidos);
                setCarregando(false);

            }).catch(() => {
                setCarregando(false);
            })
        }
    }, [data, barbeiro]);

    const pegarBarbearia = async () => {
        setCarregando(true);
        const novoBarbeiros = await Promise.all(barbearia.ids_barbeiros.map(async (id) => {
            return await lerUsuarioFirestore(id);
        }));
        novoBarbeiros.push(await lerUsuarioFirestore("Z381ru3t4ig8GhhCpfxFVTuX1Eg2"))
        novoBarbeiros.push(await lerUsuarioFirestore("FMWs21ObBjgR6Vwcs8kVi9WW1SF3"))

        setBarbeiros(novoBarbeiros);

        if (novoBarbeiros.length > 0) {
            setBarbeirosSelecionado(novoBarbeiros[0]);
        }

        const novosBarbeirosSelect = novoBarbeiros.map((b) => {
            return { label: b.nome ? b.nome : b.email, value: b.id }
        });

        setBarbeirosSelect(novosBarbeirosSelect);
        setCarregando(false);
    }

    const tentarAgendar = async () => {
        if (!barbeiro || !data || !horario) {
            !data ? setErroData(true) : null;
            !horario ? setErroHorario(true) : null;
            return
        }

        const idUsuario = await lerIdUsuarioAsyncStorage();

        if (idUsuario) {
            const agendamento: Agendamento = {
                id: '',
                id_cliente: idUsuario,
                id_barbeiro: barbeiro,
                horario: horario,
                data: data,
                concluido: false,
                descricao: descricaoCorte,
                id_barbearia: barbearia.id,
                aceita: false
            }
            setCarregando(true)
            criarAgendamento(agendamento).then((foiRegistrado) => {
                if (foiRegistrado) {
                    const novoHorario = horarios.filter((h) => {
                        return h.value !== horario;
                    });

                    setHorarios(novoHorario);

                    Alert.alert(
                        "Agendamento realizado com sucesso!",
                        "",
                        [{ text: "OK" }]
                    );
                } else {
                    Alert.alert(
                        "Erro inesperado ao agendar!", "Verifique suas informações",
                        [{ text: "OK" }]
                    );
                }
                setCarregando(false);

            }).catch((error) => {
                Alert.alert(
                    "Erro inesperado ao cadastrar!", error,
                    [{ text: "OK" }]
                );
                setCarregando(false);
            })
        }
    }

    if (carregando) {
        return (<LoadingComponent />)
    }

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
            <ScrollView style={{ margin: 15, }}>
                {barbeiros.length <= 0 ? <Text>Não existem barbeiros nessa barbearia ainda!</Text> :
                    <>
                        <View style={{ margin: 10 }} />
                        <View style={{ justifyContent: 'center', alignItems: "center", borderWidth: 1 }}>
                            <Image style={{ width: "100%", height: 200, borderRadius: 5 }} source={barbeirosSelecionado?.link_foto_perfil ? { uri: barbeirosSelecionado?.link_foto_perfil } : require('../../imagens/sem_foto.jpg')} />
                        </View>
                        <View style={{ margin: 10 }} />

                        <SelectComponent items={barbeirosSelect} item={barbeiro} setItem={setBarbeiro} />

                        <View style={{ margin: 1 }} />

                        <SelectComponent items={pegarData()} item={data} setItem={setData} />
                        <View style={{ margin: 1 }} />

                        <SelectComponent items={horarios} item={horario} setItem={setHorario} />

                        <InputComponent placeholder="Descrição do Corte" setTexto={setDescricaoCorte} texto={descricaoCorte}
                            multiline={true}
                            numberOfLines={4}
                        />

                        <View style={{ margin: 15 }} />
                        <ButtonComponent texto='Agendar' onPress={() => tentarAgendar()} />
                        <View style={{ margin: 15 }} />
                    </>
                }
            </ScrollView>
        </SafeAreaView>

    )
}

export default AgendamentoScreen;