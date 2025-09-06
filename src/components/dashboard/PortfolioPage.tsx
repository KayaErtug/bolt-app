// Dosya: src/components/dashboard/PortfolioPage.tsx

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  Coins,
  Star,
  Trophy,
  Gift,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from "../../firebase/config";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const { user } = useAuth();
  
  // State for dynamic data
  const [userData, setUserData] = useState<any | null>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [pointsHistory, setPointsHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data from Firebase Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's profile data (level, points)
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // Fetch user's achievements
        const achievementsRef = collection(db, "users", user.uid, "achievements");
        const achievementsSnapshot = await getDocs(achievementsRef);
        const fetchedAchievements = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAchievements(fetchedAchievements);

        // Fetch user's points history
        const historyRef = collection(db, "users", user.uid, "pointsHistory");
        const q = query(historyRef, orderBy("timestamp", "desc"), limit(5));
        const historySnapshot = await getDocs(q);
        const fetchedHistory = historySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPointsHistory(fetchedHistory);
        
      } catch (error) {
        console.error("Error fetching portfolio data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>Loading your portfolio...</p>
      </div>
    );
  }

  // Handle case where user data is not found
  if (!userData) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          <p>User profile not found. Please log in again.</p>
        </div>
      );
  }

  const userLevel = userData.level || 1;
  const userPoints = userData.totalPoints || 0;
  const nextLevelXP = (userLevel + 1) * 500;
  const progressPercent = ((userPoints - (userLevel-1)*500) / 500) * 100;
  const pointsToNextLevel = nextLevelXP - userPoints;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Portfolio
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
          {/* Level Progress */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Level Progress
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Level {userLevel}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Current Points: {userPoints}</span>
                <span className="text-white/70">Next Level: {nextLevelXP}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-center text-white/70 text-sm">
                {Math.max(pointsToNextLevel, 0)} points to next level
              </p>
            </div>
          </div>

          {/* Points Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Total Points</p>
                  <p className="text-2xl font-bold mt-1">{userPoints}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg grid place-items-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">This Week</p>
                  <p className="text-2xl font-bold mt-1">185</p>
                  <p className="text-emerald-300 text-sm">+23% from last week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg grid place-items-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Rank</p>
                  <p className="text-2xl font-bold mt-1">#247</p>
                  <p className="text-emerald-300 text-sm">↑12 positions</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg grid place-items-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-amber-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.length > 0 ? (
                  achievements.map((a) => {
                    const Icon = a.unlocked ? Star : Star; // Burayı dinamikleştirmek için daha fazla logic gerek
                    return (
                      <div 
                        key={a.id} 
                        className={`flex items-center p-4 rounded-lg border ${
                          a.unlocked 
                            ? 'bg-emerald-500/10 border-emerald-500/20' 
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg grid place-items-center mr-3 ${
                          a.unlocked ? 'bg-emerald-500' : 'bg-white/10'
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${a.unlocked ? '' : 'text-white/80'}`}>{a.title}</p>
                          <p className="text-white/70 text-sm">{a.description}</p>
                        </div>
                        {a.unlocked && (
                          <div className="text-emerald-300 font-semibold text-sm">
                            ✓ Unlocked
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white/50 text-center">No achievements unlocked yet.</p>
                )}
              </div>
            </div>

            {/* Points History */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-sky-400" />
                Recent Points
              </h2>
              <div className="space-y-3">
                {pointsHistory.length > 0 ? (
                  pointsHistory.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{entry.type}</p>
                          <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-1 rounded">
                            {entry.description}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{new Date(entry.timestamp.toDate()).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-300 font-semibold">+{entry.points}</span>
                        <Coins className="w-4 h-4 text-emerald-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/50 text-center">No recent points history.</p>
                )}
              </div>
              <button className="w-full mt-4 py-2 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition">
                View Full History
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;