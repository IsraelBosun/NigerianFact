import { View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';



export default function Favourites() {

  const navigation = useNavigation()


  return (
    <SafeAreaView className="flex-1">
      <View className='border overflow-hidden h-100'>
          <Image
            source={require('../../assets/images/settingsbanner.png')}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-1 mx-4 bg-white w-10 h-10 rounded-full flex items-center justify-center'>
            <Ionicons name="arrow-back-outline" size={24} color="green" />
          </TouchableOpacity>
      </View>
      <View className='flex mx-4 mt-4'>
        <Text className= 'text-3xl font-semibold'>Settings</Text>
        <View className = 'mt-4'>
          <View className= 'flex-row items-center justify-between'>
            <Text className = 'text-[16px]'>Push Notifications</Text>
            <Ionicons name="arrow-back-outline" size={24} color="green" />
          </View>
          <View className= 'flex-row items-center mt-4 justify-between'>
            <Text className = 'text-[16px]'>Dark Theme</Text>
            <Ionicons name="arrow-back-outline" size={24} color="green" />
          </View>
        </View>
      </View>


      <View className='flex mx-4 mt-8'>
        <Text className= 'text-3xl font-semibold'>Resources</Text>
        <View className = 'mt-4'>
          <View className= 'flex-row items-center justify-between'>
            <Text className = 'text-[16px]'>Contact Us</Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
          <View className= 'flex-row items-center mt-4 justify-between'>
            <Text className = 'text-[16px]'>Rate in Play Store</Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
          <View className= 'flex-row items-center mt-4 justify-between'>
            <Text className = 'text-[16px]'>Terms & Privacy</Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
          <View className= 'flex-row items-center mt-4 justify-between'>
            <Text className = 'text-[16px]'>Report Bug</Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </View>
      </View>
      <TouchableOpacity className = 'w-100 h-[200px] items-center justify-center'>
      <Text className = 'text-gray-500 text-[16px]'>Version 1.1.0</Text>
      </TouchableOpacity>
      <Text className='text-2xl'></Text>
      </SafeAreaView>
  )
}