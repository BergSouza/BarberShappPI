import * as React from 'react';
import { Pressable, Stack, Text, TextInput } from "@react-native-material/core";
import { RootStackParamList } from '../types/navegation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { registerUser } from '../controllers/user';
import { Barbearia } from '../interfaces/barbearia.interface';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';

type AdicionarBarbeariaProps = NativeStackScreenProps<RootStackParamList, "AdicionarBarbearia">;

const AdicionarBarbeariaScreen: React.FC<AdicionarBarbeariaProps> = (props) => {
    const [cnpj, setCnpj] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [fotoCaminho, setFotoCaminho] = useState();

    const chooseFile = () => {

        const PHOTO:MediaType = "photo";

        const options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: PHOTO
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                let source = response;
                console.log(response)
                //setFotoCaminho(source.assets);
            }
        });
    };

    const cadastrarBarbearia = async () => {
        if (cnpj || endereco) {
            Alert.alert(
                "Preencha todos os campos!",
                "Confira se todos os campos estão preenchidos",
                [{ text: "OK" }]
            );
        }
    }

    return (
        <Stack spacing={2} style={{ margin: 16 }}>
            <TextInput placeholder="CNPJ"
                variant="outlined"
                onChangeText={newCNPJ => setCnpj(newCNPJ)}
            />
            <TextInput placeholder="Endereco"
                variant="outlined"
                onChangeText={newEndereco => setEndereco(newEndereco)}
            />

            {/* <Image
                source={{ uri: fotoCaminho?.uri }}
                style={styles.imageStyle}
            /> */}

            <TouchableOpacity
                activeOpacity={0.5}
                // style={styles.buttonStyle}
                onPress={chooseFile}>
                <Text>
                    Choose Image
                </Text>
            </TouchableOpacity>

            <Pressable style={styles.button} onPress={() => cadastrarBarbearia()}>
                <Text style={styles.text}>Cadastrar</Text>
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

export default AdicionarBarbeariaScreen;