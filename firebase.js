
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARB9Hq85_N69Mmuz_OceRwNs-ILKlrcXk",
  authDomain: "pantry-92f23.firebaseapp.com",
  projectId: "pantry-92f23",
  storageBucket: "pantry-92f23.appspot.com",
  messagingSenderId: "53020062269",
  appId: "1:53020062269:web:7ca97b3d3783d6a51db054",
  measurementId: "G-9C7YKQRNBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}