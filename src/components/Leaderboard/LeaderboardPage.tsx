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
  Filter,
  Calendar
} from 'lucide-react';

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
    {
      id: '1',
      rank: 1,
      name: 'Sarah',
      surname: 'Johnson',
      points: 15420,
      level: 8,
      referrals: 45,
      tasksCompleted: 127,
      joinDate: '2024-01-05',
      trend: 'same'
    },
    {
      id: '2',
      rank: 2,
      name: 'Michael',
      surname: 'Chen',
      points: 14850,
      level: 7,
      referrals: 38,
      tasksCompleted: 134,
      joinDate: '2024-01-08',
      trend: 'up',
      rankChange: 1
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma',
      surname: 'Rodriguez',
      points: 13990,
      level: 7,
      referrals: 52,
      tasksCompleted: 98,
      joinDate: '2024-01-10',
      trend: 'down',
      rankChange: -1
    },
    {
      id: '4',
      rank: 4,
      name: 'James',
      surname: 'Wilson',
      points: 12750,
      level: 6,
      referrals: 29,
      tasksCompleted: 156,
      joinDate: '2024-01-12',
      trend: 'up',
      rankChange: 2
    },
    {
      id: '5',
      rank: 5,
      name: 'Lisa',
      surname: 'Anderson',
      points: 11880,
      level: 6,
      referrals: 41,
      tasksCompleted: 89,
      joinDate: '2024-01-15',
      trend: 'same'
    },
    {
      id: '6',
      rank: 6,
      name: 'David',
      surname: 'Thompson',
      points: 10940,
      level: 5,
      referrals: 23,
      tasksCompleted: 145,
      joinDate: '2024-01-18',
      trend: 'up',
      rankChange: 3
    },
    {
      id: '7',
      rank: 7,
      name: 'Anna',
      surname: 'Martinez',
      points: 9850,
      level: 5,
      referrals: 36,
      tasksCompleted: 112,
      joinDate: '2024-01-20',
      trend: 'down',
      rankChange: -2
    },
    {
      id: '8',
      rank: 8,
      name: 'Kevin',
      surname: 'Brown',
      points: 8920,
      level: 4,
      referrals: 18,
      tasksCompleted: 187,
      joinDate: '2024-01-22',
      trend: 'same'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-400 to-gray-600';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    if (rank <= 10) return 'from-emerald-500 to-blue-500';
    return 'from-gray-600 to-gray-700';
  };

  const getTrendIcon = (trend: string, rankChange?: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-400">
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
    return <div className="w-4 h-4 bg-gray-600 rounded-full"></div>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="text-gray-400 mt-1">See how you rank among the community</p>
      </div>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white">12,547</p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Your Rank</p>
              <p className="text-2xl font-bold text-white">#247</p>
            </div>
            <Trophy className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Top 10%</p>
              <p className="text-2xl font-bold text-white">1,255</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Points</p>
              <p className="text-2xl font-bold text-white">1.2M</p>
            </div>
            <Coins className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
          <div className="flex space-x-1">
            {[
              { key: 'all-time', label: 'All Time' },
              { key: 'monthly', label: 'This Month' },
              { key: 'weekly', label: 'This Week' }
            ].map((periodOption) => (
              <button
                key={periodOption.key}
                onClick={() => setPeriod(periodOption.key as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  period === periodOption.key
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {periodOption.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
          <div className="flex space-x-1">
            {[
              { key: 'points', label: 'Points' },
              { key: 'referrals', label: 'Referrals' },
              { key: 'tasks', label: 'Tasks' }
            ].map((categoryOption) => (
              <button
                key={categoryOption.key}
                onClick={() => setCategory(categoryOption.key as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  category === categoryOption.key
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {categoryOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Top Performers</h2>
        <div className="flex justify-center items-end space-x-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 min-w-[120px]">
              <p className="text-white font-semibold">{leaderboardData[1].name}</p>
              <p className="text-gray-400 text-sm">{leaderboardData[1].points.toLocaleString()} pts</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center transform scale-110">
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-2xl">1</span>
            </div>
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg p-4 min-w-[140px]">
              <p className="text-white font-bold">{leaderboardData[0].name}</p>
              <p className="text-yellow-400 text-sm">{leaderboardData[0].points.toLocaleString()} pts</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 min-w-[120px]">
              <p className="text-white font-semibold">{leaderboardData[2].name}</p>
              <p className="text-gray-400 text-sm">{leaderboardData[2].points.toLocaleString()} pts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Full Rankings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Rank</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">User</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Points</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Level</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Referrals</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Tasks</th>
                <th className="text-left text-gray-400 font-medium py-3 px-6">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-800 hover:bg-gray-700/30 transition-colors ${
                    user.rank <= 3 ? 'bg-gradient-to-r from-transparent to-emerald-500/5' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(user.rank)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankBadgeColor(user.rank)} flex items-center justify-center`}>
                        <span className="text-white font-semibold text-sm">
                          {user.name[0]}{user.surname[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name} {user.surname}</p>
                        <p className="text-gray-400 text-xs">Member since {user.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-400 font-semibold">
                        {user.points.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      Level {user.level}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-purple-400 font-semibold">{user.referrals}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-orange-400 font-semibold">{user.tasksCompleted}</span>
                  </td>
                  <td className="py-4 px-6">
                    {getTrendIcon(user.trend, user.rankChange)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;