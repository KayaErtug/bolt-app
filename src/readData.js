// ES Module import
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjeAUeeJiCvOFP_ixdKf8e6XrLC2Eyf_w",
  authDomain: "maris-coin-app.firebaseapp.com",
  projectId: "maris-coin-app",
  storageBucket: "maris-coin-app.firebasestorage.app",
  messagingSenderId: "117225048226",
  appId: "1:117225048226:web:d289df17af4b80f57caffb"
};

// 🔹 Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function readData() {
  try {
    // USERS
    const usersSnap = await getDocs(collection(db, "users"));
    console.log("=== USERS ===");
    usersSnap.forEach(doc => console.log(doc.id, "=>", doc.data()));

    // CHECKINS
    const checkinsSnap = await getDocs(collection(db, "checkins"));
    console.log("=== CHECKINS ===");
    checkinsSnap.forEach(doc => console.log(doc.id, "=>", doc.data()));

    // REFERRALS
    const referralsSnap = await getDocs(collection(db, "referrals"));
    console.log("=== REFERRALS ===");
    referralsSnap.forEach(doc => console.log(doc.id, "=>", doc.data()));

    // INVITES
    const invitesSnap = await getDocs(collection(db, "invites"));
    console.log("=== INVITES ===");
    invitesSnap.forEach(doc => console.log(doc.id, "=>", doc.data()));

    // PRE-ORDERS
    const preOrdersSnap = await getDocs(collection(db, "pre-orders"));
    console.log("=== PRE-ORDERS ===");
    preOrdersSnap.forEach(doc => console.log(doc.id, "=>", doc.data()));

    console.log("✅ Tüm veriler Firestore’dan başarıyla okundu!");
  } catch (e) {
    console.error("❌ Veri okuma sırasında hata:", e);
  }
}

// Scripti çalıştır
readData();
