// Import the functions you need from the SDKs you need
import { getFirestore, collection} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLCKg7s2tCweSTtZ388vMs9laYYpurCEE",
  authDomain: "orbital-898f0.firebaseapp.com",
  databaseURL: "https://orbital-898f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orbital-898f0",
  storageBucket: "orbital-898f0.appspot.com",
  messagingSenderId: "431197725058",
  appId: "1:431197725058:web:ae57a81af27899f9abaf9b",
  measurementId: "G-ML1E5MRDQF"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Get the user collection 
export const userCollection = collection(getFirestore(app), 'users');