// Dosya: src/components/dashboard/ActivationZonePage.tsx

import React from "react";
import { Gamepad2, Award, Trophy, Brain, Dice5, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivationZonePage: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Spin the Wheel",
      desc: "Spin daily and earn rewards.",
      icon: Dice5,
      path: "/activation-zone/spin-wheel",
      color: "from-pink-500/30 to-purple-500/10",
    },
    {
      title: "Memory Challenge",
      desc: "Match robot cards and unlock extra spins.",
      icon: Brain,
      path: "/activation-zone/memory-game",
      color: "from-emerald-500/30 to-teal-500/10",
    },
    {
      title: "Trivia Quiz",
      desc: "Test your knowledge of robotics and earn points.",
      icon: Trophy,
      path: "/activation-zone/trivia-quiz",
      color: "from-indigo-500/30 to-cyan-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-emerald-400" />
          The Activation Zone
        </h1>
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
        >
          <Home className="h-5 w-5" />
          Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Top Section */}
        <section className="grid gap-6 md:grid-cols-3">
          {games.map((game, idx) => {
            const Icon = game.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(game.path)}
                className={`cursor-pointer relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg hover:shadow-2xl transition hover:scale-[1.02] overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${game.color}`}
                />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/10">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-lg font-semibold">{game.title}</h2>
                  </div>
                  <p className="text-sm text-white/70">{game.desc}</p>
                  <button className="mt-auto rounded-xl bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30 transition">
                    Play Now
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Activity & Leaderboard */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              Recent Activity
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                <span>John earned 100 pts from Spin Wheel</span>
                <span className="text-emerald-400">+100</span>
              </li>
              <li className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                <span>Alice completed Memory Challenge</span>
                <span className="text-emerald-400">+1 Extra Spin</span>
              </li>
              <li className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                <span>Mike scored 8/10 in Trivia Quiz</span>
                <span className="text-emerald-400">+200</span>
              </li>
            </ul>
          </div>

          {/* Leaderboard */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-300" />
              Leaderboard
            </h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-center justify-between bg-gradient-to-r from-yellow-500/20 to-transparent rounded-xl px-4 py-2">
                <span>🥇 Sarah</span>
                <span className="font-medium">3200 pts</span>
              </li>
              <li className="flex items-center justify-between bg-gradient-to-r from-gray-400/20 to-transparent rounded-xl px-4 py-2">
                <span>🥈 James</span>
                <span className="font-medium">2950 pts</span>
              </li>
              <li className="flex items-center justify-between bg-gradient-to-r from-amber-600/20 to-transparent rounded-xl px-4 py-2">
                <span>🥉 Emma</span>
                <span className="font-medium">2700 pts</span>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ActivationZonePage;
