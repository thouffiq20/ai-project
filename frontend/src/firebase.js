// src/firebase.ts
console.log("FIREBASE FILE EXECUTED");
console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("ENV:", import.meta.env);
// Guard: Only initialize if a valid-looking API key is provided.
const isInvalidKey = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("your_firebase_api_key");

let app;
let auth;
const googleProvider = new GoogleAuthProvider();

if (!isInvalidKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  console.warn("⚠️ Firebase API Key is missing or invalid. Authentication features will be disabled. Please update your .env file.");
  // Provide a dummy auth object to prevent the app from crashing on import
  app = null;
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => { }, // No-op unsubscription
    signOut: async () => { },
  };
}

export { app, auth, googleProvider, signInWithPopup };
