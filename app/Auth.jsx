// import React, { useEffect, useState } from 'react';
// import { View, Button, Text } from 'react-native';
// // import auth from '@react-native-firebase/auth';
// import auth from '../components/firebase.js';
// import * as Google from 'expo-auth-session/providers/google';

// export default function GoogleSignInScreen() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com',
//     androidClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com',
//     iosClientId: '<Your-iOS-Client-ID>',
//     webClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com'
//   });

//   // State to hold user information
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
  
//       // Google credential for Firebase Authentication
//       const credential = auth.GoogleAuthProvider.credential(
//         authentication.idToken,
//         authentication.accessToken
//       );
  
//       // Sign in with the credential
//       auth()
//         .signInWithCredential(credential)
//         .then((userCredential) => {
//           // User is signed in
//           const userInfo = userCredential.user;
//           setUser(userInfo); // Set user information in the state
  
//           // Log user information
//           console.log('User signed in successfully:', {
//             uid: userInfo.uid,
//             displayName: userInfo.displayName,
//             email: userInfo.email,
//             photoURL: userInfo.photoURL, // Optional: If you want to log the user's profile picture
//           });
//         })
//         .catch((error) => {
//           // Handle sign-in errors
//           console.error('Sign-in error:', error);
//           setError(error.message);
//         });
//     }
//   }, [response]);
  

//   return (
//     <View className="flex-1 justify-center items-center">
//       <Button
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => promptAsync()}
//       />

//       {/* Show user info if signed in */}
//       {user && (
//         <View style={{ marginTop: 20 }}>
//           <Text>Welcome, {user.displayName}!</Text>
//           <Text>Email: {user.email}</Text>
//         </View>
//       )}

//       {/* Show error if sign-in fails */}
//       {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import auth from '../components/firebase.js';
import * as Google from 'expo-auth-session/providers/google';

export default function GoogleSignInScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com',
    androidClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com',
    iosClientId: '<Your-iOS-Client-ID>',
    webClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com'
    // webClientId: '502673901389-8mukgs4jh4sbp8ufa8smlf44jv0th89u.apps.googleusercontent.com'

  });

  // State to hold user information
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Response:', response); // Log the entire response for debugging
    if (response?.type === 'success') {
      console.log('Successful response received'); // Log when response is successful
      const { authentication } = response;

      console.log('Authentication:', authentication); // Log authentication object

      // Google credential for Firebase Authentication
      const credential = auth.GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );

      console.log('Credential:', credential); // Log credential for debugging

      // Sign in with the credential
      auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          // User is signed in
          const userInfo = userCredential.user;
          setUser(userInfo); // Set user information in the state

          // Log user information
          console.log('User signed in successfully:', {
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email,
            photoURL: userInfo.photoURL, // Optional: If you want to log the user's profile picture
          });
        })
        .catch((error) => {
          // Handle sign-in errors
          console.error('Sign-in error:', error);
          setError(error.message);
        });
    }
  }, [response]);

  return (
    <View className="flex-1 justify-center items-center">
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          console.log('Sign in button pressed'); // Log when the button is pressed
          promptAsync();
        }}
      />

      {/* Show user info if signed in */}
      {user && (
        <View style={{ marginTop: 20 }}>
          <Text>Welcome, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}

      {/* Show error if sign-in fails */}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
    </View>
  );
}








































// import React, { useEffect, useState } from 'react';
// import { View, Button, Text } from 'react-native';
// // import auth from '@react-native-firebase/auth';
// import auth from '../components/firebase.js';
// import * as Google from 'expo-auth-session/providers/google';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// export default function GoogleSignInScreen() {
//   const navigation = useNavigation(); // Initialize navigation
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com',
//     androidClientId: '886836448144-ibc9snsb47uef7t67r2305p6oksq2hdb.apps.googleusercontent.com',
//     iosClientId: '<Your-iOS-Client-ID>',
//     webClientId: '886836448144-vh8c4mhvo5kho8h6b9nov13m50vapjqr.apps.googleusercontent.com',
//     // webClientId: '502673901389-8mukgs4jh4sbp8ufa8smlf44jv0th89u.apps.googleusercontent.com'
//   });

//   // State to hold user information and error
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log('Response', response)
//     if (response?.type === 'success') {
//       const { authentication } = response;

//       // Google credential for Firebase Authentication
//       const credential = auth.GoogleAuthProvider.credential(
//         authentication.idToken,
//         authentication.accessToken,
//     );
    
//     console.log('This is credentials',credential)
//       // Sign in with the credential
//       auth()
//         .signInWithCredential(credential)
//         .then((userCredential) => {
//           // User is signed in
//           const userInfo = userCredential.user;
//           setUser(userInfo); // Set user information in the state

//           console.log('User signed in successfully:', userInfo);

//           // Navigate to the Signer screen
//           navigation.navigate('Signer');
//         })
//         .catch((error) => {
//           // Handle sign-in errors
//           console.error('Sign-in error:', error);
//           setError(error.message);
//         });
//     }
//   }, [response]);

//   return (
//     <View className="flex-1 justify-center items-center">
//       <Button
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => {
//             console.log('Button pressed!'); // Log to confirm button press
//             promptAsync();
//           }}
//       />

//       {/* Show user info if signed in */}
//       {user && (
//         <View style={{ marginTop: 20 }}>
//           <Text>Welcome, {user.displayName}!</Text>
//           <Text>Email: {user.email}</Text>
//         </View>
//       )}

//       {/* Show error if sign-in fails */}
//       {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
//     </View>
//   );
// }





// import React, { useEffect } from 'react';
// import { View, Button, Alert } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// // import auth from '@react-native-firebase/auth';
// import auth from '../components/firebase.js';


// export default function Auth () {
//   useEffect(() => {
//     // Configure Google Sign-In
//     GoogleSignin.configure({
//       webClientId: '502673901389-8mukgs4jh4sbp8ufa8smlf44jv0th89u.apps.googleusercontent.com', // Replace with your actual webClientId
//     });
//   }, []);

//   const onGoogleButtonPress = async () => {
//     try {
//       // Check if device supports Google Play Services
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign-in the user with the credential
//       await auth().signInWithCredential(googleCredential);

//       Alert.alert('Signed in successfully!', 'Welcome to the app.');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error signing in', error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
//     </View>
//   );
// };


