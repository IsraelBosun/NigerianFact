import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FactCard = ({ item, navigation }) => {
  return (
    <View className="bg-[#E2F3EA] rounded-2xl mb-4 mx-4 shadow-2xl border border-green-300">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 rounded-2xl mb-4"
        />
      )}
      <View className="px-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold mb-2">{item.title}</Text>
          <View className="flex-row items-center justify-center gap-4">
            <TouchableOpacity>
              <AntDesign name="heart" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="exclamationcircle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="leading-5 text-[16px] text-black mb-2">
          {item.shortDescription}
        </Text>
        <View className="flex-row gap-2 pb-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('FactDetails', item)}
            className="bg-green-700 px-6 py-2 rounded-2xl"
          >
            <Text className="text-white text-xs">Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border px-7 py-2 rounded-2xl">
            <Text className="text-black text-xs">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FactCard;
