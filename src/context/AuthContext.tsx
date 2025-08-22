// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";

// Global user type for the app
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;

  // ✅ Dashboard fields
  level?: number;
  totalPoints?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (userData: { email: string; displayName?: string }, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: { displayName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Firebase User → App User mapper
const fbUserToUser = (u: FirebaseUser | null): User | null =>
  u
    ? {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        level: 1,
        totalPoints: 0,
      }
    : null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [boot, setBoot] = useState(true);        // Initial load
  const [loading, setLoading] = useState(false); // Form actions
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUserToUser(fbUser));
      setBoot(false);
    });
    return () => unsub();
  }, []);

  const normalizeError = (e: any) => {
    const code = typeof e?.code === "string" ? e.code : "";
    if (code.includes("auth/invalid-credential")) return "Invalid email or password.";
    if (code.includes("auth/user-not-found")) return "User not found.";
    if (code.includes("auth/wrong-password")) return "Incorrect password.";
    if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
    if (code.includes("auth/weak-password")) return "Password is too weak (minimum 6 characters).";
    if (code.includes("auth/popup-closed-by-user")) return "Google sign-in window was closed.";
    if (code.includes("auth/invalid-api-key")) return "Invalid API key (check your ENV settings).";
    return "An error occurred. Please try again.";
  };

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(normalizeError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true); setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      setError(normalizeError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { email: string; displayName?: string }, password: string) => {
    setLoading(true); setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, userData.email, password);
      if (userData.displayName) {
        await updateProfile(cred.user, { displayName: userData.displayName });
      }
      // ✅ Default values for new user
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        level: 1,
        totalPoints: 0,
      });
    } catch (e) {
      setError(normalizeError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true); setError(null);
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      setError(normalizeError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: { displayName?: string }) => {
    if (!auth.currentUser) return;
    setLoading(true); setError(null);
    try {
      if (userData.displayName) {
        await updateProfile(auth.currentUser, { displayName: userData.displayName });
        setUser((prev) => prev ? { ...prev, displayName: userData.displayName } : prev);
      }
    } catch (e) {
      setError(normalizeError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    clearError,
    updateUser,
  };

  if (boot) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Loading app…
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
