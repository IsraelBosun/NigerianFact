
// import React from 'react';
// import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Share, Alert, StyleSheet  } from 'react-native'; 
// import { useRouter } from 'expo-router';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import * as FileSystem from 'expo-file-system'; // Import FileSystem for downloading images
// import { Modal, Portal, Card } from 'react-native-paper';
// import { ExternalLink } from '../components/ExternalLink'; // Import the ExternalLink component
// import { useTheme } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar'; // Import StatusBar
// import { color } from 'react-native-elements/dist/helpers';


// export default function CategoryFacts() {
//   const router = useRouter();
//   const { params: item } = useRoute();
//   const facts = item.facts;
//   const image = item.image;
//   const categoryName = item.categoryName;

//   const navigation = useNavigation();
//   const { colors } = useTheme();


//   // State to control the modal visibility and store selected fact links
//   const [visible, setVisible] = React.useState(false);
//   const [selectedLinks, setSelectedLinks] = React.useState({ link1: null, link2: null });

//   const showModal = (links) => {
//     setSelectedLinks(links); // Store the selected fact's links
//     setVisible(true); // Show the modal
//   };
//   const hideModal = () => setVisible(false);

//   // Function to handle sharing the fact (image and text)
//   const handleShare = async (factItem) => {
//     try {
//       // First download the image to a local file
//       const downloadResumable = FileSystem.createDownloadResumable(
//         factItem.image, // Firebase image URL
//         FileSystem.cacheDirectory + 'shared-image.jpg' // Local path to save the image
//       );

//       const { uri } = await downloadResumable.downloadAsync();

//       // Check if image download was successful
//       if (uri) {
//         // Share the image and the text (shortDescription and title)
//         await Share.share({
//           title: factItem.title,
//           message: `${factItem.title}\n\n${factItem.shortDescription}`, // Share the description
//           url: uri, // Use the downloaded image's local URI
//         });
//       } else {
//         Alert.alert('Error', 'Failed to download image for sharing');
//       }
//     } catch (error) {
//       console.error('Error sharing:', error);
//       Alert.alert('Error', 'Failed to share content');
//     }
//   };

//   // Animated value to track the scroll position
//   const scrollY = new Animated.Value(0);

//   // Interpolating the scroll value to animate image height
//   const imageHeight = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: [200, 115], // Image height changes from 200 to 115 as you scroll
//     outputRange: [200, 115], // Image height changes from 200 to 115 as you scroll
//     extrapolate: 'clamp',
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//       <View className = 'bg-neutral-700'>
//         {/* Animated Image Container */}
//         <Animated.View style={{ height: imageHeight, overflow: 'hidden' }}>
//           <Image
//             source={image} // Use the passed local image
//             style={{ width: '100%', height: '100%' }}
//             resizeMode="cover"
//           />
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             className="absolute top-7 mx-4 bg-green-700 w-10 h-10 rounded-full flex items-center justify-center"
//           >
//             <Ionicons name="arrow-back-outline" size={24} color="white" />
//           </TouchableOpacity>
//           <Text className="absolute text-white bottom-6 text-xl font-bold mx-4">
//             {categoryName}
//           </Text>
//         </Animated.View>
//       </View>

//       <Animated.ScrollView
//         contentContainerStyle={{ paddingTop: 1, paddingBottom: 350 }}
//         contentContainerStyle={{ paddingTop: 1, paddingBottom: 350 }}
//         showsVerticalScrollIndicator={false}
//         className="mt-5 h-[700px]"
//         className="mt-5 h-[700px]"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       >
//         {facts.map((factItem, id) => (
//           <View key={id} className=''>
//             <View 
//                   style={{
//                     backgroundColor: colors.primary,
//                     borderRadius: 16, // Equivalent to 'rounded-2xl'
//                     marginBottom: 16, // Equivalent to 'mb-4'
//                     marginHorizontal: 16, // Equivalent to 'mx-4'
//                     shadowColor: colors.shadow, // Shadow color for iOS
//                     shadowOffset: {
//                       width: 0, // Horizontal offset
//                       height: 2, // Vertical offset
//                     },
//                     shadowOpacity: 0.25, // Shadow opacity
//                     shadowRadius: 3.5, // Shadow blur radius
//                     elevation: 4, // Elevation for Android
//                   }}
//             className=" rounded-2xl mb-4 mx-4 shadow-2xl">
//               {factItem.image && (
//                 <Image
//                   source={{ uri: factItem.image }}
//                   source={{ uri: factItem.image }}
//                   className="w-full h-48 rounded-2xl mb-4"
//                 />
//               )}
//               <View className="px-4">
//                 <View className="flex-row items-center justify-between">
//                   <Text style={{ color: colors.text }}  className="text-lg font-bold mb-2">{factItem.title}</Text>
//                   <View className="flex-row items-center justify-center gap-4">
//                     <TouchableOpacity>
//                       <AntDesign name="hearto" size={24} color="red" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => showModal({ link1: factItem.link1, link2: factItem.link2 })} // Pass the selected fact's links to the modal
//                     >
//                     <TouchableOpacity
//                       onPress={() => showModal({ link1: factItem.link1, link2: factItem.link2 })} // Pass the selected fact's links to the modal
//                     >
//                       <AntDesign name="exclamationcircle" size={24} color="red" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <Text style={{ color: colors.text }} className="leading-5 text-[16px] mb-2">
//                   {factItem.shortDescription}
//                 </Text>
//                 <View className="flex-row gap-2 pb-5">
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('FactDetails', factItem)}
//                     onPress={() => navigation.navigate('FactDetails', factItem)}
//                     className="bg-green-700 px-6 py-2 rounded-2xl"
//                   >
//                     <Text style={{ color: colors.text }} className="text-xs">Read More</Text>
//                   </TouchableOpacity>
//                   {/* Share Button */}
//                   <TouchableOpacity
//                     style={{ borderColor: colors.text }}
//                     onPress={() => handleShare(factItem)} // Trigger share functionality
//                     className="border px-7 py-2 rounded-2xl"
//                   >
//                     <Text style={{ color: colors.text }} className="text-black text-xs">Share</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </Animated.ScrollView>

