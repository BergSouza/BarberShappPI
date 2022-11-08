import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View, Button, Pressable, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../interfaces/navegation.interface';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, "Menu">

const MenuScreen: React.FC<MenuScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable style={styles.button} onPress={() => props.navigation.push("Cadastro")}>
        <Text style={styles.text}>Agendar Atendimento</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => props.navigation.push("Cadastro")}>
        <Text style={styles.text}>Minha Agenda</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => props.navigation.push("AdicionarBarbearia")}>
        <Text style={styles.text}>Adicionar Barbearia</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => props.navigation.push("Entrar")}>
        <Text style={styles.text}>Sair</Text>
      </Pressable>
    </View>
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

export default MenuScreen;