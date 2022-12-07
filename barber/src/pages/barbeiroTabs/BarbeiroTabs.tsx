import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { update, usuarioReducer } from '../../reducers/UsuarioReducer';
import { Usuario } from '../../interfaces/usuario.interface';
import { Stack, Text } from '@react-native-material/core';
import ButtonComponent from '../../components/Button';
import { atualizarUsuarioFirestore } from '../../controllers/usuario.controller';
import { Alert, SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SelectComponent from '../../components/Select';
import { lerBarbearias } from '../../controllers/barbearia.controller';
import { Barbearia } from '../../interfaces/barbearia.interface';
import AgendamentosScreen from './Agendamentos';

const Tab = createBottomTabNavigator<Navegacao>();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: "black",
    },
    tabBarActiveTintColor: "white",
    tabBarActiveBackgroundColor: "gray",
    tabBarInactiveTintColor: "white",
}

type BarbeiroTabsProps = NativeStackScreenProps<Navegacao, "BerbeiroTabs">;
const BarbeiroTabsScreen: React.FC<BarbeiroTabsProps> = (props) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [barbearias, setBarbearias] = useState<{ label: string, value: string }[]>([]);
    const [barbearia, setBarbearia] = useState<string>("");

    React.useEffect(() => {
        setUsuario(usuarioReducer.getState().value);

        usuarioReducer.subscribe(() => {
            setUsuario(usuarioReducer.getState().value);
        });

        lerBarbearias().then((barbs) => {
            const novasBarbearias: { label: string, value: string }[] = [];
            barbs.forEach((b) => novasBarbearias.push({ label: b.nome, value: b.id }));
            setBarbearias(novasBarbearias);
        }).catch(() => {

        })
    }, []);

    if (usuario === null) {
        return (
            <></>
        )
    }

    const tornarBarbeiro = () => {
        let newUsuario = { ...usuario }
        newUsuario.eBarbeiro = true;
        newUsuario.trabalha_barbearia = barbearia;
        atualizarUsuarioFirestore(newUsuario).then(() => {
            setUsuario(newUsuario)
            usuarioReducer.dispatch(update(newUsuario));
        }).catch(() => {
            Alert.alert(
                "Ocorreu um erro ao se tornar barbeiro de barbearia!", "Verifique sua conexão",
                [{ text: "OK" }]
            );
        });
    }

    const perguntarParaSeTornarDono = () => {
        Alert.alert(
            "Deseja se tornar barbeiro no APP?",
            "Isso fará com que tenha acesso a uma serie de mecanismos, qualquer fraude é de sua responsabilidade",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Aceito", onPress: () => tornarBarbeiro() }
            ]
        );
    }

    if (barbearias.length === 0) {
        return (
            <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <Text>Não existem barbearias cadastradas para se vincular</Text>
            </Stack>
        )
    }


    if (usuario !== null && !usuario.eBarbeiro) {
        return (
            <SafeAreaView style={{
                flex: 1,
                marginHorizontal: 10,
                margin: 20
            }}>
                <View style={{height: 50, marginLeft: 8}}>
                    <SelectComponent items={barbearias} item={barbearia} setItem={setBarbearia} />
                </View>
                <View style={{margin: 5}}/>
                <ButtonComponent texto='Me vincular como barbeiro' onPress={() => perguntarParaSeTornarDono()} />
            </SafeAreaView>
        )
    }

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Agendamentos" component={AgendamentosScreen}
                options={{
                    headerShown: false, tabBarLabel: 'Barbearias',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="book" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BarbeiroTabsScreen;