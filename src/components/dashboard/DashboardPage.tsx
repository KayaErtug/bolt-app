import React from "react";
import {
  Coins,
  Users,
  Trophy,
  TrendingUp,
  Calendar,
  Gift,
  Target,
  Star,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { useAuth } from "../../context/AuthContext";

// Bu sayfanın ihtiyaç duyduğu alanlar için minimal kullanıcı tipi
type StatsUser = {
  displayName?: string | null;
  level?: number;
  totalPoints?: number;
};

const DashboardPage: React.FC = () => {
  // AuthContext'in user'ını, bu sayfadaki minimal tipe göre yorumluyoruz
  const { user } = useAuth() as { user: StatsUser | null };

  const recentActivities = [
    { id: 1, type: "daily_login", description: "Daily login bonus", points: 10, time: "2 hours ago" },
    { id: 2, type: "referral", description: "New referral bonus", points: 100, time: "1 day ago" },
    { id: 3, type: "task", description: "Completed social media task", points: 25, time: "2 days ago" },
    { id: 4, type: "achievement", description: 'Unlocked "Early Adopter" badge', points: 50, time: "3 days ago" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Share on Twitter", points: 15, deadline: "Today" },
    { id: 2, title: "Join Telegram Channel", points: 20, deadline: "Tomorrow" },
    { id: 3, title: "Complete Quiz #5", points: 30, deadline: "2 days left" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.displayName || "Guest"}!
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your Maris Coin journey overview
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
          <Trophy className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">
            Level {user?.level ?? 1}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Points"
          value={user?.totalPoints ?? 0}
          icon={Coins}
          change="+125 this week"
          changeType="positive"
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatsCard
          title="Referrals"
          value={12}
          icon={Users}
          change="+3 this month"
          changeType="positive"
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Achievements"
          value={8}
          icon={Trophy}
          change="2 new unlocked"
          changeType="positive"
          gradient="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Streak Days"
          value={15}
          icon={TrendingUp}
          change="Personal best!"
          changeType="positive"
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-emerald-500" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {activity.description}
                  </p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-semibold">
                    +{activity.points}
                  </span>
                  <Coins className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Upcoming Tasks
          </h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{task.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <p className="text-gray-400 text-sm">{task.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 font-semibold">
                    {task.points}
                  </span>
                  <Coins className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-purple-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors text-center group">
            <Gift className="w-8 h-8 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium">Daily Check-in</p>
            <p className="text-emerald-400 text-sm">+10 points</p>
          </button>

          <button className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors text-center group">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium">Invite Friends</p>
            <p className="text-blue-400 text-sm">+100 points</p>
          </button>

          <button className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors text-center group">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium">Complete Quiz</p>
            <p className="text-purple-400 text-sm">+30 points</p>
          </button>

          <button className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors text-center group">
            <Star className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium">Social Share</p>
            <p className="text-orange-400 text-sm">+15 points</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
