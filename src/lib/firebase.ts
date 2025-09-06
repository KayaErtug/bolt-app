import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDjeAUeeJiCvOFP_ixdKf8e6XrLC2Eyf_w",
  authDomain: "maris-coin-app.firebaseapp.com",
  projectId: "maris-coin-app",
  storageBucket: "maris-coin-app.appspot.com",
  messagingSenderId: "117225048226",
  appId: "1:117225048226:web:d289df17af4b80f57caffb",
}

// Firebase initialize
const app = initializeApp(firebaseConfig)

// Servisler
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

// 🔹 Google ile giriş fonksiyonu
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error("Google Sign-in Error:", error)
    throw error
  }
}

// 🔹 Çıkış fonksiyonu
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Logout Error:", error)
    throw error
  }
}
