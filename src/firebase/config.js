// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo5n1BDKsMp6QVimD-I3_IB9Q2gsRVA8k",
  authDomain: "visitors-muguerza.firebaseapp.com",
  projectId: "visitors-muguerza",
  storageBucket: "visitors-muguerza.appspot.com",
  messagingSenderId: "352590274934",
  appId: "1:352590274934:web:9bbf4da0fe981faedc5a57",
  measurementId: "G-KC4KBT1XZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize and export auth

export { auth }; // Make sure to export auth