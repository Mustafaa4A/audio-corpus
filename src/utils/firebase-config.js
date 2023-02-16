import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";
import { getStorage} from 'firebase/storage';

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

export const storage = getStorage(app);


//creating user from email and password
export const SignUpUser = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};


//signin with email and password
export const signInUser = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//creating user from auth provider
export const saveUser = async (userAuth, otherData) => {
  const userDoc = await doc(db, "users", userAuth.uid);

  const userElement = await getDoc(userDoc);

  if (!userElement.exists()) {
    //
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        ...otherData,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDoc;
};

// genUser
export const getUser = async (userAuth) => {
  const userDoc = await doc(db, "users", userAuth.uid);
  const user = await getDoc(userDoc);

  return user.data();
}
