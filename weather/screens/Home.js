// In ../screens/Home.js
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import Forecast from "../components/Forecast";

import { getDataFromLocal } from "../asyncStorage/asynStorage";
import { fetchWeatherForecast } from "../api/weather";
const Home = () => {
  const[foreCastData,setForeCastData]=useState([])
  useEffect(()=>{
    const getData=async()=>{
      const data= await getDataFromLocal("city")
   const parsData= await JSON.parse(data)
      console.log(parsData);
      // for api call to get weather details
      const foreCastData = await fetchWeatherForecast(parsData||{"cityName": "Delhi", "days": "7"}
      );
      setForeCastData(foreCastData)
      

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
        <Forecast foreCastData={foreCastData}/>
       
      </SafeAreaView>
    </View>
  );
};

export default Home;
