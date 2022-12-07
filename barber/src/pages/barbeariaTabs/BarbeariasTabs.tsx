import * as React from 'react';
import { Navegacao } from '../../interfaces/navegacao.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { usuarioReducer } from '../../reducers/UsuarioReducer';
import { Usuario } from '../../interfaces/usuario.interface';
import { Stack } from '@react-native-material/core';
import ButtonComponent from '../../components/Button';
import { atualizarUsuarioFirestore } from '../../controllers/usuario.controller';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AgendamentoScreen from './Agendamento';

const Tab = createBottomTabNavigator<Navegacao>();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: "black",
    },
    tabBarActiveTintColor: "white",
    tabBarActiveBackgroundColor: "gray",
    tabBarInactiveTintColor: "white",
}

type BarbeariasTabsProps = NativeStackScreenProps<Navegacao, "BarbeariasTabs">;
const BarbeariasTabsScreen: React.FC<BarbeariasTabsProps> = (props) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    React.useEffect(() => {
        setUsuario(usuarioReducer.getState().value);

        usuarioReducer.subscribe(() => {
            setUsuario(usuarioReducer.getState().value);
        });
    }, []);

    if (usuario === null) {
        return (
            <></>
        )
    }

    const tornarDonoBarbearia = () => {
        let newUsuario = { ...usuario }
        newUsuario.eDonoBarbearia = true;
        atualizarUsuarioFirestore(newUsuario).then(() => {
            setUsuario(newUsuario)
        }).catch(() => {
            Alert.alert(
                "Ocorreu um erro ao se tornar dono de barbearia!", "Verifique sua conexão",
                [{ text: "OK" }]
            );
        });
    }

    const perguntarParaSeTornarDono = () => {
        Alert.alert(
            "Deseja se tornar dono de barbearia no APP?",
            "Isso fará com que tenha acesso a uma serie de mecanismos, qualquer fraude é de sua responsabilidade",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Aceito", onPress: () => tornarDonoBarbearia() }
            ]
        );
    }

    if (usuario !== null && !usuario.eDonoBarbearia) {
        return (
            <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <ButtonComponent texto='Sou dono de barbearia!' onPress={() => perguntarParaSeTornarDono()} />
            </Stack>
        )
    }

    const {barbearia} = props.route.params;

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Agendamento" component={AgendamentoScreen} initialParams={{barbearia}}
                options={{
                    headerShown: false, tabBarLabel: 'Agendar',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="scissors" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BarbeariasTabsScreen;