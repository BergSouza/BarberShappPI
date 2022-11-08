import { NavigationContainer, Theme } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/interfaces/navegation.interface';

import CadastroScreen from './src/pages/cliente/Cadastro';
import AdicionarBarbeariaScreen from './src/pages/barbeiro/AdicionarBarbearia';
import EntrarScreen from './src/pages/cliente/Entrar';
import MenuScreen from './src/pages/cliente/Menu';
import AgendamentoScreen from './src/pages/cliente/Agendamento';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white'
}

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={screenOptions} >
        <Stack.Screen name='Entrar' component={EntrarScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Cadastro' component={CadastroScreen}/>
        <Stack.Screen name='Menu' component={MenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='AdicionarBarbearia' component={AdicionarBarbeariaScreen} />
        <Stack.Screen name='Agendamento' component={AgendamentoScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default App;
