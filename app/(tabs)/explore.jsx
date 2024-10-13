import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, TextInput, Animated, RefreshControl, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import { useNavigation, useTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Modal, Portal, Card, Provider } from 'react-native-paper';  // Provider is added for proper modal functionality
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Share, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ExternalLink } from '../../components/ExternalLink'; // Import ExternalLink

const FactList = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();
  const { colors } = useTheme();

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
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFacts();
  };

  const [visible, setVisible] = React.useState(false);
  const [selectedLinks, setSelectedLinks] = React.useState({ link1: null, link2: null });

  const showModal = (links) => {
    setSelectedLinks(links); // Store the selected fact's links
    setVisible(true); // Show the modal
  };
  const hideModal = () => setVisible(false);

  // Function to handle sharing a fact (image and text)
  const handleShare = async (factItem) => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        factItem.image,
        FileSystem.cacheDirectory + 'shared-image.jpg'
      );
      const { uri } = await downloadResumable.downloadAsync();

      if (uri) {
        await Share.share({
          title: factItem.title,
          message: `${factItem.title}\n\n${factItem.shortDescription}`,
          url: uri,
        });
      } else {
        Alert.alert('Error', 'Failed to download image for sharing');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share content');
    }
  };

  const filteredFacts = facts
    .filter(fact => selectedCategory === 'All' || fact.category === selectedCategory)
    .filter(fact => fact.title.toLowerCase().includes(searchTerm.toLowerCase()) || fact.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderFact = ({ item }) => (
    <View 
    style={{
      backgroundColor: colors.primary,
      borderRadius: 16,
      marginBottom: 16,
      marginHorizontal: 16,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 4,
    }}
    className=" rounded-2xl mb-4 mx-4 shadow-lg ">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 rounded-2xl mb-4"
        />
      )}
      <View className='px-4'>
        <View className='flex-row items-center justify-between'>
          <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
            {item.title}
          </Text>
          <View className='flex-row items-center justify-center gap-4'>
            <TouchableOpacity>
              <AntDesign name="hearto" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showModal({ link1: item.link1, link2: item.link2 })}>
              <SimpleLineIcons name="exclamation" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="leading-5 text-[16px] mb-2" style={{ color: colors.text }}>
          {item.shortDescription}
        </Text>
        <View className='flex-row gap-2 pb-5'>
          <TouchableOpacity onPress={() => navigation.navigate('FactDetails', item)} className='bg-green-700 px-6 py-2 rounded-2xl'>
            <Text className='text-white text-xs'>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderColor: colors.text }}
            onPress={() => handleShare(item)}
            className="border px-7 py-2 rounded-2xl"
          >
            <Text className="text-xs" style={{ color: colors.text }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 115],
    extrapolate: 'clamp',
  });

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View>
          {/* Animated Image Container */}
          <Animated.View style={{ height: imageHeight, overflow: 'hidden' }}>
            <Image
              source={require('../../assets/pictures/background.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-3 mx-4 bg-green-700 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <View className='w-[70%] py-1 flex absolute left-10 mt-3 flex-row items-center justify-center border border-white rounded-full ml-9'>
              <View className=' mb-1 ml-4'>
                <EvilIcons name="search" size={26} color="white" />
              </View>
              <TextInput
                className='text-white w-[80%] text-xs'
                placeholder='Search for facts'
                placeholderTextColor='white'
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            <Text className="absolute text-white bottom-6 text-xl font-bold mx-4">
              Browse Interesting Facts
            </Text>
          </Animated.View>
        </View>

        <View className=''>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              <ScrollView
                contentContainerStyle={{ paddingEnd: 30 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="my-4 pl-4"
              >
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
                <View className="h-[700px]">
                  <Animated.FlatList
                    data={filteredFacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFact}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 320 }}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: false }
                    )}
                  />
                </View>
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-lg">No facts available</Text>
                </View>
              )}
            </>
          )}
        </View>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ padding: 5, backgroundColor: 'white', margin: 30, borderRadius: 10 }}>
            <Text className='text-lg font-semibold mb-4 text-center'>Fact Links</Text>
            <View className='flex items-center justify-center  mb-5'>
            <ExternalLink className='' href={selectedLinks.link1} style={{ marginBottom: 10 }}>
                <Text style={{ color: 'blue' }}>{selectedLinks.link1}</Text>
              </ExternalLink>
              <ExternalLink className=''  href={selectedLinks.link2}>
                <Text style={{ color: 'blue' }}>{selectedLinks.link2}</Text>
              </ExternalLink  >
              <TouchableOpacity onPress={hideModal} style={{ marginTop: 20 }}>
            <Text className='font-bold' style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};

export default FactList;
