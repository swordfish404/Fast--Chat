import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Hardcoded Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUjos0Kh52Mt6CSMzClhAtKN-_IWWDUm8", // Hardcoded API key
    authDomain: "fast-chat-a47e0.firebaseapp.com",
    projectId: "fast-chat-a47e0",
    storageBucket: "fast-chat-a47e0.appspot.com",
    messagingSenderId: "560287292738",
    appId: "1:560287292738:web:f8284aecdb30807504fcdb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Pass the app instance
export const db = getFirestore(app); // Pass the app instance
export const storage = getStorage(app); // Pass the app instance
