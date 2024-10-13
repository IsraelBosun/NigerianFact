import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { DarkTheme as DefaultDarkTheme, DefaultTheme as DefaultLightTheme } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar'; // Import StatusBar




const CustomDarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#000000',
    background: '#121212',
    text: '#ffffff',
    shadow: 'white'
  },
};

const CustomLightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#16a34a',
    background: '#ffffff',
    text: '#ffffff',
    shadow: 'black'
  },
};
// #e5e5e5
// const CustomDarkTheme = {
//   ...DefaultDarkTheme,
//   colors: {
//     ...DefaultDarkTheme.colors,
//     primary: '#bb86fc',
//     background: '#121212',
//     text: '#ffffff',
//   },
// };

// const CustomLightTheme = {
//   ...DefaultLightTheme,
//   colors: {
//     ...DefaultLightTheme.colors,
//     primary: '#16a34a',
//     background: '#e5e5e5',
//     text: '#000000',
//   },
// };



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

  const theme = colorScheme === 'light' ? CustomLightTheme : CustomDarkTheme;


  return (
    <ThemeProvider value={theme}>
      <PaperProvider>
      <StatusBar  style = {colorScheme === 'dark' ? 'light' : 'dark'}   />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index"  />
      </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}

//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Provider as PaperProvider } from 'react-native-paper';


// // Set up Google Sign-In configuration
// GoogleSignin.configure({
//   webClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com', // Replace with the webClientId from google-services.json
// });


// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <PaperProvider>
//       <Stack screenOptions={{headerShown: false}}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//         <Stack.Screen name="index"  />
//       </Stack>
//       </PaperProvider>
//     </ThemeProvider>
//   );
// }
