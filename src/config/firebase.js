// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA70Qj9bVA417RRRxGpEudVTz5m2jH7Bu0",
  authDomain: "contact-app-c2891.firebaseapp.com",
  projectId: "contact-app-c2891",
  storageBucket: "contact-app-c2891.firebasestorage.app",
  messagingSenderId: "789144862808",
  appId: "1:789144862808:web:9e15355abc7135a6ddca2d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)