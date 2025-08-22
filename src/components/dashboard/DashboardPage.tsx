// Dosya: src/components/dashboard/DashboardPage.tsx

import React from "react";
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
  Star,
  Users,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  PenTool,
  ListChecks,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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
  star: Star,
  users: Users,
  trophy: Trophy,
  target: Target,
} as const;

const AchievementBadge: React.FC<{ a: Achievement }> = ({ a }) => {
  const Icon = a.icon ? IconMap[a.icon] ?? Trophy : Trophy;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:shadow-lg hover:shadow-purple-500/10 transition-shadow">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-transparent">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{a.title}</p>
          {a.desc && <p className="truncate text-xs text-white/60">{a.desc}</p>}
        </div>
        {a.unlocked ? (
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-300 border border-emerald-400/20">
            Unlocked
          </span>
        ) : (
          <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/70 border border-white/10">
            Locked
          </span>
        )}
      </div>

      {typeof a.progress === "number" && !a.unlocked && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-400 to-emerald-400"
              style={{ width: `${Math.round(a.progress * 100)}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
            <span>Progress</span>
            <span>{Math.round(a.progress * 100)}%</span>
          </div>
        </div>
      )}

      {typeof a.points === "number" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
          <Coins className="h-4 w-4 text-amber-300" />
          <span>+{a.points} pts</span>
        </div>
      )}
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

  const stats = {
    level: 6,
    xp: 1350,
    nextLevelXp: 2250,
    streak: 7,
    points: 2410,
    referrals: 12,
  };

  const achievements: Achievement[] = [
    {
      id: "early-adopter",
      title: "Early Adopter",
      desc: "Joined in the first wave",
      points: 50,
      unlocked: true,
      icon: "badge",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      desc: "Login 7 days in a row",
      points: 70,
      progress: 0.85,
      unlocked: false,
      icon: "flame",
    },
    {
      id: "community-helper",
      title: "Community Helper",
      desc: "Help 3 new members",
      points: 120,
      progress: 0.33,
      unlocked: false,
      icon: "message",
    },
    {
      id: "content-creator",
      title: "Content Creator",
      desc: "Publish a guide or video",
      points: 150,
      progress: 0.2,
      unlocked: false,
      icon: "pen",
    },
    {
      id: "quest-master",
      title: "Quest Master",
      desc: "Complete 5 quest types",
      points: 200,
      progress: 0.6,
      unlocked: false,
      icon: "tasks",
    },
  ];

  const activities = [
    { text: "New referral joined", time: "2h ago", pts: 100 },
    { text: "Completed social task", time: "1d ago", pts: 25 },
    { text: "Daily login bonus", time: "1d ago", pts: 10 },
    { text: "Published an educational post", time: "3d ago", pts: 60 },
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
          {[{ icon: Home, label: "Home" }, { icon: Trophy, label: "Achievements" }, { icon: Users, label: "Leaderboard" }, { icon: Settings, label: "Settings" }].map(
            (item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 text-white/80 group-hover:text-white" />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            }
          )}
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
            <Bell className="h-5 w-5" />
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
          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          </div>

          {/* Achievements + Activity */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Achievements */}
            <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Achievements</h2>
                  <p className="text-sm text-white/60">Unlock badges by completing quests</p>
                </div>
                <div className="hidden md:block">
                  <ProgressRing value={stats.xp / stats.nextLevelXp} label="To Next Level" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {achievements.map((a) => (
                  <AchievementBadge key={a.id} a={a} />
                ))}
              </div>
            </section>

            {/* Activity */}
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
              <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm hover:bg-white/10">
                View all
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
