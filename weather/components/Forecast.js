import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { weatherImages } from "../constants";
import NextDaysForecast from "./NextDaysForecast";
const Forecast = ({ foreCastData }) => {
  const { location, current, forecast } = foreCastData;
  console.log("forcast local===>", foreCastData);
  return (
    <View className="mx-4 flex justify-around flex-1">
      <Text className="text-white text-2xl text-center font-bold">
        {location?.name},
        <Text className="text-lg font-semibold text-gray-300">
          {" " + location?.country}
        </Text>
      </Text>
      <View className=" flex-row justify-center">
        <Image
          source={weatherImages[current?.condition?.text]}
          className="w-52 h-52 "
          resizeMode="contains"
        />
      </View>
      <View className=" space-y-2">
        <Text className="text-center text-white text-6xl ml-5 font-bold ">
          {current?.temp_c}&#176;
        </Text>
        <Text className="text-center text-white   text-xl tracking-widest">
          {current?.condition?.text}
        </Text>
      </View>
      {/* other states */}
      <View className="flex-row mx-4 justify-between">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/wind.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {" "}
            {current?.wind_kph}km
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/drop.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {" "}
            {current?.humidity}%
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/sun.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
      <NextDaysForecast forcastDay={forecast?.forecastday} />
    </View>
  );
};

export default Forecast;
