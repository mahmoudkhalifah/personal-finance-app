import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToLocalStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
};

export const getFromLocalStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
};

