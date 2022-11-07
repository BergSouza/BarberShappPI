import AsyncStorage  from "@react-native-async-storage/async-storage";

export const storeData = async (title: string, value: string) => {
    try {
        await AsyncStorage.setItem(title, value);
        return true
    } catch (error) {
        return false
    }
}

export const retrieveData = async (title:string) => {
    try {
        const value = await AsyncStorage.getItem(title);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        return false
    }
}

export const removeData= async(title: string) =>{
    try {
        await AsyncStorage.removeItem(title);
        return true;
    }
    catch(exception) {
        return false;
    }
}