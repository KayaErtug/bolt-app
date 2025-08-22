import React from "react";
import { Link, Outlet } from "react-router-dom";
import { LogOut, Home, User, Layers, Star, Book, Gift } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 text-2xl font-bold text-emerald-400">
          Maris Coin
        </div>
        <nav className="flex-1 px-2 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Home size={18} /> Dashboard
          </Link>
          <Link
            to="/dashboard/nft-collection-showcase"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Layers size={18} /> NFT Collection
          </Link>
          <Link
            to="/dashboard/portfolio"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Star size={18} /> Portfolio
          </Link>
          <Link
            to="/dashboard/referral-system"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Gift size={18} /> Referral
          </Link>
          <Link
            to="/dashboard/tasks-quizzes"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Book size={18} /> Tasks & Quizzes
          </Link>
          <Link
            to="/dashboard/user-profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <User size={18} /> Profile
          </Link>
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 m-2 rounded-lg bg-red-600 hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Welcome, {user?.displayName || "User"}</h1>
          <span className="text-sm text-slate-400">{user?.email}</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Buraya kartlar ve sayfalar gelecek */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
