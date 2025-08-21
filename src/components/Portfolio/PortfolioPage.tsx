import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  Coins,
  Star,
  Trophy,
  Gift
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
    progress: ((user?.totalPoints || 0) % 500) / 500 * 100
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <p className="text-gray-400 mt-1">Track your progress and achievements</p>
      </div>

      {/* Level Progress */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
            Level Progress
          </h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">Level {levelProgress.current}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current XP: {levelProgress.currentXP}</span>
            <span className="text-gray-400">Next Level: {levelProgress.nextLevelXP}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress.progress}%` }}
            />
          </div>
          <p className="text-center text-gray-400 text-sm">
            {levelProgress.nextLevelXP - levelProgress.currentXP} points to next level
          </p>
        </div>
      </div>

      {/* Points Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Points</p>
              <p className="text-2xl font-bold text-white mt-1">{user?.totalPoints || 0}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">This Week</p>
              <p className="text-2xl font-bold text-white mt-1">185</p>
              <p className="text-green-400 text-sm">+23% from last week</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Rank</p>
              <p className="text-2xl font-bold text-white mt-1">#247</p>
              <p className="text-green-400 text-sm">↑12 positions</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id} 
                  className={`flex items-center p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-emerald-500/10 border-emerald-500/20' 
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    achievement.unlocked 
                      ? 'bg-emerald-500' 
                      : 'bg-gray-600'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.title}
                    </p>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-emerald-400 font-semibold text-sm">
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Points History */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Recent Points
          </h2>
          <div className="space-y-3">
            {pointsHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-medium">{entry.type}</p>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {entry.description}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{entry.date}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-emerald-400 font-semibold">+{entry.points}</span>
                  <Coins className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;