import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button, Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';
import LoadingComponent from '../../components/Loading';
import { usuarioReducer } from '../../reducers/UsuarioReducer';
import { Agendamento, AgendamentoRecebidoBarbeiro } from '../../interfaces/agendamento.interface';
import { lerUsuarioFirestore } from '../../controllers/usuario.controller';
import CardComponent from '../../components/Card';
import { lerBarbearia } from '../../controllers/barbearia.controller';
import { lerAgendamentoPorBarbeiro, lerAgendamentoPorUsuario } from '../../controllers/agendamento.controller';
import ButtonComponent from '../../components/Button';

type AgendamentosProps = NativeStackScreenProps<Navegacao, "Agendamentos">;

const AgendamentosScreen: React.FC<AgendamentosProps> = (props) => {
    const [agendamentos, setAgendamentos] = useState<AgendamentoRecebidoBarbeiro[]>([]);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<AgendamentoRecebidoBarbeiro[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    const [filtro, setFiltro] = useState<string>("");
    const [temErro, setTemErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>("Teste");


    React.useEffect(() => {
        setCarregando(true);
        lerAgendamentoPorBarbeiro(usuarioReducer.getState().value.id).then(async (agends) => {
            const novoAgendamentos: AgendamentoRecebidoBarbeiro[] = await Promise.all(agends.map(async (a) => {
                const cliente = await lerUsuarioFirestore(a.id_cliente);
                return {
                    ...a,
                    foto_cliente: cliente.link_foto_perfil ? cliente.link_foto_perfil : '',
                    nome_cliente: cliente.nome,
                    telefone: cliente.telefone
                }
            }));
            const novoAgendamentos2 = novoAgendamentos.filter((a) => {
                return !a.concluido
            })
            setAgendamentos(novoAgendamentos2);
            setCarregando(false);
        }).catch((error) => {
            console.log(error);

            setCarregando(false);
        })
    }, [])

    React.useEffect(() => {
        if (filtro) {
            const novaAgendamentoFiltrado = agendamentos.filter((a) => { return a.data.includes(filtro) || a.horario.includes(filtro) });
            setAgendamentosFiltrados(novaAgendamentoFiltrado);
        } else {
            setAgendamentosFiltrados([]);
        }
    }, [filtro]);

    if (carregando) {
        return (
            <LoadingComponent />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <InputComponent placeholder="Procure por data ou horario" setTexto={setFiltro} style={{ borderRadius: 100 }}
                setTemErro={setTemErro} temErro={temErro} textoErro={textoErro} texto={filtro} nomeIcon="search"
            />
            <ScrollView style={styles.scrollView}>
                {agendamentosFiltrados.length <= 0 && agendamentos.length <= 0 ? <Text>Não existem agendamentos cadastrados como pendentes ainda!</Text> : null}
                {agendamentosFiltrados && agendamentosFiltrados.length > 0 ?
                    agendamentosFiltrados.map((a, i) => (
                        <>
                            <CardComponent key={"ag-filter-" + i} fotoCaminho={a.foto_cliente}
                                titulo={"Data: " + a.data + ", Horario: " + a.horario}
                                descricao={"Cliente: " + a.nome_cliente + ", Status: Pendente"}
                            />
                            {!a.telefone ? null :
                                <ButtonComponent texto='Mandar Mensagem' onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=' + a.telefone)} />}
                        </>
                    ))
                    :
                    agendamentos.map((a, i) => (
                        <>
                            <CardComponent key={"ag-filter-" + i} fotoCaminho={a.foto_cliente}
                                titulo={"Data: " + a.data + ", Horario: " + a.horario}
                                descricao={"Cliente: " + a.nome_cliente + ", Status: Pendente"}
                            />
                            {!a.telefone ? null :
                                <ButtonComponent texto='Mandar Mensagem' onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=' + a.telefone)} />}
                        </>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    scrollView: {
        // backgroundColor: "blue",
    },

});

export default AgendamentosScreen;