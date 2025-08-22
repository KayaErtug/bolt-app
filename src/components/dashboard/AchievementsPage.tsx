// Dosya: src/components/dashboard/AchievementsPage.tsx
import React, { useState } from 'react';
import { 
  Trophy, Star, Award, Crown, Shield, Target, Zap, Gift, Users, Calendar, TrendingUp, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'milestone' | 'social' | 'engagement' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: { current: number; required: number };
}

const AchievementsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const achievements: Achievement[] = [
    { id: '1', title: 'Early Adopter', description: 'One of the first 1000 users to join Maris Coin', icon: Star, points: 100, unlocked: true, unlockedAt: '2024-01-15', category: 'special', rarity: 'rare' },
    { id: '2', title: 'Social Butterfly', description: 'Complete 10 social media tasks', icon: Users, points: 150, unlocked: true, unlockedAt: '2024-01-18', category: 'social', rarity: 'common', progress: { current: 10, required: 10 } },
    { id: '3', title: 'Point Collector', description: 'Accumulate 1000 total points', icon: Trophy, points: 200, unlocked: true, unlockedAt: '2024-01-20', category: 'milestone', rarity: 'common', progress: { current: 1250, required: 1000 } },
    { id: '4', title: 'Referral Master', description: 'Successfully refer 25 friends', icon: Crown, points: 500, unlocked: false, category: 'social', rarity: 'epic', progress: { current: 12, required: 25 } },
    { id: '5', title: 'Quiz Champion', description: 'Complete 50 quizzes with 90%+ accuracy', icon: Award, points: 300, unlocked: false, category: 'engagement', rarity: 'rare', progress: { current: 23, required: 50 } },
    { id: '6', title: 'Streak Master', description: 'Maintain a 30-day login streak', icon: Zap, points: 250, unlocked: false, category: 'engagement', rarity: 'rare', progress: { current: 15, required: 30 } },
    { id: '7', title: 'Community Leader', description: 'Reach the top 10 on the leaderboard', icon: Shield, points: 750, unlocked: false, category: 'milestone', rarity: 'legendary' },
    { id: '8', title: 'Beta Tester', description: 'Participate in the beta testing phase', icon: Target, points: 100, unlocked: true, unlockedAt: '2024-01-10', category: 'special', rarity: 'rare' }
  ];

  const filtered = achievements.filter(a => filter === 'all' ? true : filter === 'unlocked' ? a.unlocked : !a.unlocked);

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    totalPoints: achievements.reduce((s, a) => s + (a.unlocked ? a.points : 0), 0),
    completion: (achievements.filter(a => a.unlocked).length / achievements.length) * 100
  };

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-500'
  } as const;

  const rarityBorders = {
    common: 'border-gray-500/40',
    rare: 'border-blue-500/40',
    epic: 'border-purple-500/40',
    legendary: 'border-yellow-500/40'
  } as const;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            Achievements
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
                  <p className="text-sm text-white/70">Total Achievements</p>
                  <p className="text-3xl font-semibold">{stats.total}</p>
                </div>
                <Trophy className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Unlocked</p>
                  <p className="text-3xl font-semibold">{stats.unlocked}</p>
                </div>
                <Star className="w-7 h-7 text-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Points Earned</p>
                  <p className="text-3xl font-semibold">+{stats.totalPoints}</p>
                </div>
                <Gift className="w-7 h-7 text-purple-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Completion</p>
                  <p className="text-3xl font-semibold">{stats.completion.toFixed(1)}%</p>
                </div>
                <TrendingUp className="w-7 h-7 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <span className="text-emerald-300 font-semibold">
                {stats.unlocked}/{stats.total} Achievements
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${stats.completion}%` }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <div className="flex gap-1">
              {[
                { key: 'all', label: 'All Achievements' },
                { key: 'unlocked', label: 'Unlocked' },
                { key: 'locked', label: 'Locked' }
              ].map((o) => (
                <button
                  key={o.key}
                  onClick={() => setFilter(o.key as any)}
                  className={`px-6 py-3 rounded-xl transition ${
                    filter === o.key
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.id}
                  className={`rounded-2xl p-5 backdrop-blur-md border-2 transition ${
                    a.unlocked
                      ? `bg-white/5 ${rarityBorders[a.rarity]} hover:scale-[1.01]`
                      : 'bg-white/5 border-white/10 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r ${
                      a.unlocked ? rarityColors[a.rarity] : 'from-gray-600 to-gray-700'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {a.unlocked ? (
                      <div className="flex items-center gap-1 text-emerald-300">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">Unlocked</span>
                      </div>
                    ) : (
                      <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-white/10 text-white/70 border border-white/20">
                        {a.rarity}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-semibold mb-1 ${a.unlocked ? 'text-white' : 'text-white/80'}`}>
                    {a.title}
                  </h3>
                  <p className="text-sm text-white/70 mb-4">{a.description}</p>

                  {a.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2 text-white/70">
                        <span>Progress</span>
                        <span className="text-emerald-300">
                          {a.progress.current}/{a.progress.required}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                          style={{ width: `${Math.min((a.progress.current / a.progress.required) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">{a.points} pts</span>
                    </div>
                    {a.unlockedAt && (
                      <div className="flex items-center gap-1 text-white/60">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">{a.unlockedAt}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AchievementsPage;
