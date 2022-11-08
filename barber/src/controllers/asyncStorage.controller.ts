import AsyncStorage from "@react-native-async-storage/async-storage";

export const criarAsyncStorage = async (title: string, value: string) => {
    await AsyncStorage.setItem(title, value);
    return true;
}

export const lerAsyncStorage = async (title: string) => {
    const value = await AsyncStorage.getItem(title);
    return value;
}

export const deletarAsyncStorage= async (title: string) => {
    await AsyncStorage.removeItem(title);
    return true;
}