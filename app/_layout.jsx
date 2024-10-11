import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider as PaperProvider } from 'react-native-paper';


// Set up Google Sign-In configuration
GoogleSignin.configure({
  webClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com', // Replace with the webClientId from google-services.json
});


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index"  />
      </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}













// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Button } from 'react-native'; // Import Button for Google Sign-In

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     // Set up Google Sign-In configuration
//     GoogleSignin.configure({
//       webClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com', // Replace with the webClientId from google-services.json
//     });

//     // Hide the splash screen when the fonts are loaded
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   const onGoogleButtonPress = async () => {
//     try {
//       // Check if the device supports Google Play services
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign in the user with the credential
//       await auth().signInWithCredential(googleCredential);
//       console.log('Signed in with Google!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//         <Stack.Screen name="index" />
//       </Stack>

//       {/* Add Google Sign-In button here */}
//       <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
//     </ThemeProvider>
//   );
// }






// import React, { useEffect } from 'react';
// import { Button, Platform } from 'react-native';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import * as WebBrowser from 'expo-web-browser';
// import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
// import { auth } from '@react-native-firebase/auth';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// WebBrowser.maybeCompleteAuthSession();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   // Use Google Auth Request
//   const [request, response, promptAsync] = useIdTokenAuthRequest({
//     clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your web client ID
//   });

//   useEffect(() => {
//     // Set up Google Sign-In configuration for mobile platforms
//     if (Platform.OS !== 'web') {
//       GoogleSignin.configure({
//         webClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com', // Replace with the webClientId from google-services.json
//       });
//     }


// // 886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com
// // Android

//     if (loaded) {
//       SplashScreen.hideAsync();
//     }

//     // Handle the response from Google Sign-In
//     if (response?.type === 'success') {
//       const { id_token } = response.params;

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(id_token);

//       // Sign in the user with the credential
//       auth().signInWithCredential(googleCredential).then(() => {
//         console.log('Signed in with Google!');
//       }).catch(error => {
//         console.error(error);
//       });
//     }
//   }, [loaded, response]);

//   const onGoogleButtonPress = async () => {
//     if (Platform.OS === 'web') {
//       await promptAsync();
//     } else {
//       // Mobile sign-in logic
//       try {
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//         const { idToken } = await GoogleSignin.signIn();
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//         await auth().signInWithCredential(googleCredential);
//         console.log('Signed in with Google!');
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//         <Stack.Screen name="index" />
//       </Stack>

//       {/* Add Google Sign-In button here */}
//       <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
//     </ThemeProvider>
//   );
// }
