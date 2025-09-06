"use client";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function TestFirestorePage() {
  const [data, setData] = useState(null);

  const writeData = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "tester",
        createdAt: serverTimestamp(),
      });
      alert("Data written successfully!");
    } catch (err) {
      alert("Error writing document: " + err.message);
    }
  };

  const readData = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setData(snap.data());
      } else {
        alert("No document found for this user.");
      }
    } catch (err) {
      alert("Error reading document: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Firestore Test</h1>
      <button onClick={writeData}>Write User Data</button>
      <button onClick={readData}>Read User Data</button>
      {data && (
        <div style={{ marginTop: 20 }}>
          <h2>Document Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
