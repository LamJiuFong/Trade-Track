// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2s89RwtuR5VnX2sT-OBH7Xyzl9Lqhjsg",
  authDomain: "stock-portfolio-49acf.firebaseapp.com",
  databaseURL: "https://stock-portfolio-49acf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stock-portfolio-49acf",
  storageBucket: "stock-portfolio-49acf.appspot.com",
  messagingSenderId: "886084272624",
  appId: "1:886084272624:web:a790e650e90b5561961d35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);