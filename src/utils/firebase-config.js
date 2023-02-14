import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHFncfeAZ8NAIFYed0ENujDjyCgnireGo",
  authDomain: "somali-audio-74cb9.firebaseapp.com",
  projectId: "somali-audio-74cb9",
  storageBucket: "somali-audio-74cb9.appspot.com",
  messagingSenderId: "53250132154",
  appId: "1:53250132154:web:968b18de7393e012f71a83",
  measurementId: "G-0MR5Y4PYRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore();
