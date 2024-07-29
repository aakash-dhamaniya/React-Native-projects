import AsyncStorage from "@react-native-async-storage/async-storage";
export async function saveDataToLocal(key, data) {
    console.log(typeof(key));
    data=JSON.stringify(data)
    try {
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        throw new Error(error)
    }
  
}
export async function getDataFromLocal(key) {
  const data = await AsyncStorage.getItem(key);
  
  return data;
}
