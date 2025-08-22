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
  Play,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { id: '1', title: 'Daily Check-in', description: 'Log in daily to earn bonus points', points: 10, type: 'daily', completed: true, category: 'Login', icon: CheckCircle },
    { id: '2', title: 'Follow on Twitter', description: 'Follow @MarisCoin on Twitter', points: 25, type: 'social', completed: false, category: 'Social Media', icon: Twitter },
    { id: '3', title: 'Join Telegram Channel', description: 'Join our official Telegram community', points: 30, type: 'social', completed: false, category: 'Community', icon: MessageCircle },
    { id: '4', title: 'Share Launch Announcement', description: 'Share our March 6, 2026 launch announcement', points: 50, type: 'social', completed: false, category: 'Marketing', icon: Share2 },
    { id: '5', title: 'Refer 5 Friends', description: 'Invite 5 friends to join the platform', points: 500, type: 'weekly', completed: false, deadline: '7 days left', category: 'Referrals', icon: Users },
    { id: '6', title: 'Complete Crypto Quiz #1', description: 'Test your knowledge about cryptocurrency', points: 75, type: 'quiz', completed: false, category: 'Education', icon: Award },
    { id: '7', title: 'Weekly Trading Quiz', description: 'Complete the advanced trading concepts quiz', points: 100, type: 'weekly', completed: false, deadline: '3 days left', category: 'Education', icon: Award }
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
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            Tasks & Missions
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total Tasks', value: taskStats.total, Icon: Calendar, color: 'text-emerald-400' },
              { label: 'Completed', value: taskStats.completed, Icon: CheckCircle, color: 'text-emerald-300' },
              { label: 'Pending', value: taskStats.pending, Icon: Clock, color: 'text-amber-300' },
              { label: 'Points Earned', value: taskStats.totalPoints, Icon: Coins, color: 'text-emerald-400' },
              { label: 'Available', value: taskStats.availablePoints, Icon: Star, color: 'text-sky-400' },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{label}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                  </div>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <div className="flex gap-1">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition ${
                    filter === filterOption.key
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{filterOption.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    filter === filterOption.key ? 'bg-white/20' : 'bg-white/10'
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
              const badge =
                task.completed ? 'bg-emerald-500' :
                task.type === 'daily' ? 'bg-emerald-500' :
                task.type === 'weekly' ? 'bg-sky-500' :
                task.type === 'social' ? 'bg-purple-500' : 'bg-amber-500';

              const pill =
                task.type === 'daily' ? 'bg-emerald-500/20 text-emerald-300' :
                task.type === 'weekly' ? 'bg-sky-500/20 text-sky-300' :
                task.type === 'social' ? 'bg-purple-500/20 text-purple-300' : 'bg-amber-500/20 text-amber-300';

              return (
                <div
                  key={task.id}
                  className={`rounded-2xl border p-6 transition hover:scale-[1.02] backdrop-blur-md ${
                    task.completed
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : 'border-white/10 bg-white/5 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg grid place-items-center ${badge}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-white/70">{task.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">{task.points}</span>
                    </div>
                  </div>

                  <p className="text-white/80 mb-4">{task.description}</p>

                  {task.deadline && (
                    <div className="flex items-center gap-2 mb-4 text-amber-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{task.deadline}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${pill}`}>
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </span>

                    {task.completed ? (
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg hover:from-emerald-600 hover:to-sky-600 transition">
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
              <div className="w-16 h-16 bg-white/10 rounded-full grid place-items-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-semibold text-white/80 mb-2">No tasks found</h3>
              <p className="text-white/60">Try selecting a different filter</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TasksPage;
