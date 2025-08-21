import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  Crown, 
  Shield, 
  Target,
  Zap,
  Gift,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';

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
  progress?: {
    current: number;
    required: number;
  };
}

const AchievementsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Early Adopter',
      description: 'One of the first 1000 users to join Maris Coin',
      icon: Star,
      points: 100,
      unlocked: true,
      unlockedAt: '2024-01-15',
      category: 'special',
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Complete 10 social media tasks',
      icon: Users,
      points: 150,
      unlocked: true,
      unlockedAt: '2024-01-18',
      category: 'social',
      rarity: 'common',
      progress: { current: 10, required: 10 }
    },
    {
      id: '3',
      title: 'Point Collector',
      description: 'Accumulate 1000 total points',
      icon: Trophy,
      points: 200,
      unlocked: true,
      unlockedAt: '2024-01-20',
      category: 'milestone',
      rarity: 'common',
      progress: { current: 1250, required: 1000 }
    },
    {
      id: '4',
      title: 'Referral Master',
      description: 'Successfully refer 25 friends',
      icon: Crown,
      points: 500,
      unlocked: false,
      category: 'social',
      rarity: 'epic',
      progress: { current: 12, required: 25 }
    },
    {
      id: '5',
      title: 'Quiz Champion',
      description: 'Complete 50 quizzes with 90%+ accuracy',
      icon: Award,
      points: 300,
      unlocked: false,
      category: 'engagement',
      rarity: 'rare',
      progress: { current: 23, required: 50 }
    },
    {
      id: '6',
      title: 'Streak Master',
      description: 'Maintain a 30-day login streak',
      icon: Zap,
      points: 250,
      unlocked: false,
      category: 'engagement',
      rarity: 'rare',
      progress: { current: 15, required: 30 }
    },
    {
      id: '7',
      title: 'Community Leader',
      description: 'Reach the top 10 on the leaderboard',
      icon: Shield,
      points: 750,
      unlocked: false,
      category: 'milestone',
      rarity: 'legendary'
    },
    {
      id: '8',
      title: 'Beta Tester',
      description: 'Participate in the beta testing phase',
      icon: Target,
      points: 100,
      unlocked: true,
      unlockedAt: '2024-01-10',
      category: 'special',
      rarity: 'rare'
    }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const achievementStats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    totalPoints: achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0),
    completion: (achievements.filter(a => a.unlocked).length / achievements.length) * 100
  };

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-500'
  };

  const rarityBorders = {
    common: 'border-gray-500/50',
    rare: 'border-blue-500/50',
    epic: 'border-purple-500/50',
    legendary: 'border-yellow-500/50'
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
        <p className="text-gray-400 mt-1">Unlock badges and earn rewards for your accomplishments</p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Achievements</p>
              <p className="text-2xl font-bold text-white">{achievementStats.total}</p>
            </div>
            <Trophy className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Unlocked</p>
              <p className="text-2xl font-bold text-white">{achievementStats.unlocked}</p>
            </div>
            <Star className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Points Earned</p>
              <p className="text-2xl font-bold text-white">{achievementStats.totalPoints}</p>
            </div>
            <Gift className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Completion</p>
              <p className="text-2xl font-bold text-white">{achievementStats.completion.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
          <span className="text-emerald-400 font-semibold">
            {achievementStats.unlocked}/{achievementStats.total} Achievements
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${achievementStats.completion}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All Achievements' },
            { key: 'unlocked', label: 'Unlocked' },
            { key: 'locked', label: 'Locked' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`bg-gray-800/50 backdrop-blur-sm border-2 rounded-xl p-6 transition-all ${
                achievement.unlocked
                  ? `${rarityBorders[achievement.rarity]} hover:scale-[1.02]`
                  : 'border-gray-700 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${
                  achievement.unlocked 
                    ? rarityColors[achievement.rarity]
                    : 'from-gray-600 to-gray-700'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {achievement.unlocked ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">Unlocked</span>
                  </div>
                ) : (
                  <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                    achievement.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' :
                    achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                    achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {achievement.rarity}
                  </span>
                )}
              </div>

              <h3 className={`text-lg font-semibold mb-2 ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>

              {achievement.progress && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-emerald-400">
                      {achievement.progress.current}/{achievement.progress.required}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((achievement.progress.current / achievement.progress.required) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-400 font-semibold">{achievement.points} pts</span>
                </div>
                
                {achievement.unlockedAt && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{achievement.unlockedAt}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;