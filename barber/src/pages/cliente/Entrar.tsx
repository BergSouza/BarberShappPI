import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { RootStackParamList } from '../../interfaces/navegation.interface';
import { entrar } from '../../controllers/usuario.controller';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { Stack } from '@react-native-material/core';

type EntrarScreenProps = NativeStackScreenProps<RootStackParamList, "Entrar">;
const EntrarScreen: React.FC<EntrarScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const tentarEntrar = () => {
    entrar(email, senha).then((hasLoged) => {
      props.navigation.push("Menu");
    }).catch((error) => {
      Alert.alert(
        "Ocorreu um erro ao tentar logar!", error,
        [{ text: "OK" }]
      );
    })
  }

  return (
  <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right:0 }}>
      <InputComponent placeholder="Email" temErro={false} textoErro={'Meu pau'}
        onChangeText={newEmail => setEmail(newEmail)}
      />
      <InputComponent placeholder="Senha" temErro={false} textoErro={'Meu pau'} secureTextEntry={true}
        onChangeText={newSenha => setSenha(newSenha)}
      />
      <View style={{ margin: 15 }} />
      <ButtonComponent texto='Entrar' onPress={() => tentarEntrar()} />
      <View style={{ margin: 15 }} />
      <Pressable onPress={() => { props.navigation.push("Cadastro"); }} style={{ justifyContent: 'center', alignItems: "center" }}>
        <Text style={{ color: "blue", textDecorationLine: 'underline', fontSize: 20 }}>Não possuí conta?</Text>
      </Pressable>
    </Stack>

  )
}


export default EntrarScreen;