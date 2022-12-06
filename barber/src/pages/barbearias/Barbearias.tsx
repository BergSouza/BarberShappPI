import * as React from 'react';
import { SideBarStack } from '../../interfaces/navegation.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';
import Card from '../../components/Card';
import { lerBarbearias } from '../../controllers/barbearia.controller';

type BarbeariasProps = NativeStackScreenProps<SideBarStack, "Barbearias">;

const BarbeariasScreen: React.FC<BarbeariasProps> = (props) => {
    const [barbearias, setBarbearias] = useState<Barbearia[]>([]);
    const [barbeariasFiltradas, setBarbeariasFiltradas] = useState<Barbearia[]>([]);

    const [filtro, setFiltro] = useState<string>("");
    const [temErro, setTemErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>("Teste");


    React.useEffect(() => {
        lerBarbearias().then((barbs) => {
            setBarbearias(barbs);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    React.useEffect(() => {
        if (filtro) {
            const novaBarbeariaFiltrada = barbearias.filter((barbearia) => { return barbearia.endereco.includes(filtro)});
            setBarbeariasFiltradas(novaBarbeariaFiltrada);
        } else {
            setBarbeariasFiltradas([]);
        }
    }, [filtro])

    return (
        <SafeAreaView style={styles.container}>
            <InputComponent placeholder="Procure barbearia por nome" setTexto={setFiltro} style={{ borderRadius: 100 }}
                setTemErro={setTemErro} temErro={temErro} textoErro={textoErro} texto={filtro} nomeIcon="search"
            />
            <ScrollView style={styles.scrollView}>
                {barbeariasFiltradas && barbeariasFiltradas.length > 0 ?
                    barbeariasFiltradas.map((barbearia) => (<Card fotoCaminho={barbearia.link_foto} titulo={barbearia.nome} descricao={barbearia.endereco} />))
                    :
                    barbearias.map((barbearia) => (<Card fotoCaminho={barbearia.link_foto} titulo={barbearia.nome} descricao={barbearia.endereco} />))
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