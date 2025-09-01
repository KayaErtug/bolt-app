// Dosya: src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Sayfalar
import DashboardPage from "./components/dashboard/DashboardPage";
import ReferralsPage from "./components/dashboard/ReferralsPage";
import TasksPage from "./components/dashboard/TasksPage";
import LeaderboardPage from "./components/dashboard/LeaderboardPage";
import NFTShowcase from "./components/dashboard/NFTShowcase";
import PortfolioPage from "./components/dashboard/PortfolioPage";
import AchievementsPage from "./components/dashboard/AchievementsPage";
import SettingsPage from "./components/dashboard/SettingsPage";
import ActivationZonePage from "./components/dashboard/ActivationZonePage";
import LoginForm from "./components/LoginForm";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/nft-showcase" element={<NFTShowcase />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/activation-zone" element={<ActivationZonePage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
