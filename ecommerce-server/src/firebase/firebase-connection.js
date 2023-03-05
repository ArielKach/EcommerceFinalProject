import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC5N3VRGvDpfGiIT1lNxn7J0sp7yr13jFY",
  authDomain: "ecommercefinalproject-e37b5.firebaseapp.com",
  projectId: "ecommercefinalproject-e37b5",
  storageBucket: "ecommercefinalproject-e37b5.appspot.com",
  messagingSenderId: "803051795330",
  appId: "1:803051795330:web:031869381933036e5dd59b",
  measurementId: "G-K2E64HXJHR"
};

const firebaseConnection = initializeApp(firebaseConfig);

module.exports = {
  firebaseConnection
}