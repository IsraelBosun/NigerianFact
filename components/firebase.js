
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { initializeAuth, 
  // @ts-ignore
  getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn5JXU4tyLdlOSZk6-EgzCGi3lZGIIIAw",
  authDomain: "native-facts.firebaseapp.com",
  projectId: "native-facts",
  storageBucket: "native-facts.appspot.com",
  messagingSenderId: "502673901389",
  appId: "1:502673901389:web:917b0330e3ee12d4745904",
  measurementId: "G-WLHPZPGNFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// const firestore = firebase.firestore();
// export { app, analytics, firestore };











// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore} from 'firebase/firestore'
// import { getStorage } from "firebase/storage";
// import { initializeAuth, 
//   // @ts-ignore
//   getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';




// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAn5JXU4tyLdlOSZk6-EgzCGi3lZGIIIAw",
//   authDomain: "native-facts.firebaseapp.com",
//   projectId: "native-facts",
//   storageBucket: "native-facts.appspot.com",
//   messagingSenderId: "502673901389",
//   appId: "1:502673901389:web:917b0330e3ee12d4745904",
//   measurementId: "G-WLHPZPGNFZ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // initializeAuth(app, {
// //   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// // });
// // const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);


// // const firestore = firebase.firestore();
// // export { app, analytics, firestore };