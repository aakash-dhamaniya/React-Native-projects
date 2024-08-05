// In ../screens/Home.js
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import Forecast from "../components/Forecast";
import * as Progress from 'react-native-progress';
import { getDataFromLocal } from "../asyncStorage/asynStorage";
import { fetchWeatherForecast } from "../api/weather";
const Home = () => {
  const[foreCastData,setForeCastData]=useState([])
  const [loader,setLoader]=useState(true)
  useEffect(()=>{
    const getData=async()=>{
      const data= await getDataFromLocal("city")
   const parsData= await JSON.parse(data)
      console.log(parsData);
      // for api call to get weather details
      const foreCastData = await fetchWeatherForecast(parsData||{"cityName": "Delhi", "days": "7"}
      );
      setForeCastData(foreCastData)
      setLoader(false)

    }
      getData()
   
  },[])
  return (
    
    <View className="flex-1 relative">
     
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className=" absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1 mt-1">
       
        <SearchBar setForeCastData={setForeCastData}/>
       
       {loader? <Progress.CircleSnail/>:<Forecast foreCastData={foreCastData}/>}
      
      </SafeAreaView>
     
    </View>
  );
};

export default Home;
