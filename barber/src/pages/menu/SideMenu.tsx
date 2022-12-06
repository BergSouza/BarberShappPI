import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SideBarStack, RootStackParamList } from '../../interfaces/navegation.interface';
import AdicionarBarbeariaScreen from '../adicionarBarbearia/AdicionarBarbearia';
import AgendamentoScreen from '../agendamento/Agendamento';
import BarbeariasScreen from '../barbearias/Barbearias';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import { deslogar } from '../../controllers/usuario.controller';

const Drawer = createDrawerNavigator<SideBarStack>();
type SideMenuScreenProps = NativeStackScreenProps<RootStackParamList, "SideMenu">;

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

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

const SideMenuScreen: React.FC<SideMenuScreenProps> = (props) => {
  return (
    <NavigationContainer independent={true} theme={navTheme} >
      <Drawer.Navigator initialRouteName="Barbearias" screenOptions={screenOptions}>
        <Drawer.Screen name='Barbearias' component={BarbeariasScreen} />
        <Drawer.Screen name='AdicionarBarbearia' component={AdicionarBarbeariaScreen} options={{ title: 'Adicionar Barbearia', }} />
        <Drawer.Screen name='Agendamento' component={AgendamentoScreen} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
};

export default SideMenuScreen;


