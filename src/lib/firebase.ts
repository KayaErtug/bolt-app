// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// GEÇİCİ: ENV yerine sabit konfig (sadece teşhis için)
const firebaseConfig = {
  apiKey: "AIzaSyAY2_MdR6K7H16aSCrFuhSobF1fErGk4v4",
  authDomain: "carsamba-5714a.firebaseapp.com",
  projectId: "carsamba-5714a",
  storageBucket: "carsamba-5714a.firebasestorage.app",
  messagingSenderId: "265201760422",
  appId: "1:265201760422:web:ec9385efbc81d4d4ae1c67",
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
