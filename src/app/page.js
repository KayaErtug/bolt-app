"use client";
import { useState } from "react";
import { auth } from "../lib/firebase"; // senin firebase.js dosyana göre yolu güncelle
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

export default function AuthTest() {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e) {
      console.error("Google login error:", e);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e) {
      console.error("Facebook login error:", e);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <div>
          <p>Signed in as {user.displayName || user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          <button onClick={loginWithGoogle}>Login with Google</button>
          <button onClick={loginWithFacebook}>Login with Facebook</button>
        </>
      )}
    </div>
  );
}
