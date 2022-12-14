import * as React from 'react';
import { Image, Pressable, PressableProps, StyleSheet, Text, View, ViewProps } from 'react-native';

export interface ButtonComponentProps extends PressableProps {
    fotoCaminho?: string;
    titulo?: string;
    descricao?: string;
}

const CardWithButtonComponent: React.FC<ButtonComponentProps> = (props) => {
    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            width: "100%",
            minHeight: 270,
            marginBottom: 10,
            borderRadius: 5,
        },
        viewImg: {
            borderWidth: 1,
            width: "100%",
            height: 188,
            marginBottom: 10,
            backgroundColor: "black",
            padding: 2
        },
        img: {
            width: "100%",
            height: 180,
            borderRadius: 5,
        },
        textTitle: {
            fontSize: 23,
            marginTop: -10,
            marginLeft: 10,
            color: "black"
        },
        description: {
            fontSize: 15,
            marginLeft: 10,
            color: "black"
        }
    });

    return (
        <Pressable {...props}>
            <View style={[styles.card]} >
                <View style={styles.viewImg}>
                    <Image style={styles.img} source={props.fotoCaminho ? { uri: props.fotoCaminho } : require('../imagens/sem_foto.jpg')} />
                </View>
                <Text style={styles.textTitle}>{props.titulo ? props.titulo : "..."}</Text>
                <Text style={styles.description}>{props.descricao ? props.descricao : "..."}</Text>
            </View>
        </Pressable>
    )
}


export default CardWithButtonComponent;