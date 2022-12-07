import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AgendamentoScreen from '../pages/barbeariaTabs/Agendamento';
import BarbeariasScreen from '../pages/barbearias/Barbearias';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import { deslogar } from '../controllers/usuario.controller';
import { Usuario } from '../interfaces/usuario.interface';
import { usuarioReducer } from '../reducers/UsuarioReducer';
import HistoricoAgendamentoScreen from '../pages/historicoAgendamento/HistoricoAgendamento';
import MinhasBarbeariasScreen from '../pages/minhasBarbeariasTabs/MinhasBarbeariasTabs';
import BarbeariaEmpregadoraScreen from '../pages/barbeariaEmpregadora/BarbeariaEmpregadora';
import MinhasBarbeariasTabsScreen from '../pages/minhasBarbeariasTabs/MinhasBarbeariasTabs';
import { Navegacao } from '../interfaces/navegacao.interface';
import MinhaContaScreen from '../pages/minhaConta/MinhaConta';

const Drawer = createDrawerNavigator<Navegacao>();

const screenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
  drawerStyle: {
    backgroundColor: "black",
  },
  drawerActiveTintColor: "black",
  drawerActiveBackgroundColor: "white",
  drawerInactiveTintColor: "white",
  headerRight: () => (
    <Icon name="sign-out" size={30} color="white" style={{ marginRight: 20 }} onPress={() => { sair() }} />
  )
}

const sair = () => {
  Alert.alert(
    "",
    "Deseja realmente sair?",
    [
      {
        text: "Cancelar",
        style: "cancel"
      },
      { text: "Sair", onPress: () => deslogar() }
    ]
  );
}

type SideMenuScreenProps = NativeStackScreenProps<Navegacao, "SideMenu">;
const SideMenuScreen: React.FC<SideMenuScreenProps> = (props) => {
  const [usuario, setUsuario] = React.useState<Usuario | null>(null);

  React.useEffect(() => {
    setUsuario(usuarioReducer.getState().value);
    
    usuarioReducer.subscribe(() => {
      setUsuario(usuarioReducer.getState().value);
    });
  }, [])

  if (usuario === null) {
    return <></>
  }

  return (
      <Drawer.Navigator initialRouteName="MinhaConta" screenOptions={screenOptions}>
        <Drawer.Screen name='MinhaConta' component={MinhaContaScreen} options={{ title: 'Minha Conta' }} />
        <Drawer.Screen name='Barbearias' component={BarbeariasScreen} options={{ title: 'Todas as Barbearias' }}  />
        <Drawer.Screen name='HistoricoAgendamento' component={HistoricoAgendamentoScreen} options={{ title: 'Historico Agendamentos' }} />
        <Drawer.Screen name='MinhasBarbeariasTabs' component={MinhasBarbeariasTabsScreen} options={{ title: !usuario.eDonoBarbearia ? 'Sou Dono Barbearia?' : 'Gerenciamento Barbearias' }} />
        <Drawer.Screen name='BarbeariaEmpregadora' component={BarbeariaEmpregadoraScreen} options={{ title: !usuario.eBarbeiro ? 'Sou Barbeiro?' : 'Barbearia Empregadora' }} />
      </Drawer.Navigator>
  );
};

export default SideMenuScreen;


