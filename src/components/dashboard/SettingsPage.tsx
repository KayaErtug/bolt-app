import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
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
  EyeOff,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-purple-400" />
            Settings
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
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Notifications + Privacy + Preferences */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xl font-semibold">Notifications</h2>
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
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-white/60" />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-white/70 text-sm">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications]
                              ? 'bg-emerald-500'
                              : 'bg-white/20'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? 'translate-x-6'
                                : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-sky-400" />
                  <h2 className="text-xl font-semibold">Privacy & Visibility</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'profileVisible', label: 'Public Profile', description: 'Make your profile visible to others', icon: Eye },
                    { key: 'showStats', label: 'Show Statistics', description: 'Display your points and achievements', icon: Database },
                    { key: 'showReferrals', label: 'Show Referrals', description: 'Display your referral count publicly', icon: EyeOff }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-white/60" />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-white/70 text-sm">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange(item.key, !privacy[item.key as keyof typeof privacy])}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            privacy[item.key as keyof typeof privacy]
                              ? 'bg-sky-500'
                              : 'bg-white/20'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              privacy[item.key as keyof typeof privacy]
                                ? 'translate-x-6'
                                : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <SettingsIcon className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold">Preferences</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Moon className="w-4 h-4 inline mr-2" />
                      Theme
                    </label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Timezone
                    </label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="w-5 h-5 text-red-400" />
                  <h2 className="text-lg font-semibold">Security</h2>
                </div>

                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-white/70 text-sm">Update your account password</p>
                      </div>
                      <Key className="w-4 h-4 text-white/60" />
                    </div>
                  </button>

                  <button className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-white/70 text-sm">Enable 2FA for extra security</p>
                      </div>
                      <Shield className="w-4 h-4 text-white/60" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-5 h-5 text-sky-400" />
                  <h2 className="text-lg font-semibold">Data Management</h2>
                </div>

                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg hover:bg-sky-500/20 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export Data</p>
                        <p className="text-white/70 text-sm">Download your account data</p>
                      </div>
                      <Download className="w-4 h-4 text-sky-300" />
                    </div>
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                    className="w-full text-left p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-white/70 text-sm">Permanently delete your account</p>
                      </div>
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </div>
                  </button>

                  {showDeleteConfirm && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-300 text-sm mb-3">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition text-sm"
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
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
