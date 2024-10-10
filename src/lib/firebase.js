import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "fast-chat-a47e0.firebaseapp.com",
    projectId: "fast-chat-a47e0",
    storageBucket: "fast-chat-a47e0.appspot.com",
    messagingSenderId: "560287292738",
    appId: "1:560287292738:web:f8284aecdb30807504fcdb"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()