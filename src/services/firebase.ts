import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: localStorage.getItem("li_firebase_api_key") || "MOCK_API_KEY",
  authDomain: "lifeinvader-en3.firebaseapp.com",
  projectId: "lifeinvader-en3",
  storageBucket: "lifeinvader-en3.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// Initialize Firebase modularly
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export default app;
