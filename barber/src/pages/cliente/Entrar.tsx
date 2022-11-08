import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);


  const tentarEntrar = () => {
    if (!email || !senha) {
      !email ? setErroEmail(true) : null;
      !senha ? setErroSenha(true) : null;
      return
    }

    entrar(email, senha).then((logou) => {
      if(logou){
        props.navigation.push("Menu");
      }else{
        Alert.alert(
          "Ocorreu um erro ao tentar logar!", "Verifique se seu e-mail e senha estão corretos",
          [{ text: "OK" }]
        );
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Stack spacing={2} style={{ margin: 16, justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
      <View style={{ justifyContent: 'center', alignItems: "center" }}>
        <Image style={{ width: 200, height: 100 }} source={require('../../imagens/logo.png')} />
        <Text style={{ color: "black", fontSize: 25, fontFamily: "courrier" }}>BarberShapp</Text>
      </View>

      <View style={{ margin: 50 }} />
      <InputComponent placeholder="Email" temErro={erroEmail} textoErro={'Erro no campo email'}
        onChangeText={newEmail => setEmail(newEmail)} onFocus={() => setErroEmail(false)}
      />
      <InputComponent placeholder="Senha" temErro={erroSenha} textoErro={'Erro no campo senha'} secureTextEntry={true}
        onChangeText={newSenha => setSenha(newSenha)} onFocus={() => setErroSenha(false)}
      />
      <View style={{ margin: 15 }} />
      <ButtonComponent texto='Entrar' onPress={() => tentarEntrar()} />
      <View style={{ margin: 15 }} />
      <Pressable onPress={() => { props.navigation.push("Cadastro"); }} style={{ justifyContent: 'center', alignItems: "center" }}>
        <Text style={{ color: "blue", textDecorationLine: 'underline', fontSize: 20 }}>Não possui conta?</Text>
      </Pressable>
    </Stack>

  )
}


export default EntrarScreen;