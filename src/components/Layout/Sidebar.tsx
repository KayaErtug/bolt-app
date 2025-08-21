import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  User, 
  Trophy,
  Calendar,
  Settings,
  HelpCircle,
  Image,
  Crown,
  Target
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'tasks', label: 'Tasks', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'nft', label: 'NFT Collections', icon: Image },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <ul className="space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;