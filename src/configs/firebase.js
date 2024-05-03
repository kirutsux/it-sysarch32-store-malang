import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdQU2sKIUFxfuOS3bL0YVVWRTJBqzR33k",
  authDomain: "it-sysarch32-store-malang.firebaseapp.com",
  projectId: "it-sysarch32-store-malang",
  storageBucket: "it-sysarch32-store-malang.appspot.com",
  messagingSenderId: "1022989247664",
  appId: "1:1022989247664:web:ad2b27b7b1c67306e90775",
  measurementId: "G-JB0H9WSZNV"
};

const app = initializeApp(firebaseConfig);


export const firestore = getFirestore(app);