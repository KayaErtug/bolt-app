import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
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

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
