// import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, SideBarStack } from './src/interfaces/navegation.interface';

import CadastroScreen from './src/pages/cadastro/Cadastro';
import EntrarScreen from './src/pages/login/Entrar';
import { auth } from './src/reducers/AuthReducer';
import { useState } from 'react';
import { lerIdUsuarioAsyncStorage } from './src/controllers/usuario.controller';
import SideMenuScreen from './src/pages/menu/SideMenu';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const [estaLogado, setEstaLogado] = useState<boolean | null>(null);

  React.useEffect(() => {
    lerIdUsuarioAsyncStorage().then((id) => {
      if (id && id !== null) {
        setEstaLogado(true);
      } else {
        setEstaLogado(false);
      }
    }).catch((error) => {
      console.log(error);
      setEstaLogado(false);
    });
  }, [])

  auth.subscribe(() => {
    setEstaLogado(auth.getState().value);
  });

  if (estaLogado === null) {
    return <></>
  }

  return (
    <NavigationContainer theme={navTheme} >
        <Stack.Navigator screenOptions={screenOptions}>
          {!estaLogado ?
            <>
              <Stack.Screen name='Entrar' component={EntrarScreen} options={{ headerShown: false }} />
              <Stack.Screen name='Cadastro' component={CadastroScreen} />
            </>
            :
            <>
              <Stack.Screen name='SideMenu' component={SideMenuScreen} options={{ headerShown: false, title: 'Awesome app', }} />
            </>
          }
        </Stack.Navigator>
    </NavigationContainer >

  );
};

export default App;


