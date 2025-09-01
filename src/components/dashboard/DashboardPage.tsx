// Dosya: src/components/dashboard/DashboardPage.tsx

import React, { useState } from "react";
import {
  Home,
  Trophy,
  User2,
  Settings,
  LogOut,
  Bell,
  Search,
  Target,
  Coins,
  Flame,
  Users,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  PenTool,
  ListChecks,
  Star,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Yardımcı bileşenler                                                       */
/* -------------------------------------------------------------------------- */

type StatCardProps = {
  title: string;
  value: string | number;
  delta?: string;
  icon: React.ElementType;
  gradient: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, delta, icon: Icon, gradient }) => {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow">
      <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-white/70">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          {delta && <p className="mt-2 text-xs text-emerald-300">{delta}</p>}
        </div>
        <div className="rounded-xl bg-white/10 p-3 border border-white/10">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

type ProgressRingProps = { value: number; size?: number; stroke?: number; label?: string };
const ProgressRing: React.FC<ProgressRingProps> = ({ value, size = 96, stroke = 8, label }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - Math.min(Math.max(value, 0), 1) * circumference;

  return (
    <div className="relative grid place-items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-white/10"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-emerald-400 drop-shadow"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-semibold text-white">{Math.round(value * 100)}%</p>
        {label && <p className="text-[11px] text-white/70">{label}</p>}
      </div>
    </div>
  );
};

type Achievement = {
  id: string | number;
  title: string;
  desc?: string;
  points?: number;
  unlocked?: boolean;
  progress?: number;
  icon?: keyof typeof IconMap;
};

const IconMap = {
  badge: ShieldCheck,
  flame: Flame,
  message: MessageSquare,
  pen: PenTool,
  tasks: ListChecks,
  users: Users,
  trophy: Trophy,
  target: Target,
} as const;

const ActivityItem: React.FC<{ text: string; time: string; pts?: number }> = ({ text, time, pts }) => (
  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
    <div className="h-2 w-2 translate-y-2 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400/50" />
    <div className="flex-1">
      <p className="text-sm text-white">{text}</p>
      <p className="text-[11px] text-white/60">{time}</p>
    </div>
    {typeof pts === "number" && (
      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
        +{pts}
      </span>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Ana Sayfa                                                                  */
/* -------------------------------------------------------------------------- */

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAllMenus, setShowAllMenus] = useState(false);

  const stats = {
    level: 6,
    xp: 1350,
    nextLevelXp: 2250,
    streak: 7,
    points: 2410,
    referrals: 12,
  };

  const activities = [
    { text: "New referral joined", time: "2h ago", pts: 100 },
    { text: "Completed social task", time: "1d ago", pts: 25 },
    { text: "Daily login bonus", time: "1d ago", pts: 10 },
    { text: "Published an educational post", time: "3d ago", pts: 60 },
  ];

  const menus = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Referrals", path: "/referrals" },
    { icon: Flame, label: "Daily Check-In", path: "/daily-checkin" },
    { icon: Star, label: "NFT Collections", path: "/nft-showcase" },
    { icon: ListChecks, label: "Tasks", path: "/tasks" },
    { icon: TrendingUp, label: "Leaderboard", path: "/leaderboard" },
    { icon: Trophy, label: "Achievements", path: "/achievements" },
    { icon: ShieldCheck, label: "Portfolio", path: "/portfolio" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Gamepad2, label: "Activation Zone", path: "/activation-zone" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col gap-4 border-r border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-500">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">MyApp</p>
            <p className="text-[11px] text-white/70">Dashboard</p>
          </div>
        </div>

        <nav className="mt-2 grid gap-2">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2 transition ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                      : "bg-white/5 hover:bg-white/10 text-white/80"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-white/10 bg-black/30 px-4 backdrop-blur-md">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              placeholder="Search…"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-sm outline-none placeholder:text-white/50"
            />
          </div>

          <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10">
            <Bell className="h-5 w-5 text-white/70" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500">
              <User2 className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-white/70">Welcome</p>
              <p className="text-sm font-medium">{user?.displayName ?? "Explorer"}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          {/* Menüler Mobil İçin */}
          <div className="mb-6 lg:hidden">
            <div className="grid gap-2">
              {(showAllMenus ? menus : menus.slice(0, 4)).map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2 transition ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                          : "bg-white/5 hover:bg-white/10 text-white/80"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
            <button
              onClick={() => setShowAllMenus(!showAllMenus)}
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm hover:bg-white/10"
            >
              {showAllMenus ? "Collapse" : "View All"}
            </button>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md flex flex-col items-center justify-center">
              <h2 className="text-sm text-white/70">XP Progress</h2>
              <div className="mt-3">
                <ProgressRing value={stats.xp / stats.nextLevelXp} label="XP" />
              </div>
              <p className="mt-3 text-center text-white font-medium">
                {stats.xp} / {stats.nextLevelXp}
              </p>
            </div>

            <StatCard
              title="Points"
              value={stats.points.toLocaleString()}
              delta="+125 this week"
              icon={Coins}
              gradient="from-emerald-500/20 via-emerald-500/10 to-transparent"
            />

            <StatCard
              title="Streak"
              value={`${stats.streak} days`}
              delta="Keep it going!"
              icon={Flame}
              gradient="from-orange-500/20 via-orange-500/10 to-transparent"
            />

            <StatCard
              title="Referrals"
              value={stats.referrals.toLocaleString()}
              delta="+3 this month"
              icon={Users}
              gradient="from-sky-500/20 via-sky-500/10 to-transparent"
            />
          </div>

          {/* Activity */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <TrendingUp className="h-5 w-5 text-white/70" />
              </div>
              <div className="grid gap-3">
                {activities.map((it, idx) => (
                  <ActivityItem key={idx} text={it.text} time={it.time} pts={it.pts} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
