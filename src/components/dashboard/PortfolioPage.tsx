import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  Coins,
  Star,
  Trophy,
  Gift,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const { user } = useAuth();

  const achievements = [
    { id: 1, title: 'Early Adopter', description: 'Joined in the first 1000 users', icon: Star, unlocked: true },
    { id: 2, title: 'Social Butterfly', description: 'Shared 10 posts on social media', icon: Gift, unlocked: true },
    { id: 3, title: 'Referral Master', description: 'Referred 10+ friends', icon: Trophy, unlocked: false },
    { id: 4, title: 'Quiz Champion', description: 'Completed 20 quizzes', icon: Award, unlocked: false },
  ];

  const pointsHistory = [
    { date: '2024-01-15', points: 100, type: 'Welcome Bonus', description: 'Account registration' },
    { date: '2024-01-16', points: 25, type: 'Social Task', description: 'Twitter follow' },
    { date: '2024-01-17', points: 15, type: 'Daily Login', description: 'Daily check-in' },
    { date: '2024-01-18', points: 100, type: 'Referral', description: 'Friend joined' },
    { date: '2024-01-19', points: 30, type: 'Quiz', description: 'Completed crypto quiz' },
  ];

  const levelProgress = {
    current: user?.level || 1,
    currentXP: user?.totalPoints || 0,
    nextLevelXP: ((user?.level || 1) + 1) * 500,
    progress: (((user?.totalPoints || 0) % 500) / 500) * 100
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Portfolio
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
          {/* Level Progress */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Level Progress
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Level {levelProgress.current}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Current XP: {levelProgress.currentXP}</span>
                <span className="text-white/70">Next Level: {levelProgress.nextLevelXP}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress.progress}%` }}
                />
              </div>
              <p className="text-center text-white/70 text-sm">
                {Math.max(levelProgress.nextLevelXP - levelProgress.currentXP, 0)} points to next level
              </p>
            </div>
          </div>

          {/* Points Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Total Points</p>
                  <p className="text-2xl font-bold mt-1">{user?.totalPoints || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg grid place-items-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">This Week</p>
                  <p className="text-2xl font-bold mt-1">185</p>
                  <p className="text-emerald-300 text-sm">+23% from last week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg grid place-items-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Rank</p>
                  <p className="text-2xl font-bold mt-1">#247</p>
                  <p className="text-emerald-300 text-sm">↑12 positions</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg grid place-items-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-amber-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div 
                      key={a.id} 
                      className={`flex items-center p-4 rounded-lg border ${
                        a.unlocked 
                          ? 'bg-emerald-500/10 border-emerald-500/20' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg grid place-items-center mr-3 ${
                        a.unlocked ? 'bg-emerald-500' : 'bg-white/10'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${a.unlocked ? '' : 'text-white/80'}`}>{a.title}</p>
                        <p className="text-white/70 text-sm">{a.description}</p>
                      </div>
                      {a.unlocked && (
                        <div className="text-emerald-300 font-semibold text-sm">
                          ✓ Unlocked
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Points History */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-sky-400" />
                Recent Points
              </h2>
              <div className="space-y-3">
                {pointsHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{entry.type}</p>
                        <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-1 rounded">
                          {entry.description}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">{entry.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-300 font-semibold">+{entry.points}</span>
                      <Coins className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition">
                View Full History
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;
