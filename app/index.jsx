import { NativeWindStyleSheet } from "nativewind";
// import React from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import { auth } from '../components/firebase.js'; // adjust the import based on your project structure
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const SignInScreen = () => {
//   const handleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       // Use the signInWithPopup for web and signInWithCredential for mobile
//       const result = await auth.signInWithCredential(provider); // This works for web
//       // For mobile, you may want to implement an alternative
//       console.log('User signed in:', result.user);
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to My App</Text>
//       <Button title="Sign in with Google" onPress={handleSignIn} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default SignInScreen;


NativeWindStyleSheet.setOutput({
  default: "native",
});

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
// import { data } from '../constants/Data.js';
// import Pagination from '../components/Pagination.jsx';
// import CustomButton from '../components/CustomButton.jsx';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Onboarding = () => {
//   const { width: SCREEN_WIDTH } = useWindowDimensions();
//   const flatListRef = useAnimatedRef(null);
//   const x = useSharedValue(0);
//   const flatListIndex = useSharedValue(0);
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       try {
//         const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
//         if (hasSeenOnboarding === 'true') {
//           navigation.replace('MainScreen');
//         }
//       } catch (error) {
//         console.error('Error checking onboarding status:', error);
//       } finally {
//         setLoading(false); // Always show onboarding if there's an error or the status is not 'true'
//       }
//     };
    
//     checkOnboardingStatus();
//   }, [navigation]);

//   const completeOnboarding = async () => {
//     try {
//       await AsyncStorage.setItem('hasSeenOnboarding', 'true');
//       navigation.replace('MainScreen');
//     } catch (error) {
//       console.error('Error saving onboarding status:', error);
//     }
//   };

//   const onViewableItemsChanged = ({ viewableItems }) => {
//     // Check if viewableItems array has at least one element
//     if (viewableItems.length > 0) {
//       const index = viewableItems[0].index;
//       if (typeof index === 'number') {
//         flatListIndex.value = index;
//       }
//     }
//   };

//   const onScroll = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       x.value = event.contentOffset.x;
//     },
//   });

//   const RenderItem = ({ item, index }) => {
//     const imageAnimationStyle = useAnimatedStyle(() => {
//       const opacityAnimation = interpolate(
//         x.value,
//         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
//         [0, 1, 0],
//         Extrapolation.CLAMP,
//       );
//       const translateYAnimation = interpolate(
//         x.value,
//         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
//         [100, 0, 100],
//         Extrapolation.CLAMP,
//       );
//       return {
//         opacity: opacityAnimation,
//         width: SCREEN_WIDTH * 0.8,
//         height: SCREEN_WIDTH * 0.8,
//         transform: [{ translateY: translateYAnimation }],
//       };
//     });

//     const textAnimationStyle = useAnimatedStyle(() => {
//       const opacityAnimation = interpolate(
//         x.value,
//         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
//         [0, 1, 0],
//         Extrapolation.CLAMP,
//       );
//       const translateYAnimation = interpolate(
//         x.value,
//         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
//         [100, 0, 100],
//         Extrapolation.CLAMP,
//       );
//       return {
//         opacity: opacityAnimation,
//         transform: [{ translateY: translateYAnimation }],
//       };
//     });

//     return (
//       <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
//         <Animated.Image source={item.image} style={imageAnimationStyle} />
//         <Animated.View style={textAnimationStyle}>
//           <Text style={styles.itemTitle}>{item.title}</Text>
//           <Text style={styles.itemText}>{item.text}</Text>
//         </Animated.View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         onScroll={onScroll}
//         data={data}
//         renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
//         keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a string
//         scrollEventThrottle={16}
//         horizontal
//         bounces={false}
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={{
//           minimumViewTime: 300,
//           viewAreaCoveragePercentThreshold: 10,
//         }}
//       />
//       <View style={styles.bottomContainer}>
//         <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
//         <CustomButton
//           flatListRef={flatListRef}
//           flatListIndex={flatListIndex}
//           dataLength={data.length}
//           onComplete={completeOnboarding}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Onboarding;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   itemContainer: {
//     flex: 1,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   itemTitle: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   itemText: {
//     textAlign: 'center',
//     marginHorizontal: 35,
//     color: 'black',
//     lineHeight: 20,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     paddingVertical: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });





























































import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // Make sure to use the navigation prop
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging'; // Ensure you've installed and imported this correctly


import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {data} from '../constants/Data.js';
import Pagination from '../components/Pagination.jsx';
import CustomButton from '../components/CustomButton.jsx';
import {SafeAreaView} from 'react-native-safe-area-context';


const index = () => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const flatListRef = useAnimatedRef(null);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({viewableItems}) => {
    flatListIndex.value = viewableItems[0].index;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({item, index}) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{translateY: translateYAnimation}],
      };
    });
    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );

      return {
        opacity: opacityAnimation,
        transform: [{translateY: translateYAnimation}],
      };
    });


    const navigation = useNavigation();

    useEffect(() => {
      const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          console.log("Authorization status:", authStatus);
          const token = await messaging().getToken();
          console.log(token);
          // Save token to your backend or state if needed
        } else {
          console.log('Permission not granted', authStatus);
        }
      };
  
      // Call the requestUserPermission function
      requestUserPermission();
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state',
              remoteMessage.notification
            );
          }
        });
  
      // Handle notifications when the app is opened from the background
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          'Notification caused app to open from background state',
          remoteMessage.notification
        );
      });
  
      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background', remoteMessage);
      });
  
      // Listen for messages when the app is in the foreground
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert('A new FCM Message arrived', JSON.stringify(remoteMessage));
      });
  
      // Cleanup function to unsubscribe from the listener
      return () => {
        unsubscribe(); // Unsubscribe when the component unmounts
      };
    }, []); // Run effect once when the component mounts
  
    return (
      <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <Animated.Image source={item.image} style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: 35,
    color: 'black',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});


