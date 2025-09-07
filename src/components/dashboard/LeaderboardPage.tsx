// Dosya: src/components/dashboard/LeaderboardPage.tsx

import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  TrendingUp, 
  Users,
  Coins,
  Award,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  surname: string;
  points: number;
  level: number;
  referrals: number;
  tasksCompleted: number;
  joinDate: string;
  trend: 'up' | 'down' | 'same';
  rankChange?: number;
}

const LeaderboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [category, setCategory] = useState<'points' | 'referrals' | 'tasks'>('points');

  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', rank: 1, name: 'Sarah', surname: 'Johnson', points: 15420, level: 8, referrals: 45, tasksCompleted: 127, joinDate: '2024-01-05', trend: 'same' },
    { id: '2', rank: 2, name: 'Michael', surname: 'Chen', points: 14850, level: 7, referrals: 38, tasksCompleted: 134, joinDate: '2024-01-08', trend: 'up', rankChange: 1 },
    { id: '3', rank: 3, name: 'Emma', surname: 'Rodriguez', points: 13990, level: 7, referrals: 52, tasksCompleted: 98, joinDate: '2024-01-10', trend: 'down', rankChange: -1 },
    { id: '4', rank: 4, name: 'James', surname: 'Wilson', points: 12750, level: 6, referrals: 29, tasksCompleted: 156, joinDate: '2024-01-12', trend: 'up', rankChange: 2 },
    { id: '5', rank: 5, name: 'Lisa', surname: 'Anderson', points: 11880, level: 6, referrals: 41, tasksCompleted: 89, joinDate: '2024-01-15', trend: 'same' },
    { id: '6', rank: 6, name: 'David', surname: 'Thompson', points: 10940, level: 5, referrals: 23, tasksCompleted: 145, joinDate: '2024-01-18', trend: 'up', rankChange: 3 },
    { id: '7', rank: 7, name: 'Anna', surname: 'Martinez', points: 9850, level: 5, referrals: 36, tasksCompleted: 112, joinDate: '2024-01-20', trend: 'down', rankChange: -2 },
    { id: '8', rank: 8, name: 'Kevin', surname: 'Brown', points: 8920, level: 4, referrals: 18, tasksCompleted: 187, joinDate: '2024-01-22', trend: 'same' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-500" />;
      default: return <span className="text-white/60 font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-400 to-gray-600';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    if (rank <= 10) return 'from-emerald-500 to-sky-500';
    return 'from-gray-600 to-gray-700';
  };

  const getTrendIcon = (trend: string, rankChange?: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-emerald-400">
          <TrendingUp className="w-4 h-4 mr-1" />
          {rankChange && <span className="text-xs">+{rankChange}</span>}
        </div>
      );
    }
    if (trend === 'down') {
      return (
        <div className="flex items-center text-red-400 rotate-180">
          <TrendingUp className="w-4 h-4 mr-1" />
          {rankChange && <span className="text-xs rotate-180">{rankChange}</span>}
        </div>
      );
    }
    return <div className="w-4 h-4 bg-white/20 rounded-full" />;
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            Leaderboard
          </h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Users</p>
                  <p className="text-3xl font-semibold">12,547</p>
                </div>
                <Users className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Your Rank</p>
                  <p className="text-3xl font-semibold">#247</p>
                </div>
                <Trophy className="w-7 h-7 text-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Top 10%</p>
                  <p className="text-3xl font-semibold">1,255</p>
                </div>
                <Star className="w-7 h-7 text-purple-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Points</p>
                  <p className="text-3xl font-semibold">1.2M</p>
                </div>
                <Coins className="w-7 h-7 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <div className="flex gap-1 flex-wrap">
                {[{ key: 'all-time', label: 'All Time' }, { key: 'monthly', label: 'This Month' }, { key: 'weekly', label: 'This Week' }].map(periodOption => (
                  <button
                    key={periodOption.key}
                    onClick={() => setPeriod(periodOption.key as any)}
                    className={`px-4 py-2 rounded-lg transition ${period === periodOption.key ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                  >
                    {periodOption.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <div className="flex gap-1 flex-wrap">
                {[{ key: 'points', label: 'Points' }, { key: 'referrals', label: 'Referrals' }, { key: 'tasks', label: 'Tasks' }].map(categoryOption => (
                  <button
                    key={categoryOption.key}
                    onClick={() => setCategory(categoryOption.key as any)}
                    className={`px-4 py-2 rounded-lg transition ${category === categoryOption.key ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                  >
                    {categoryOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Top Performers</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              {[
                { pos: 2, data: leaderboardData[1], size: 'w-20 h-20' },
                { pos: 1, data: leaderboardData[0], size: 'w-24 h-24', crown: true },
                { pos: 3, data: leaderboardData[2], size: 'w-20 h-20' },
              ].map(({ pos, data, size, crown }) => (
                <div key={pos} className="flex flex-col items-center text-center flex-1">
                  {crown && <Crown className="w-8 h-8 text-yellow-500 mb-2" />}
                  <div className={`${size} bg-gradient-to-r ${pos===1?'from-yellow-400 to-yellow-600': pos===2?'from-gray-400 to-gray-600':'from-orange-400 to-orange-600'} rounded-full grid place-items-center mb-3`}>
                    <span className={`text-white font-bold ${pos===1?'text-2xl':'text-xl'}`}>{pos}</span>
                  </div>
                  <div className={`bg-white/5 border border-white/10 rounded-lg p-4 w-full text-center`}>
                    <p className={`font-bold ${pos===1?'font-bold':'font-semibold'}`}>{data.name}</p>
                    <p className={`${pos===1?'text-yellow-400':'text-white/70'} text-sm`}>{data.points.toLocaleString()} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Leaderboard (Düzeltilmiş Responsive Liste) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4">Full Rankings</h2>
            <div className="space-y-3">
              {leaderboardData.map(user => (
                <div key={user.id} className={`flex items-center justify-between rounded-xl p-3 border border-white/10 ${user.rank <= 3 ? 'bg-emerald-500/5' : 'bg-white/5 hover:bg-white/10'} transition`}>
                  {/* Sol Bölüm: Sıra ve Kullanıcı Adı */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0">
                      {getRankIcon(user.rank)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name} {user.surname}</p>
                      <p className="text-white/60 text-xs">Member since {user.joinDate}</p>
                    </div>
                  </div>
                  {/* Sağ Bölüm: Puanlar ve Trend */}
                  <div className="flex items-center gap-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-emerald-300 font-semibold">{user.points.toLocaleString()} pts</span>
                      <span className="text-white/60 text-xs hidden sm:block">
                        Level: {user.level} | Ref: {user.referrals}
                      </span>
                    </div>
                    {getTrendIcon(user.trend, user.rankChange)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeaderboardPage;