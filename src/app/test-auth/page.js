"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function TestAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert("Register success: " + user.user.uid);
    } catch (err) {
      alert("Register error: " + err.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("Login success: " + user.user.uid);
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Auth Test</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={register}>Register</button>
