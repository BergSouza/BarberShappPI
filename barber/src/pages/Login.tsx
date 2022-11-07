import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navegation';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { login } from '../controllers/user';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const doLogin = async () => {
    const hasLoged = await login(email, senha);
    if (hasLoged) {
      props.navigation.push("Main");
    }
  }

  return (
    <Stack spacing={2} style={{ margin: 16 }}>
      <TextInput placeholder="Email"
        variant="outlined"
        onChangeText={newEmail => setEmail(newEmail)}
      />
      <TextInput placeholder="Senha"
        variant="outlined"
        onChangeText={newSenha => setSenha(newSenha)}
      />
      <Pressable style={styles.button} onPress={() => doLogin()}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </Stack>

  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 5,
    width: "95%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LoginScreen;