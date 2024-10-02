import { View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';



export default function Favourites() {

  const navigation = useNavigation()


  return (
    <SafeAreaView className="">
      <View >
          <Image
            source={require('../../assets/images/favbanner.png')}
            style={{ width: '100%', height: '65%' }}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-1 mx-4 bg-green-700 w-10 h-10 rounded-full flex items-center justify-center'>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text className='absolute text-white bottom-[130px] text-xl font-bold mx-4'>Favourites</Text>
      </View>
      <View className =' flex-1 items-center justify-center'>
      <Text className='text-xl text-gray-400'>Coming Soon</Text>
      </View>
      </SafeAreaView>
  )
}