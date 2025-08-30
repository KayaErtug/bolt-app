import { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User 
} from "firebase/auth";

export default function AuthTest() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  // Email signup
  const signupWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      console.error("Email signup error:", err);
    }
  };

  // Email login
  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      console.error("Email login error:", err);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <div>
          <p>Signed in as: {user.displayName || user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={loginWithGoogle}>Login with Google</button>
          <div style={{ marginTop: "20px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signupWithEmail}>Sign Up with Email</button>
            <button onClick={loginWithEmail}>Login with Email</button>
          </div>
        </div>
      )}
    </div>
  );
}
