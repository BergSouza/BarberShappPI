import * as React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';

export interface LoadingComponentProps extends ActivityIndicatorProps {
}
const LoadingComponent: React.FC<LoadingComponentProps> = (props) => {

    const styles = StyleSheet.create({
        view: {
            flex: 1,
            justifyContent: "center"
        },
        horizontal: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10
        }
    });

    return (
        <View style={[styles.view, styles.horizontal]} >
            <ActivityIndicator size="large" {...props} />
        </View>
    )
}


export default LoadingComponent;