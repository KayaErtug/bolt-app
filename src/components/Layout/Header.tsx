import React from 'react';
import { Bell, User, LogOut, Coins } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold text-white">Maris Coin</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
            <Coins className="w-4 h-4 text-emerald-500" />
            <span className="text-white font-semibold">{user?.totalPoints || 0}</span>
            <span className="text-gray-400 text-sm">Points</span>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">{user?.name} {user?.surname}</span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;