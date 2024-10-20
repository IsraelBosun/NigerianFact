// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Make sure to use the navigation prop
// import * as Notifications from 'expo-notifications';
// import messaging from '@react-native-firebase/messaging'; // Ensure you've installed and imported this correctly

// const App = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const requestUserPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log("Authorization status:", authStatus);
//         const token = await messaging().getToken();
//         console.log(token);
//         // Save token to your backend or state if needed
//       }
//     };

//     requestUserPermission();

//     // Set up the notification handler for the app
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });

//     // Handle user clicking on a notification and open the screen
//     const handleNotificationClick = async (response) => {
//       const screen = response?.notification?.request?.content?.data?.screen;
//       if (screen !== null) {
//         navigation.navigate(screen);
//       }
//     };

//     // Listen for user clicking on a notification
//     const notificationClickSubscription =
//       Notifications.addNotificationResponseReceivedListener(handleNotificationClick);

//     // Handle user opening the app from a notification (when the app is in the background)
//     messaging().onNotificationOpenedApp((remoteMessage) => {
//       console.log(
//         "Notification caused app to open from background state:",
//         remoteMessage.data.screen,
//         navigation
//       );
//       if (remoteMessage?.data?.screen) {
//         navigation.navigate(`${remoteMessage.data.screen}`);
//       }
//     });

//     // Check if the app was opened from a notification (when the app was completely quit)
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log(
//             "Notification caused app to open from quit state:",
//             remoteMessage.notification
//           );
//           if (remoteMessage?.data?.screen) {
//             navigation.navigate(`${remoteMessage.data.screen}`);
//           }
//         }
//       });

//     // Handle push notifications when the app is in the background
//     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//       console.log("Message handled in the background!", remoteMessage);
//       const notification = {
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         data: remoteMessage.data, // optional data payload
//       };

//       // Schedule the notification with a null trigger to show immediately
//       await Notifications.scheduleNotificationAsync({
//         content: notification,
//         trigger: null,
//       });
//     });

//     // Handle push notifications when the app is in the foreground
//     const handlePushNotification = async (remoteMessage) => {
//       const notification = {
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         data: remoteMessage.data, // optional data payload
//       };

//       // Schedule the notification with a null trigger to show immediately
//       await Notifications.scheduleNotificationAsync({
//         content: notification,
//         trigger: null,
//       });
//     };

//     // Listen for push notifications when the app is in the foreground
//     const unsubscribe = messaging().onMessage(handlePushNotification);

//     // Clean up the event listeners
//     return () => {
//       unsubscribe();
//       notificationClickSubscription.remove();
//     };
//   }, [navigation]); // Include navigation in the dependency array

//   return (
//     <View>
//       <Text>Hello, World!</Text>
//     </View>
//   );
// };

// export default App;


import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Make sure to use the navigation prop
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging'; // Ensure you've installed and imported this correctly

export default function App() {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is for FCM Notification</Text>
    </View>
  );
}
