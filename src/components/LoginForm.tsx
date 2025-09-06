// LoginForm.tsx

import { useState } from "react"
import { auth, googleProvider } from "@/lib/firebase"
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useAuth } from "@/context/AuthContext"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function humanizeFirebaseError(code: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered."
    case "auth/invalid-email":
      return "Please enter a valid email."
    case "auth/weak-password":
      return "Password must be at least 6 characters."
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled in Firebase Console."
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection."
    case "auth/user-not-found":
      return "No account found with this email."
    case "auth/wrong-password":
      return "Incorrect password."
    default:
      return "Something went wrong. Please try again."
  }
}

export default function LoginForm() {
  const { user, walletAddress, setWalletAddress, logout } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  const [loadingSignUp, setLoadingSignUp] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [loadingMetaMask, setLoadingMetaMask] = useState(false)

  const loginWithGoogle = async () => {
    setError(null); setInfo(null); setLoadingGoogle(true)
    try {
      await signInWithPopup(auth, googleProvider)
      setInfo("Signed in with Google.")
    } catch (err: any) {
      setError(humanizeFirebaseError(err?.code || ""))
      console.error("Google login error:", err)
    } finally {
      setLoadingGoogle(false)
    }
  }

  const signupWithEmail = async () => {
    setError(null); setInfo(null)
    if (!email) return setError("Email is required.")
    if (!password || password.length < 6) return setError("Password must be at least 6 characters.")

    setLoadingSignUp(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setInfo("Account created successfully.")
    } catch (err: any) {
      setError(humanizeFirebaseError(err?.code || ""))
      console.error("Email signup error:", err)
    } finally {
      setLoadingSignUp(false)
    }
  }

  const loginWithEmail = async () => {
    setError(null); setInfo(null)
    if (!email) return setError("Email is required.")
    if (!password) return setError("Password is required.")

    setLoadingLogin(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setInfo("Logged in successfully.")
    } catch (err: any) {
      setError(humanizeFirebaseError(err?.code || ""))
      console.error("Email login error:", err)
    } finally {
      setLoadingLogin(false)
    }
  }

  const loginWithMetaMask = async () => {
    setError(null); setInfo(null); setLoadingMetaMask(true)
    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed.")
        return
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const account = accounts?.[0]
      if (!account) {
        setError("No account returned from MetaMask.")
        return
      }
      setWalletAddress(account)
      setInfo(`Connected with MetaMask: ${account.substring(0, 6)}...${account.slice(-4)}`)
    } catch (err) {
      console.error("MetaMask login error:", err)
      setError("MetaMask connection failed.")
    } finally {
      setLoadingMetaMask(false)
    }
  }

  const handleLogout = async () => {
    setError(null); setInfo(null); setLoadingLogout(true)
    try {
      await logout()
      setInfo("You have been logged out.")
    } catch {
      setError("Logout failed.")
    } finally {
      setLoadingLogout(false)
    }
  }

  return (
    <>
      <style>{`
        .mc-blob {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 600px;
          height: 600px;
          transform: translate(-50%, 0);
          background: radial-gradient(closest-side, rgba(0,255,255,0.18), transparent 60%);
          filter: blur(40px);
          animation: mc-float 10s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes mc-float {
          0%   { transform: translate(-50%, -5%) scale(1); }
          100% { transform: translate(-45%,  5%) scale(1.08); }
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 -z-20">
          <svg className="w-full h-full block" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="mc-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="rgba(0,255,255,0.22)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="mc-shade" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(0,0,0,0.0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="#000" />
            <rect width="100%" height="100%" fill="url(#mc-grid)">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="10 10" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect width="100%" height="100%" fill="url(#mc-shade)" />
          </svg>
        </div>

        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="mc-blob" />
        </div>

        <Card className="w-full max-w-sm shadow-2xl rounded-2xl border border-gray-700 bg-gray-900/80 backdrop-blur-md text-white">
          <CardContent className="p-8">
            {user || walletAddress ? (
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">Welcome 👾</h2>
                {user && <p className="text-gray-400">{user.displayName || user.email}</p>}
                {walletAddress && (
                  <p className="text-gray-400">Wallet: {walletAddress.substring(0, 6)}...{walletAddress.slice(-4)}</p>
                )}
                <Button
                  onClick={handleLogout}
                  disabled={loadingLogout}
                  className="w-full rounded-full bg-red-500 hover:bg-red-600 disabled:opacity-60"
                >
                  {loadingLogout ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-cyan-400 drop-shadow-lg">
                    MarisCoin
                  </h1>
                  <p className="text-sm text-gray-400">Enter the future of finance</p>
                </div>

                {error && <div className="text-sm text-red-400">{error}</div>}
                {info && !error && <div className="text-sm text-emerald-400">{info}</div>}

                {/* Google */}
                <Button
                  variant="outline"
                  onClick={loginWithGoogle}
                  disabled={loadingGoogle}
                  className="w-full rounded-full flex items-center gap-2 bg-white text-black hover:bg-gray-200 disabled:opacity-60"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  {loadingGoogle ? "Connecting..." : "Continue with Google"}
                </Button>

                {/* MetaMask */}
                <Button
                  variant="outline"
                  onClick={loginWithMetaMask}
                  disabled={loadingMetaMask}
                  className="w-full rounded-full flex items-center gap-2 bg-[#e34807] text-white hover:bg-[#c63a06] disabled:opacity-60"
                >
                  <img
                    src="/metamask.svg"
                    alt="MetaMask"
                    className="w-6 h-6"
                  />
                  {loadingMetaMask ? "Connecting..." : "Continue with MetaMask"}
                </Button>

                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-600" />
                  <span className="px-2 text-gray-500 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-600" />
                </div>

                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={signupWithEmail}
                      disabled={loadingSignUp}
                      className="flex-1 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60"
                    >
                      {loadingSignUp ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <Button
                      onClick={loginWithEmail}
                      disabled={loadingLogin}
                      className="flex-1 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
                    >
                      {loadingLogin ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
