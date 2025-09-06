import React from "react";
import { Trophy, Flame, Star } from "lucide-react";

type Props = {
  userName?: string | null;
  level: number;
  xp: number;           // current XP in this level
  nextLevelXp: number;  // XP required to reach next level
  streakDays: number;
  totalPoints: number;
};

const UserStatsCard: React.FC<Props> = ({
  userName = "Explorer",
  level,
  xp,
  nextLevelXp,
  streakDays,
  totalPoints,
}) => {
  const pct = Math.max(0, Math.min(100, Math.round((xp / nextLevelXp) * 100)));

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Welcome back</p>
          <h2 className="text-xl font-semibold text-white">{userName}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-semibold">Level {level}</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold">{totalPoints} pts</span>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mt-4">
        <div className="flex items-end justify-between mb-1">
          <span className="text-xs text-white/60">XP Progress</span>
          <span className="text-xs text-white/70">
            {xp}/{nextLevelXp} XP ({pct}%)
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-sm">
            <span className="font-semibold">{streakDays}-day</span> streak
          </span>
        </div>

        <button
          className="text-sm px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition"
          onClick={() => {
            // placeholder action for now
            alert("Daily check-in coming soon!");
          }}
        >
          Daily check-in
        </button>
      </div>
    </div>
  );
};

export default UserStatsCard;
