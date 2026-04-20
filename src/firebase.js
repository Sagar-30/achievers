import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjayU2y20EndwyI26lIsbw7VtWTD05MVA",
  authDomain: "achievers-records.firebaseapp.com",
  projectId: "achievers-records",
  storageBucket: "achievers-records.firebasestorage.app",
  messagingSenderId: "410378535170",
  appId: "1:410378535170:web:74fc0ee144a6ee4a1e421b",
  measurementId: "G-ZR1R6S3ZKF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);