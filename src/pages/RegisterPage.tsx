import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Chrome, User as UserIcon, Mail, Lock, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { register, loginWithGoogle, loading, error, clearError } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, displayName }, password);
      navigate("/dashboard");
    } catch {}
  };

  const onGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
              <span className="text-xl font-bold">M</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">Join Maris Coin</h1>
            <p className="mt-1 text-sm text-white/60">
              Secure registration, ready in seconds. You will be redirected to your dashboard.
            </p>
          </div>

          {error && (
            <div className="mx-6 mb-2 rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
              {error}{" "}
              <button className="underline ml-2" onClick={clearError}>
                Close
              </button>
            </div>
          )}

          <div className="px-6">
            <button
              onClick={onGoogle}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition px-4 py-2.5 text-white"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Chrome className="size-4" />}
              <span>{loading ? "Connecting..." : "Continue with Google"}</span>
            </button>
          </div>

          <div className="px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <div className="text-xs text-white/50">or with email</div>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          <form onSubmit={onSubmit} className="px-6 pb-6 space-y-3">
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                className="w-full rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/40"
                placeholder="Name (optional)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                className="w-full rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/40"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                className="w-full rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/40"
                placeholder="Password (min 6 characters)"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              <span>{loading ? "Creating account..." : "Create Account"}</span>
            </button>

            <p className="text-[11px] text-white/40 text-center">
              By registering, you agree to the terms. You can always log out anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