//       {/* Modal for Exclamation Icon */}
//       <Portal>
//         <Modal
//           visible={visible}
//           onDismiss={hideModal}
//           contentContainerStyle={{
//             backgroundColor: 'white',
//             paddingVertical: 20,
//             paddingHorizontal: 30,
//             borderRadius: 20, // Add rounded corners
//             alignItems: 'center', // Center horizontally
//             justifyContent: 'center', // Center vertically
//             marginHorizontal: 30, // Optional: to make sure the modal isn't too wide
//           }}
//         >
//           <Text className='font-semibold'>External Links</Text>
//           {/* External Links */}
//           <View style={{ marginTop: 20 }}>
//             {selectedLinks.link1 ? (
//               <ExternalLink href={selectedLinks.link1} style={{ marginBottom: 10 }}>
//                 <Text style={{ color: 'blue' }}>{selectedLinks.link1}</Text>
//               </ExternalLink>
//             ) : (
//               <Text>No Link 1 Available</Text>
//             )}
//             {selectedLinks.link2 ? (
//               <ExternalLink href={selectedLinks.link2}>
//                 <Text style={{ color: 'blue' }}>{selectedLinks.link2}</Text>
//               </ExternalLink>
//             ) : (
//               <Text>No Link 2 Available</Text>
//             )}
//           </View>
//           <TouchableOpacity onPress={hideModal} style={{ marginTop: 20 }}>
//             <Text className='font-bold' style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
//           </TouchableOpacity>
//         </Modal>
//       </Portal>

//       {/* Modal for Exclamation Icon */}
//       <Portal>
//         <Modal
//           visible={visible}
//           onDismiss={hideModal}
//           contentContainerStyle={{
//             backgroundColor: 'white',
//             paddingVertical: 20,
//             paddingHorizontal: 30,
//             borderRadius: 20, // Add rounded corners
//             alignItems: 'center', // Center horizontally
//             justifyContent: 'center', // Center vertically
//             marginHorizontal: 30, // Optional: to make sure the modal isn't too wide
//           }}
//         >
//           <Text className='font-semibold'>External Links</Text>
//           {/* External Links */}
//           <View style={{ marginTop: 20 }}>
//             {selectedLinks.link1 ? (
//               <ExternalLink href={selectedLinks.link1} style={{ marginBottom: 10 }}>
//                 <Text style={{ color: 'blue' }}>{selectedLinks.link1}</Text>
//               </ExternalLink>
//             ) : (
//               <Text>No Link 1 Available</Text>
//             )}
//             {selectedLinks.link2 ? (
//               <ExternalLink href={selectedLinks.link2}>
//                 <Text style={{ color: 'blue' }}>{selectedLinks.link2}</Text>
//               </ExternalLink>
//             ) : (
//               <Text>No Link 2 Available</Text>
//             )}
//           </View>
//           <TouchableOpacity onPress={hideModal} style={{ marginTop: 20 }}>
//             <Text className='font-bold' style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
//           </TouchableOpacity>
//         </Modal>
//       </Portal>
//     </SafeAreaView>
//   );
// }


import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system'; // Import FileSystem for downloading images
import { Modal, Portal } from 'react-native-paper';
import { ExternalLink } from '../components/ExternalLink'; // Import the ExternalLink component
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'; // Import StatusBar

