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
import { Usuario } from '../../interfaces/usuario.interface';
import { lerUsuarioFirestore } from '../../controllers/usuario.controller';

type BarbeirosProps = NativeStackScreenProps<Navegacao, "Barbeiros">;

const BarbeirosScreen: React.FC<BarbeirosProps> = (props) => {
    const { barbearia } = props.route.params;

    const [barbeiros, setBarbeiros] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    React.useEffect(() => {
        pegarBarbearia();
    }, []);

    const pegarBarbearia = async () => {
        setCarregando(true);
        const novoBarbeiros = await Promise.all(barbearia.ids_barbeiros.map(async (id) => {
            return await lerUsuarioFirestore(id);
        }));
        setBarbeiros(novoBarbeiros);
        setCarregando(false);
    }

    if (carregando) {
        return (
            <LoadingComponent />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {barbeiros.length <= 0 ? <Text>Não existem barbeiros nessa barbearia ainda!</Text> : null}
                {barbeiros.map((barbeiro, i) => (<Card key={"barbeiros-" + i} fotoCaminho={barbeiro.link_foto_perfil}
                    titulo={barbeiro.nome? barbeiro.nome: barbeiro.email} descricao={barbeiro.telefone} />))
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
        margin: 15
    },

});

export default BarbeirosScreen;