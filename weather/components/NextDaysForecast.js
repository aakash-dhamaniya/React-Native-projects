import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";
import { getImage, weatherImages } from "../constants";


const NextDaysForecast = ({ forcastDay }) => {
  
  return (
    <View className="mb-2 space-y-3 ">
      <View className="flex-row items-center mx-5 space-x-3 ">
        <CalendarDaysIcon size="22" color="white" />
        <Text className="text-white text-base">Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {forcastDay?.map((item, index) => {
          const weatherIcon = item?.day?.condition?.text;
          let date = new Date(item.date);
let options = {weekday: 'long'};
let dayName = date.toLocaleDateString('en-US', options);
         
          return (
            <View
              key={index}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4  "
              style={{ backgroundColor: theme.bgwhite(0.15) }}
            >
              <Image
                source={weatherImages[weatherIcon]||weatherImages["other"]}
                className="w-11 h-11"
              />
              <Text className="text-white ">{dayName}</Text>
              <Text className="text-white text-xl font-semibold">
                {item?.day?.avgtemp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NextDaysForecast;
