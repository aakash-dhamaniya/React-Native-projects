// In ../screens/Home.js
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import Forecast from "../components/Forecast";

import { getDataFromLocal } from "../asyncStorage/asynStorage";
const Home = () => {
  const[foreCastData,setForeCastData]=useState([])
  useEffect(()=>{
    const getData=async()=>{
      const data= await getDataFromLocal("forecast")
   const parsData=JSON.parse(data)
      // data=JSON.parse(data)
      setForeCastData(parsData)
      
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
