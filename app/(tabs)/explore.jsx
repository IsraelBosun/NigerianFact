import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView, TextInput, Animated, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const FactList = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Track refreshing state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();

  // Animated value for tracking scroll position
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'facts'));
      const factsData = [];
      const categorySet = new Set(['All']);
      
      querySnapshot.forEach((doc) => {
        const factData = { id: doc.id, ...doc.data() };
        factsData.push(factData);
        categorySet.add(factData.category);
      });

      setFacts(factsData);
      setCategories([...categorySet]);
    } catch (error) {
      console.error('Error fetching facts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // End refreshing after data is fetched
    }
  };

  // Refresh control handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchFacts(); // Fetch facts again to refresh the data
  };

  const filteredFacts = facts
    .filter(fact => selectedCategory === 'All' || fact.category === selectedCategory)
    .filter(fact => fact.title.toLowerCase().includes(searchTerm.toLowerCase()) || fact.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderFact = ({ item }) => (
    <View className="bg-[#E2F3EA] rounded-2xl mb-4 mx-4 shadow-lg border border-green-300">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 rounded-2xl mb-4"
        />
      )}
      <View className='px-4'>
        <View className='flex-row items-center justify-between'>
          <Text className="text-lg font-bold mb-2">{item.title}</Text>
          <View className='flex-row items-center justify-center gap-4'>
            <TouchableOpacity>
              <AntDesign name="heart" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SimpleLineIcons name="exclamation" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="leading-5 text-[16px] text-black mb-2">
          {item.shortDescription}
        </Text>
        <View className='flex-row gap-2 pb-5'>
          <TouchableOpacity onPress={() => navigation.navigate('FactDetails', item)} className='bg-green-700 px-6 py-2 rounded-2xl'>
            <Text className='text-white text-xs'>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity className='border px-7 py-2 rounded-2xl'>
            <Text className='text-black text-xs'>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Interpolating the scroll value to animate image height
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 100], // Image height changes from 200 to 80
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="">
      <View>
        {/* Animated Image Container */}
        <Animated.View style={{ height: imageHeight, overflow: 'hidden' }}>
          <Image
            source={require('../../assets/pictures/background.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-2 mx-4 bg-green-700 w-10 h-10 rounded-full flex items-center justify-center'>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <View className='w-[70%] flex absolute left-10 mt-3 flex-row items-center justify-center border border-white rounded-2xl ml-9'>
            <View className=' mb-1 ml-4'>
              <EvilIcons name="search" size={26} color="white" />
            </View>
            <TextInput
              className='text-white w-[90%] text-xs'
              placeholder='Search for facts'
              placeholderTextColor='white'
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <Text className='absolute text-white bottom-6 text-xl font-bold mx-4'>Browse Interesting Facts</Text>
        </Animated.View>
      </View>

      <View className=''>
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <>
            <ScrollView contentContainerStyle ={{paddingEnd: 30}} horizontal showsHorizontalScrollIndicator={false} className="my-4 pl-4 ">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  className={`px-4 py-2 mr-2 rounded-full ${selectedCategory === category ? 'bg-green-700' : 'bg-gray-300'}`}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text className={`text-sm text-center ${selectedCategory === category ? 'text-white' : 'text-black'}`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {filteredFacts.length > 0 ? (
              <Animated.FlatList
                data={filteredFacts}
                keyExtractor={(item) => item.id}
                renderItem={renderFact}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 450 }}
                // Implementing the refresh control for pull-to-refresh
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-xl text-gray-500">No facts found</Text>
              </View>
            )}
          </>
        )}
      </View>
      <Text className='text-2xl'></Text>
    </SafeAreaView>
  );
};

export default FactList;