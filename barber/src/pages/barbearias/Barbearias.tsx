import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';
import Card from '../../components/Card';
import { lerBarbearias } from '../../controllers/barbearia.controller';
import LoadingComponent from '../../components/Loading';

type BarbeariasProps = NativeStackScreenProps<Navegacao, "Barbearias">;

const BarbeariasScreen: React.FC<BarbeariasProps> = (props) => {
    const [barbearias, setBarbearias] = useState<Barbearia[]>([]);
    const [barbeariasFiltradas, setBarbeariasFiltradas] = useState<Barbearia[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    const [filtro, setFiltro] = useState<string>("");
    const [temErro, setTemErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>("Teste");


    React.useEffect(() => {
        setCarregando(true);
        lerBarbearias().then((barbs) => {
            setBarbearias(barbs);
            setCarregando(false);
        }).catch((error) => {
            console.log(error);
            setCarregando(false);
        });
    }, [])

    React.useEffect(() => {
        if (filtro) {
            const novaBarbeariaFiltrada = barbearias.filter((barbearia) => { return barbearia.endereco.includes(filtro) });
            setBarbeariasFiltradas(novaBarbeariaFiltrada);
        } else {
            setBarbeariasFiltradas([]);
        }
    }, [filtro]);

    if (carregando) {
        return (
            <LoadingComponent />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <InputComponent placeholder="Procure barbearia por nome" setTexto={setFiltro} style={{ borderRadius: 100 }}
                setTemErro={setTemErro} temErro={temErro} textoErro={textoErro} texto={filtro} nomeIcon="search"
            />
            <ScrollView style={styles.scrollView}>
                {barbeariasFiltradas.length <= 0 && barbearias.length <= 0 ? <Text>Não existem barbearias cadastradas ainda!</Text> : null}
                {barbeariasFiltradas && barbeariasFiltradas.length > 0 ?
                    barbeariasFiltradas.map((barbearia, i) => (<Card key={"barb-filter-" + i} fotoCaminho={barbearia.link_foto}
                        titulo={barbearia.nome} descricao={barbearia.endereco}
                        onPress={() => {
                            props.navigation.navigate("BarbeariasTabs", { barbearia: barbearia });
                        }} />))
                    :
                    barbearias.map((barbearia, i) => (<Card key={"barb-" + i} fotoCaminho={barbearia.link_foto}
                        titulo={barbearia.nome} descricao={barbearia.endereco}
                        onPress={() => {
                            props.navigation.navigate("BarbeariasTabs", { barbearia: barbearia });
                        }} />))
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

export default BarbeariasScreen;