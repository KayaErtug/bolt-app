import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Smartphone,
  Mail,
  MessageSquare,
  Key,
  Database,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    security: true,
    achievements: true,
    referrals: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showStats: true,
    showReferrals: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'dark'
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account preferences and security</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive updates via email', icon: Mail },
                { key: 'push', label: 'Push Notifications', description: 'Browser push notifications', icon: Bell },
                { key: 'sms', label: 'SMS Notifications', description: 'Text message alerts', icon: MessageSquare },
                { key: 'marketing', label: 'Marketing Updates', description: 'News and promotional content', icon: Smartphone },
                { key: 'security', label: 'Security Alerts', description: 'Account security notifications', icon: Shield },
                { key: 'achievements', label: 'Achievement Alerts', description: 'New badges and rewards', icon: Bell },
                { key: 'referrals', label: 'Referral Updates', description: 'New referral activities', icon: Bell }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-emerald-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'transform translate-x-6'
                            : 'transform translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-white">Privacy & Visibility</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'profileVisible', label: 'Public Profile', description: 'Make your profile visible to others', icon: Eye },
                { key: 'showStats', label: 'Show Statistics', description: 'Display your points and achievements', icon: Database },
                { key: 'showReferrals', label: 'Show Referrals', description: 'Display your referral count publicly', icon: Eye }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange(item.key, !privacy[item.key as keyof typeof privacy])}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        privacy[item.key as keyof typeof privacy]
                          ? 'bg-blue-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          privacy[item.key as keyof typeof privacy]
                            ? 'transform translate-x-6'
                            : 'transform translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-white">Preferences</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Moon className="w-4 h-4 inline mr-2" />
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Standard Time</option>
                  <option value="PST">Pacific Standard Time</option>
                  <option value="CET">Central European Time</option>
                  <option value="JST">Japan Standard Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Data */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-gray-400 text-sm">Update your account password</p>
                  </div>
                  <Key className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full text-left p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-gray-400 text-sm">Enable 2FA for extra security</p>
                  </div>
                  <Shield className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-white">Data Management</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Export Data</p>
                    <p className="text-gray-400 text-sm">Download your account data</p>
                  </div>
                  <Download className="w-4 h-4 text-blue-400" />
                </div>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                className="w-full text-left p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Delete Account</p>
                    <p className="text-gray-400 text-sm">Permanently delete your account</p>
                  </div>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
              </button>

              {showDeleteConfirm && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm mb-3">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;