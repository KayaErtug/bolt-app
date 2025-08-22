// Dosya: src/App.tsx

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./components/dashboard/DashboardPage";

import AchievementsPage from "./components/dashboard/AchievementsPage";
import ReferralsPage from "./components/dashboard/ReferralsPage";
import LeaderboardPage from "./components/dashboard/LeaderboardPage";
import SettingsPage from "./components/dashboard/SettingsPage";
import DailyCheckinCard from "./components/dashboard/DailyCheckinCard";
import TasksPage from "./components/dashboard/TasksPage";
import NFTShowcase from "./components/dashboard/NFTShowcase";
import PortfolioPage from "./components/dashboard/PortfolioPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard + Sidebar routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/daily-checkin" element={<DailyCheckinCard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/nft-showcase" element={<NFTShowcase />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}
