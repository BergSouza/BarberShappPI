import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navegation';

import CadastroScreen from './src/pages/Cadastro';
import LoginScreen from './src/pages/Login';
import HomeScreen from './src';
import MainScreen from './src/pages/Main';
import AdicionarBarbeariaScreen from './src/pages/AdicionarBarbearia';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Cadastro' component={CadastroScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='AdicionarBarbearia' component={AdicionarBarbeariaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
