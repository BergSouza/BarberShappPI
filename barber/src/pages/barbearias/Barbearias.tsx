import * as React from 'react';
import { SideBarStack } from '../../interfaces/navegation.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Barbearia } from '../../interfaces/barbearia.interface';
import { Text } from '@react-native-material/core';
import InputComponent from '../../components/Input';

type BarbeariasProps = NativeStackScreenProps<SideBarStack, "Barbearias">;

const BarbeariasScreen: React.FC<BarbeariasProps> = (props) => {
    const [barbearias, setBarbearias] = useState<Barbearia[]>([]);

    const procurarBarbearia = (palavra: string) => {

    }


    return (
        <SafeAreaView style={styles.container}>
            <InputComponent placeholder="CNPJ" onChangeText={texto => procurarBarbearia(texto)} style={{borderRadius: 100}}/>
            <Text>AAAA</Text>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    scrollView: {
        backgroundColor: "blue",
    },
    text: {
        fontSize: 42,
    },
   

});

export default BarbeariasScreen;