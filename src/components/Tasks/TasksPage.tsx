import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Coins, 
  Star,
  Twitter,
  MessageCircle,
  Share2,
  Users,
  Award,
  Play
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'social' | 'quiz';
  completed: boolean;
  deadline?: string;
  category: string;
  icon: React.ComponentType<any>;
}

const TasksPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'social' | 'quiz'>('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Daily Check-in',
      description: 'Log in daily to earn bonus points',
      points: 10,
      type: 'daily',
      completed: true,
      category: 'Login',
      icon: CheckCircle
    },
    {
      id: '2',
      title: 'Follow on Twitter',
      description: 'Follow @MarisCoin on Twitter',
      points: 25,
      type: 'social',
      completed: false,
      category: 'Social Media',
      icon: Twitter
    },
    {
      id: '3',
      title: 'Join Telegram Channel',
      description: 'Join our official Telegram community',
      points: 30,
      type: 'social',
      completed: false,
      category: 'Community',
      icon: MessageCircle
    },
    {
      id: '4',
      title: 'Share Launch Announcement',
      description: 'Share our March 6, 2026 launch announcement',
      points: 50,
      type: 'social',
      completed: false,
      category: 'Marketing',
      icon: Share2
    },
    {
      id: '5',
      title: 'Refer 5 Friends',
      description: 'Invite 5 friends to join the platform',
      points: 500,
      type: 'weekly',
      completed: false,
      deadline: '7 days left',
      category: 'Referrals',
      icon: Users
    },
    {
      id: '6',
      title: 'Complete Crypto Quiz #1',
      description: 'Test your knowledge about cryptocurrency',
      points: 75,
      type: 'quiz',
      completed: false,
      category: 'Education',
      icon: Award
    },
    {
      id: '7',
      title: 'Weekly Trading Quiz',
      description: 'Complete the advanced trading concepts quiz',
      points: 100,
      type: 'weekly',
      completed: false,
      deadline: '3 days left',
      category: 'Education',
      icon: Award
    }
  ];

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.type === filter);

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    totalPoints: tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0),
    availablePoints: tasks.reduce((sum, task) => sum + (!task.completed ? task.points : 0), 0)
  };

  const filters = [
    { key: 'all', label: 'All Tasks', count: tasks.length },
    { key: 'daily', label: 'Daily', count: tasks.filter(t => t.type === 'daily').length },
    { key: 'weekly', label: 'Weekly', count: tasks.filter(t => t.type === 'weekly').length },
    { key: 'social', label: 'Social', count: tasks.filter(t => t.type === 'social').length },
    { key: 'quiz', label: 'Quizzes', count: tasks.filter(t => t.type === 'quiz').length }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Tasks & Missions</h1>
        <p className="text-gray-400 mt-1">Complete tasks to earn points and unlock rewards</p>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-white">{taskStats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{taskStats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">{taskStats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Points Earned</p>
              <p className="text-2xl font-bold text-white">{taskStats.totalPoints}</p>
            </div>
            <Coins className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Available</p>
              <p className="text-2xl font-bold text-white">{taskStats.availablePoints}</p>
            </div>
            <Star className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
        <div className="flex space-x-1">
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span>{filterOption.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filter === filterOption.key
                  ? 'bg-white/20'
                  : 'bg-gray-600'
              }`}>
                {filterOption.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => {
          const Icon = task.icon;
          return (
            <div
              key={task.id}
              className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-[1.02] ${
                task.completed
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-gray-700 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    task.completed
                      ? 'bg-green-500'
                      : task.type === 'daily'
                      ? 'bg-emerald-500'
                      : task.type === 'weekly'
                      ? 'bg-blue-500'
                      : task.type === 'social'
                      ? 'bg-purple-500'
                      : 'bg-orange-500'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{task.title}</h3>
                    <p className="text-gray-400 text-sm">{task.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-400 font-semibold">{task.points}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{task.description}</p>

              {task.deadline && (
                <div className="flex items-center space-x-2 mb-4 text-orange-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{task.deadline}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  task.type === 'daily'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : task.type === 'weekly'
                    ? 'bg-blue-500/20 text-blue-400'
                    : task.type === 'social'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                </span>

                {task.completed ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all">
                    <Play className="w-4 h-4" />
                    <span>Start Task</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;