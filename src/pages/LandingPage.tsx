import React from "react";
import logo from "../assets/logo_maris_coin.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center px-6">
      <img
        src={logo}
        alt="Maris Coin Logo"
        className="w-24 h-24 mb-6 animate-pulse"
      />
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
        Maris Coin Platform
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Please sign in or create an account to continue your journey.
      </p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-semibold shadow-md transition"
        >
          Sign In
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold shadow-md transition"
        >
          Register
        </a>
      </div>
    </div>
  );
}
