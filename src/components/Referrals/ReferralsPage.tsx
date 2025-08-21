import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  Copy, 
  Trophy,
  TrendingUp,
  Gift,
  UserPlus,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ReferralsPage: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralStats = {
    total: 12,
    active: 8,
    pending: 4,
    totalEarned: 1200,
    thisMonth: 300
  };

  const referralData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', joinDate: '2024-01-10', points: 250, status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', joinDate: '2024-01-12', points: 180, status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2024-01-15', points: 0, status: 'pending' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', joinDate: '2024-01-18', points: 320, status: 'active' },
    { id: 5, name: 'Eva Green', email: 'eva@example.com', joinDate: '2024-01-20', points: 0, status: 'pending' },
  ];

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(`https://mariscoin.com/ref/${user?.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { tier: 'Bronze', referrals: '1-4', bonus: '100 points per referral' },
    { tier: 'Silver', referrals: '5-9', bonus: '150 points per referral' },
    { tier: 'Gold', referrals: '10+', bonus: '200 points per referral' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Referrals</h1>
        <p className="text-gray-400 mt-1">Invite friends and earn rewards together</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Referrals</p>
              <p className="text-2xl font-bold text-white">{referralStats.total}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-white">{referralStats.active}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">{referralStats.pending}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Earned</p>
              <p className="text-2xl font-bold text-white">{referralStats.totalEarned}</p>
            </div>
            <Gift className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-white">{referralStats.thisMonth}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Referral Link */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2 text-emerald-500" />
            Your Referral Link
          </h2>
          
          <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Referral Code</p>
                <p className="text-white font-mono text-lg">{user?.referralCode}</p>
              </div>
              <button
                onClick={handleCopyReferralCode}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Share your referral link with friends and earn 100 points for each successful referral!
          </p>

          <div className="flex space-x-2">
            <button className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Share on Twitter
            </button>
            <button className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              Share on WhatsApp
            </button>
            <button className="flex-1 py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
              Share on Telegram
            </button>
          </div>
        </div>

        {/* Rewards Tiers */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Reward Tiers
          </h2>
          
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                referralStats.total >= parseInt(reward.referrals.split('-')[0])
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-gray-700/50 border-gray-600'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${
                    referralStats.total >= parseInt(reward.referrals.split('-')[0])
                      ? 'text-emerald-400'
                      : 'text-gray-400'
                  }`}>
                    {reward.tier}
                  </span>
                  <span className="text-gray-400 text-sm">{reward.referrals}</span>
                </div>
                <p className="text-gray-300 text-sm">{reward.bonus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-blue-500" />
          Your Referrals
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3">Name</th>
                <th className="text-left text-gray-400 font-medium py-3">Email</th>
                <th className="text-left text-gray-400 font-medium py-3">Join Date</th>
                <th className="text-left text-gray-400 font-medium py-3">Points</th>
                <th className="text-left text-gray-400 font-medium py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {referralData.map((referral) => (
                <tr key={referral.id} className="border-b border-gray-800">
                  <td className="py-4">
                    <p className="text-white font-medium">{referral.name}</p>
                  </td>
                  <td className="py-4">
                    <p className="text-gray-400">{referral.email}</p>
                  </td>
                  <td className="py-4">
                    <p className="text-gray-400">{referral.joinDate}</p>
                  </td>
                  <td className="py-4">
                    <p className="text-emerald-400 font-semibold">{referral.points}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      referral.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {referral.status}
                    </span>
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

export default ReferralsPage;