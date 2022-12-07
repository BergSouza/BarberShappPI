import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';
import Card from '../../components/Card';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { usuarioReducer } from '../../reducers/UsuarioReducer';
import { lerBarbearia } from '../../controllers/barbearia.controller';
import ButtonComponent from '../../components/Button';

type MinhasBarbeariasProps = NativeStackScreenProps<Navegacao, "MinhasBarbearias">;

const MinhasBarbeariasScreen: React.FC<MinhasBarbeariasProps> = (props) => {
    const [barbearias, setMinhasBarbearias] = useState<Barbearia[]>([]);
    const [barbeariasFiltradas, setMinhasBarbeariasFiltradas] = useState<Barbearia[]>([]);

    const [filtro, setFiltro] = useState<string>("");
    const [temErro, setTemErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>("Teste");

    React.useEffect(() => {
        pegarBarbearias();
    }, [])

    const pegarBarbearias = async () => {
        const usuario = usuarioReducer.getState().value;
        const novasBarbearias = await Promise.all(usuario.barbearias.map(async (id) => {
            return await lerBarbearia(id);
        }));
        console.log(novasBarbearias)
        setMinhasBarbearias(novasBarbearias);
    }

    React.useEffect(() => {
        if (filtro) {
            const novaBarbeariaFiltrada = barbearias.filter((barbearia) => { return barbearia.endereco.includes(filtro) });
            setMinhasBarbeariasFiltradas(novaBarbeariaFiltrada);
        } else {
            setMinhasBarbeariasFiltradas([]);
        }
    }, [filtro])

    return (
        <SafeAreaView style={styles.container}>
            <InputComponent placeholder="Procure barbearia por nome" setTexto={setFiltro} style={{ borderRadius: 100 }}
                setTemErro={setTemErro} temErro={temErro} textoErro={textoErro} texto={filtro} nomeIcon="search"
            />
            <ButtonComponent texto='Adicionar Barbearia' onPress={() => props.navigation.navigate("AdicionarBarbearia")} />
            <View style={{ margin: 10 }} />

                {barbeariasFiltradas.length <= 0 && barbearias.length <= 0 ? <Text>Não existem barbearias cadastradas ainda!</Text> : null}

                <ScrollView >
                    {barbeariasFiltradas && barbeariasFiltradas.length > 0 ?
                        barbeariasFiltradas.map((barbearia, i) => (<Card key={"barb-filter-" + i} fotoCaminho={barbearia.link_foto}
                            titulo={barbearia.nome} descricao={barbearia.endereco} onPress={() => props.navigation.push("BarbeariaEmpregadora")} />))
                        :
                        barbearias.map((barbearia, i) => (<Card key={"barb-" + i} fotoCaminho={barbearia.link_foto} titulo={barbearia.nome} descricao={barbearia.endereco} />))
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
});

export default MinhasBarbeariasScreen;