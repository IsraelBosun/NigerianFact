import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CategoryFacts() {
  const router = useRouter();
  const { params: item } = useRoute();
  const facts = item.facts;
  const image = item.image;
  const categoryName = item.categoryName;

  const navigation = useNavigation();

  // Animated value to track the scroll position
  const scrollY = new Animated.Value(0);

  // Interpolating the scroll value to animate image height
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 115], // Image height changes from 200 to 100 as you scroll
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView>
      <View>
        {/* Animated Image Container */}
        <Animated.View style={{ height: imageHeight, overflow: 'hidden' }}>
          <Image
            source={image} // Use the passed local image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-7 mx-4 bg-green-700 w-10 h-10 rounded-full flex items-center justify-center"
          >
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text className="absolute text-white bottom-6 text-xl font-bold mx-4">
            {categoryName}
          </Text>
        </Animated.View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 1, paddingBottom: 250 }}
        showsVerticalScrollIndicator={false}
        className="mt-5 h-[700px]"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {facts.map((item, id) => (
          <View key={id} className = ''>
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
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
