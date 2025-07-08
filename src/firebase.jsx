// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsMYzFz0XsK7v3WD-HbqHdzZwmIjVNuJA",
  authDomain: "nozama-c0744.firebaseapp.com",
  projectId: "nozama-c0744",
  storageBucket: "nozama-c0744.firebasestorage.app",
  messagingSenderId: "1010910187222",
  appId: "1:1010910187222:web:83f0e9106990031aec4377",
  measurementId: "G-DCDD2M31W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);