export default function CategoryFacts() {
  const router = useRouter();
  const { params: item } = useRoute();
  const facts = item.facts;
  const image = item.image;
  const categoryName = item.categoryName;

  const navigation = useNavigation();
  const { colors } = useTheme();

  // State to control the modal visibility and store selected fact links
  const [visible, setVisible] = React.useState(false);
  const [selectedLinks, setSelectedLinks] = React.useState({ link1: null, link2: null });

  const showModal = (links) => {
    setSelectedLinks(links); // Store the selected fact's links
    setVisible(true); // Show the modal
  };

  const hideModal = () => setVisible(false);

  // Function to handle sharing the fact (image and text)
  const handleShare = async (factItem) => {
    try {
      // First download the image to a local file
      const downloadResumable = FileSystem.createDownloadResumable(
        factItem.image, // Firebase image URL
        FileSystem.cacheDirectory + 'shared-image.jpg' // Local path to save the image
      );

      const { uri } = await downloadResumable.downloadAsync();

      // Check if image download was successful
      if (uri) {
        // Share the image and the text (shortDescription and title)
        await Share.share({
          title: factItem.title,
          message: `${factItem.title}\n\n${factItem.shortDescription}`, // Share the description
          url: uri, // Use the downloaded image's local URI
        });
      } else {
        Alert.alert('Error', 'Failed to download image for sharing');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share content');
    }
  };

  // Animated value to track the scroll position
  const scrollY = new Animated.Value(0);

  // Interpolating the scroll value to animate image height
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 115], // Image height changes from 200 to 115 as you scroll
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className='bg-neutral-700'>
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
        contentContainerStyle={{ paddingTop: 1, paddingBottom: 350 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {facts.map((factItem, id) => (
          <View key={id}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16, // Equivalent to 'rounded-2xl'
                marginBottom: 16, // Equivalent to 'mb-4'
                marginHorizontal: 16, // Equivalent to 'mx-4'
                shadowColor: colors.shadow, // Shadow color for iOS
                shadowOffset: {
                  width: 0, // Horizontal offset
                  height: 2, // Vertical offset
                },
                shadowOpacity: 0.25, // Shadow opacity
                shadowRadius: 3.5, // Shadow blur radius
                elevation: 4, // Elevation for Android
              }}
              className="rounded-2xl mb-4 mx-4 shadow-2xl"
            >
              {factItem.image && (
                <Image
                  source={{ uri: factItem.image }} // Ensure this is correct
                  className="w-full h-48 rounded-2xl mb-4"
                />
              )}
              <View className="px-4">
                <View className="flex-row items-center justify-between">
                  <Text style={{ color: colors.text }} className="text-lg font-bold mb-2">
                    {factItem.title}
                  </Text>
                  <View className="flex-row items-center justify-center gap-4">
                    <TouchableOpacity>
                      <AntDesign name="hearto" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => showModal({ link1: factItem.link1, link2: factItem.link2 })} // Pass the selected fact's links to the modal
                    >
                      <AntDesign name="exclamationcircle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ color: colors.text }} className="leading-5 text-[16px] mb-2">
                  {factItem.shortDescription}
                </Text>
                <View className="flex-row gap-2 pb-5">
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FactDetails', factItem)}
                    className="bg-green-700 px-6 py-2 rounded-2xl"
                  >
                    <Text style={{ color: colors.text }} className="text-xs">Read More</Text>
                  </TouchableOpacity>
                  {/* Share Button */}
                  <TouchableOpacity
                    style={{ borderColor: colors.text }}
                    onPress={() => handleShare(factItem)} // Trigger share functionality
                    className="border px-7 py-2 rounded-2xl"
                  >
                    <Text style={{ color: colors.text }} className="text-black text-xs">Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Modal for External Links */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 20, // Add rounded corners
            alignItems: 'center', // Center horizontally
            justifyContent: 'center', // Center vertically
            marginHorizontal: 30, // Optional: to make sure the modal isn't too wide
          }}
        >
          <Text className='font-semibold'>External Links</Text>
          {/* External Links */}
          <View style={{ marginTop: 20 }}>
            {selectedLinks.link1 ? (
              <ExternalLink href={selectedLinks.link1} style={{ marginBottom: 10 }}>
                <Text style={{ color: 'blue' }}>{selectedLinks.link1}</Text>
              </ExternalLink>
            ) : (
              <Text>No Link 1 Available</Text>
            )}
            {selectedLinks.link2 ? (
              <ExternalLink href={selectedLinks.link2}>
                <Text style={{ color: 'blue' }}>{selectedLinks.link2}</Text>
              </ExternalLink>
            ) : (
              <Text>No Link 2 Available</Text>
            )}
          </View>
          <TouchableOpacity onPress={hideModal} style={{ marginTop: 20 }}>
            <Text className='font-bold' style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
