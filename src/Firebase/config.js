import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAE5XbIqeJNdz6gW6pI2mYoENcpyEqTEUE",
  authDomain: "gym-admin-29c90.firebaseapp.com",
  projectId: "gym-admin-29c90",
  storageBucket: "gym-admin-29c90.appspot.com",
  messagingSenderId: "387671391938",
  appId: "1:387671391938:web:ceba77d759b79964f7c55b",
  measurementId: "G-CLFH9K767F",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
console.log("storeInitialized");
export const imgDB = getStorage(app);
console.log("imgDB initialized");
