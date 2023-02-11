// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoa5upBBxcive-F_6NtuXE6AyUvev82H8",
  authDomain: "thumbdrive-fa931.firebaseapp.com",
  projectId: "thumbdrive-fa931",
  storageBucket: "thumbdrive-fa931.appspot.com",
  messagingSenderId: "953517226675",
  appId: "1:953517226675:web:b236960c7fbd0d84c24ec6",
  measurementId: "G-Y038EM84CC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getFirestore(app);

