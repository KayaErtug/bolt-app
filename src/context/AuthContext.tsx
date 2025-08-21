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

// Kullanıcı tipi
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
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

const fbUserToUser = (u: FirebaseUser | null): User | null =>
  u ? { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL } : null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [boot, setBoot] = useState(true);
  const [loading, setLoading] = useState(false);
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
    if (code.includes("auth/invalid-credential")) return "E-posta veya şifre hatalı.";
    if (code.includes("auth/user-not-found")) return "Kullanıcı bulunamadı.";
    if (code.includes("auth/wrong-password")) return "Şifre hatalı.";
    if (code.includes("auth/email-already-in-use")) return "Bu e-posta zaten kayıtlı.";
    if (code.includes("auth/weak-password")) return "Şifre çok zayıf (en az 6 karakter).";
    if (code.includes("auth/popup-closed-by-user")) return "Google penceresi kapatıldı.";
    if (code.includes("auth/invalid-api-key")) return "API anahtarı geçersiz (ENV ayarlarını kontrol edin).";
    return "Bir hata oluştu. Lütfen tekrar deneyin.";
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
        Uygulama yükleniyor…
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
