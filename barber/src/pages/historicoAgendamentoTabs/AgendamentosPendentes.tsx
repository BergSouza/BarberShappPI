import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';
import Card from '../../components/Card';
import LoadingComponent from '../../components/Loading';
import CardWithButtonComponent from '../../components/CardWithButton';
import { lerAgendamento, lerAgendamentoPorUsuario } from '../../controllers/agendamento.controller';
import { usuarioReducer } from '../../reducers/UsuarioReducer';
import { Agendamento, AgendamentoRecebidoCliente } from '../../interfaces/agendamento.interface';
import { lerUsuarioFirestore } from '../../controllers/usuario.controller';
import CardComponent from '../../components/Card';
import { lerBarbearia } from '../../controllers/barbearia.controller';

type AgendamentosPendentesProps = NativeStackScreenProps<Navegacao, "AgendamentosPendentes">;

const AgendamentosPendentesScreen: React.FC<AgendamentosPendentesProps> = (props) => {
    const [agendamentos, setAgendamentos] = useState<AgendamentoRecebidoCliente[]>([]);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<AgendamentoRecebidoCliente[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    const [filtro, setFiltro] = useState<string>("");
    const [temErro, setTemErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>("Teste");


    React.useEffect(() => {
        setCarregando(true);
        lerAgendamentoPorUsuario(usuarioReducer.getState().value.id).then(async (agends) => {
            const novoAgendamentos: AgendamentoRecebidoCliente[] = await Promise.all(agends.map(async (a) => {
                const barbeiro = await lerUsuarioFirestore(a.id_barbeiro);
                const barbearia = await lerBarbearia(a.id_barbearia);
                return {
                    ...a, nome_barbeiro: barbeiro.nome,
                    foto_barbearia: barbearia.link_foto ? barbearia.link_foto : '',
                    nome_barbearia: barbearia.nome
                }
            }));
            const novoAgendamentos2 = novoAgendamentos.filter((a) => {
                return !a.concluido || !a.aceita;
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
                            <CardComponent key={"ag-filter-" + i} fotoCaminho={a.foto_barbearia}
                                titulo={"Barbearia: " + a.nome_barbearia + ", Data: " + a.data + ", Horario: " + a.horario}
                                descricao={"Barbeiro: " + a.nome_barbeiro + ", Status: "+!a.aceita?"Não Aceita ainda":"Pendente"}
                            />
                        </>
                    ))
                    :
                    agendamentos.map((a, i) => (
                        <>
                            <CardComponent key={"ag-filter-" + i} fotoCaminho={a.foto_barbearia}
                                titulo={"Barbearia: " + a.nome_barbearia + ", Data: " + a.data + ", Horario: " + a.horario}
                                descricao={"Barbeiro: " + a.nome_barbeiro + ", Status: "+(!a.aceita?"Não Aceita ainda":"Pendente")}
                            />
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

export default AgendamentosPendentesScreen;