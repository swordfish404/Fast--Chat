import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Debugging: Log the API Key to ensure it's set correctly
console.log("API Key: ", import.meta.env.VITE_API_KEY); // Remove this line for production use

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
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
