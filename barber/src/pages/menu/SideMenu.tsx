import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SideBarStack, RootStackParamList } from '../../interfaces/navegation.interface';
import AdicionarBarbeariaScreen from '../adicionarBarbearia/AdicionarBarbearia';
import AgendamentoScreen from '../agendamento/Agendamento';
import BarbeariasScreen from '../barbearias/Barbearias';

const Drawer = createDrawerNavigator<SideBarStack>();

const screenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
  drawerStyle: {
    backgroundColor: "black",
  },
  drawerActiveTintColor: "black",
  drawerActiveBackgroundColor: "white",
  drawerInactiveTintColor: "white",

}
type SideMenuScreenProps = NativeStackScreenProps<RootStackParamList, "SideMenu">;

const SideMenuScreen: React.FC<SideMenuScreenProps> = (props) => {
  return (
    <NavigationContainer independent={true} >
      <Drawer.Navigator initialRouteName="Barbearias" screenOptions={screenOptions}>
        <Drawer.Screen name='Barbearias' component={BarbeariasScreen} />
        <Drawer.Screen name='AdicionarBarbearia' component={AdicionarBarbeariaScreen} options={{ title: 'Adicionar Barbearia', }} />
        <Drawer.Screen name='Agendamento' component={AgendamentoScreen} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
};

export default SideMenuScreen;


