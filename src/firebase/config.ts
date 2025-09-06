// src/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyDjeAUeeJiCvOFP_ixdKf8e6XrLC2Eyf_w",
  authDomain: "maris-coin-app.firebaseapp.com",
  projectId: "maris-coin-app",
  storageBucket: "maris-coin-app.firebasestorage.app",
  messagingSenderId: "117225048226",
  appId: "1:117225048226:web:d289df17af4b80f57caffb"
};

// Tekrar initialize etmesini önlemek için kontrol
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth & Firestore instance
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
