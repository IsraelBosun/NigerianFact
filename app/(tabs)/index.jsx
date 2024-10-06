import { View, Text, Image, Pressable, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MasonryFlashList } from '@shopify/flash-list';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase'; // Import your Firebase Firestore setup

const localImages = {
  Crime: require('../../assets/pictures/crime.png'),
  Wars: require('../../assets/pictures/war.png'),
  "Precolonial Period": require('../../assets/pictures/precolonial.png'),
  "Famous Nigerians": require('../../assets/pictures/famousNigerians.png'),
  Music: require('../../assets/pictures/music.png'),
  Sports: require('../../assets/pictures/sport.png'),
  Culture: require('../../assets/pictures/culture.png'),
  Education: require('../../assets/pictures/education.png'),
  Politics: require('../../assets/pictures/politics.png'),
};

export default function Index() {
  const [categories, setCategories] = useState([]); // State to store categories and their facts
  const [loading, setLoading] = useState(true); // State to manage loading
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const navigation = useNavigation(); // Navigation hook for screen navigation

  // Fetch categories and facts from Firestore
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'facts'));

      // Group facts by category
      const categoryFacts = {}; // To hold categories and their corresponding facts
      querySnapshot.forEach((doc) => {
        const factData = doc.data();
        const category = factData.category;

        if (category) {
          if (!categoryFacts[category]) {
            categoryFacts[category] = []; // Initialize array for new categories
          }
          categoryFacts[category].push(factData); // Add fact data to the category
        }
      });

      // Transform object to an array of category objects: { name: "CategoryName", facts: [...] }
      const categoriesArray = Object.keys(categoryFacts).map((categoryName) => ({
        name: categoryName,
        facts: categoryFacts[categoryName],
      }));

      setCategories(categoriesArray); // Update state with categories and their facts
    } catch (error) {
      console.error('Error fetching categories and facts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // End refreshing after data is fetched
    }
  };

  // useEffect to fetch categories on initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category press and navigate to the CategoryFacts screen
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryFacts', { categoryName: category.name, facts: category.facts, image: localImages[category.name] }); // Pass category name and its facts to the next screen
  };

  // Handle the pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true); // Start the refreshing indicator
    fetchCategories(); // Refetch categories
  };

  // Render categories in a MasonryFlashList
  return (
    <View className="">
      <SafeAreaView className="mx-3">
        {/* Header */}
        <View className="flex-row items-end justify-between mt-4 mb-3">
          <TouchableOpacity>
            <FontAwesome name="navicon" size={29} color="green" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome6 name="circle-user" size={29} color="black" />
          </TouchableOpacity>
        </View>

        {/* Display categories in MasonryFlashList */}
        <View className="w-100 h-100 flex-row justify-center items-center">
          {loading ? (
            <View className='text-center flex items-center justify-center'>
              <ActivityIndicator size="large" color="green"  />
            </View>
          ) : (
            <View className = ' h-[500px] w-full'>
              <MasonryFlashList
                data={categories} // Use categories with facts
                numColumns={2}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } // Add pull-to-refresh control
                renderItem={({ item, index }) => (
                  <Pressable
                    className="mb-5 flex-row mx-2"
                    onPress={() => handleCategoryPress(item)} // Pass category and its facts to the next screen
                  >
                    {/* Display Category Image */}
                    <Image
                      source={localImages[item.name]} // Use local images based on category name
                      style={{
                        width: '100%',
                        height: index % 2 === 0 ? 150 : 200, // Dynamic height for Masonry layout
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                    {/* Category Name */}
                    <Text className="font-bold text-[16px] text-white absolute bottom-4 left-2">
                      {item.name}
                    </Text>
                  </Pressable>
                )}
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 0, // Space between container edges and items
                  paddingBottom: 150, // Extra padding at the bottom of the list
                }}
              />

            </View>
          )}
        </View>
        <Text className='text-2xl'></Text>
      </SafeAreaView>
    </View>
  );
}






























// import { Image, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
