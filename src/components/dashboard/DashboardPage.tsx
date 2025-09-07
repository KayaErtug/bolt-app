// Dosya: src/components/dashboard/DashboardPage.tsx

import React, { useState, useEffect } from "react";
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
  ListChecks,
  Star,
  Gamepad2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

/* -------------------------------------------------------------------------- */
/*  Yardımcı: Harici kütüphane kullanmadan "x time ago" formatlayıcı          */
/* -------------------------------------------------------------------------- */
function formatTimeAgo(date: Date): string {
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - date.getTime()) / 1000));

  if (diffSec < 60) return `${diffSec}s ago`;
  const minutes = Math.floor(diffSec / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

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

const StatCard: React.FC<StatCardProps> = ({ title, value, delta, icon: Icon, gradient }) => (
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

type ProgressRingProps = { value: number; size?: number; stroke?: number; label?: string };
const ProgressRing: React.FC<ProgressRingProps> = ({ value, size = 96, stroke = 8, label }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 1);
  const offset = circumference - clamped * circumference;

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
        <p className="text-xl font-semibold text-white">{Math.round(clamped * 100)}%</p>
        {label && <p className="text-[11px] text-white/70">{label}</p>}
      </div>
    </div>
  );
};

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
  const [activities, setActivities] = useState<{ text: string; time: string; pts?: number }[]>([]);
  const [stats, setStats] = useState({
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    points: 0,
    referrals: 0,
  });

  // Firebase’den canlı verileri çek
  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "referrals"),
          where("referrerId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const acts = snapshot.docs.map((doc) => {
          const data = doc.data() as any;
          let createdDate: Date | null = null;
          const raw = data?.createdAt;

          if (raw instanceof Timestamp) {
            createdDate = raw.toDate();
          } else if (raw && typeof raw.toDate === "function") {
            createdDate = raw.toDate();
          } else if (typeof raw === "number") {
            createdDate = new Date(raw);
          }

          const time = createdDate ? formatTimeAgo(createdDate) : "just now";

          return {
            text: `Referral: ${data?.referredUserEmail ?? "unknown"}`,
            time,
            pts: 100,
          };
        });

        setActivities(acts);
        setStats((prev) => ({ ...prev, referrals: acts.length }));
      } catch (err) {
        console.error("Veri çekme hatası:", err);
      }
    };

    fetchActivities();
  }, [user]);

  const menus = [
    { icon: Home, label: "Dashboard", path: "/dashboard", isVisible: true },
    { icon: Users, label: "Referrals", path: "/referrals", isVisible: true },
    { icon: Flame, label: "Daily Check-In", path: "/daily-checkin", isVisible: true },
    { icon: Star, label: "NFT Collections", path: "/nft-showcase", isVisible: true },
    { icon: ListChecks, label: "Tasks", path: "/tasks", isVisible: false }, // gizli
    { icon: TrendingUp, label: "Leaderboard", path: "/leaderboard", isVisible: true },
    { icon: Trophy, label: "Achievements", path: "/achievements", isVisible: true },
    { icon: ShieldCheck, label: "Portfolio", path: "/portfolio", isVisible: false }, // gizli
    { icon: Settings, label: "Settings", path: "/settings", isVisible: true },
    { icon: Gamepad2, label: "Activation Zone", path: "/activation-zone", isVisible: true },
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
          {menus
            .filter((item) => item.isVisible)
            .map((item) => {
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
              {(showAllMenus ? menus.filter(m => m.isVisible) : menus.filter(m => m.isVisible).slice(0, 4)).map((item) => {
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
