import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocation, fetchWeatherForecast } from "../api/weather";
import { saveDataToLocal } from "../asyncStorage/asynStorage";
const SearchBar = ({ setForeCastData }) => {
  const [searchShow, setSearchShow] = useState(false);
  const [location, setLocation] = useState([]);
  const handleLocation = async (loc) => {
    
    setLocation([]);
    const foreCastData = await fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    });
   
     await saveDataToLocal("city",{
        cityName: loc.name,
        days: "7",
      });
    setForeCastData(foreCastData);
   
  };
  const handleSearch = async (value) => {
    if (value.length > 2) {
      const data = await fetchLocation({ cityName: value });
      setLocation(data);
    }
  };
  const handleTextBounce = useCallback(debounce(handleSearch, 90), []);
  return (
    <View style={{ height: "7%" }} className="mx-4 relative z-50 ">
      <View
        className="flex-row justify-end items-center rounded-full "
        style={{
          backgroundColor: searchShow ? theme.bgwhite(0.2) : "transparent",
        }}
      >
        {searchShow && (
          <TextInput
            onChangeText={handleTextBounce}
            autoFocus
            placeholder="Search city"
            placeholderTextColor={"lightgray"}
            className="pl-6 h-10 pb-1 flex-1 text-base text-white  "
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setLocation([]);
            setSearchShow(!searchShow);
          }}
          style={{ backgroundColor: theme.bgwhite(0.3) }}
          className="rounded-full p-3 m-1 "
        >
          <MagnifyingGlassIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {location.length > 0 && searchShow ? (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
          {location.map((loc, index) => {
            let showBar = index + 1 != location.length;
            let borderClass = showBar ? "border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity
                key={loc.id}
                className={
                  "flex-row items-center border-0 p-3 px-4 mb-1  " + borderClass
                }
                onPress={() => handleLocation(loc)}
              >
                <MapPinIcon size={20} color="gray" />
                <Text className="text-black t text-lg ml-2">
                  {loc?.name} {loc?.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default SearchBar;
