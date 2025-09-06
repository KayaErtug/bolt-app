// src/components/dashboard/UserProfilePage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { Settings, Save, User, Mail, MapPin, Briefcase, Wallet } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    address: '',
    occupation: '',
    walletAddress: ''
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const data = await userService.getUserData(user.uid);
      if (data) {
        setUserData({
          displayName: data.displayName || '',
          email: data.email || user.email || '',
          address: data.address || '',
          occupation: data.occupation || '',
          walletAddress: data.walletAddress || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      await userService.createOrUpdateUser(user.uid, {
        displayName: userData.displayName,
        email: userData.email,
        address: userData.address,
        occupation: userData.occupation,
        walletAddress: userData.walletAddress,
        lastUpdated: new Date()
      });

      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
            <Settings className="h-8 w-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-white/60">Update your personal information</p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-emerald-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Additional Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Address</label>
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Occupation</label>
                <input
                  type="text"
                  value={userData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  placeholder="Enter your occupation"
                />
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Information
            </h2>

            <div>
              <label className="block text-sm text-white/70 mb-2">Wallet Address</label>
              <input
                type="text"
                value={userData.walletAddress}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                placeholder="Enter your wallet address"
              />
              <p className="text-xs text-white/40 mt-2">
                This is where your rewards will be sent
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;