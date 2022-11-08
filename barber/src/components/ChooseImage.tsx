import * as React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import ButtonComponent from './Button';

export interface ChooseImageComponentProps {
    setFotoUri: React.Dispatch<React.SetStateAction<undefined | string>>
}

const ChooseImageComponent: React.FC<ChooseImageComponentProps> = (props) => {


    const escolherFoto = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                if (response.assets && response.assets !== null) {
                    props.setFotoUri(response.assets[0].uri)
                }
            }

        })
    }

    return (
        <ButtonComponent texto='Escolher foto' onPress={() => { escolherFoto() }}></ButtonComponent>
    )
}

const mediaType: MediaType = "photo";

var options = {
    title: 'Select Avatar',
    selectionLimit: 1,
    mediaType,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default ChooseImageComponent;