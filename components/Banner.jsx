import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';

const Banner = ({
  imageSource,
  searchPlaceholder = 'Search',
  buttonIcon = 'arrow-back-outline',
  buttonIconSize = 24,
  buttonIconColor = 'black',
  bottomText = 'Browse Interesting Facts',
  onBackPress,
}) => {
  return (
    <SafeAreaView>
      <Image source={imageSource} style={{ flex: 1 }} />
      <View className='absolute mx-2 left-2 top-12 flex-row justify-around gap-5'>
        <TouchableOpacity
          className='bg-white w-8 h-8 rounded-full flex items-center justify-center'
          onPress={onBackPress}
        >
          <Ionicons name={buttonIcon} size={buttonIconSize} color={buttonIconColor} />
        </TouchableOpacity>
        <View className='w-[70%] px-2 flex-row items-center justify-start border border-white rounded-2xl ml-9'>
          <EvilIcons name="search" size={27} color="white" />
          <TextInput
            className='text-white w-[90%] text-xs'
            placeholder={searchPlaceholder}
            placeholderTextColor='white'
          />
        </View>
      </View>
      <View className='absolute bottom-5 mx-2'>
        <Text className='text-white text-2xl'>{bottomText}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Banner;
