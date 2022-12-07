// import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navegacao } from './src/interfaces/navegacao.interface';

import CadastroScreen from './src/pages/cadastro/Cadastro';
import EntrarScreen from './src/pages/login/Entrar';
import { auth } from './src/reducers/AuthReducer';
import { useState } from 'react';
import { lerIdUsuarioAsyncStorage, lerUsuarioFirestore } from './src/controllers/usuario.controller';
import SideMenuScreen from './src/components/SideMenu';
import { update, usuarioReducer } from './src/reducers/UsuarioReducer';
import BarbeariasTabsScreen from './src/pages/barbeariaTabs/BarbeariasTabs';

const Stack = createNativeStackNavigator<Navegacao>();

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
    lerIdUsuarioAsyncStorage().then(async (id) => {
      if (id && id !== null) {
        setEstaLogado(true);
        const usuario = await lerUsuarioFirestore(id);
        usuarioReducer.dispatch(update(usuario));
      } else {
        setEstaLogado(false);
      }
    }).catch((error) => {
      setEstaLogado(false);
    });

    auth.subscribe(() => {
      setEstaLogado(auth.getState().value);
    });
  }, [])


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
            <Stack.Screen name='SideMenu' component={SideMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name='BarbeariasTabs' component={BarbeariasTabsScreen} options={{ title: "Barbearia"}} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer >

  );
};

export default App;


