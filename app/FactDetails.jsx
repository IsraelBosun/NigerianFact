import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';



export default function FactDetails() {

 const {params: item} = useRoute()
 console.log(item)
 const navigation = useNavigation()   

  return (
    <View>
        <View>
      <Image
          source={{ uri: item.image }} // Use the passed local image
          style={{ width: '100%', height: 250 }}
          resizeMode="cover"
          className = "rounded-b-3xl"
        />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-7 mx-4 bg-green-700  w-10 h-10 rounded-full flex items-center justify-center'>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className='absolute right-1 top-7 mx-4 border border-white  w-10 h-10 rounded-full flex items-center justify-center'>
          <FontAwesome name="heart-o" size={22} color="white" />
          </TouchableOpacity>
      </View>
      <View className = 'mx-4'>
        <Text className= 'text-black text-2xl font-bold  mt-4'>{item.title}</Text>
        <View className = 'border mt-2 border-neutral-500'></View>
      <ScrollView contentContainerStyle={{paddingBottom: 250}} showsVerticalScrollIndicator={false}>
        <Text className = 'leading-6 mt-3 text-[17px] text-green-700'>{item.longDescription}</Text>
      </ScrollView>
      </View>
      <Text className='text-xl'></Text>
    </View>
  )
}