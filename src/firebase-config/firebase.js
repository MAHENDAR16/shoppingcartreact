import {getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDPOFa3y0wKRwEOw5oKQTYLzEfcupDHDUs",
  authDomain: "react-shoppingcart-11f5b.firebaseapp.com",
  databaseURL: "https://react-shoppingcart-11f5b-default-rtdb.firebaseio.com",
  projectId: "react-shoppingcart-11f5b",
  storageBucket: "react-shoppingcart-11f5b.appspot.com",
  messagingSenderId: "379534165072",
  appId: "1:379534165072:web:ab56aab86b684f81ed3d55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);