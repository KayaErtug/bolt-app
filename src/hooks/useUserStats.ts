import { useState } from "react";

export function useUserStats() {
  const [stats, setStats] = useState({
    xp: 0,
    points: 0,
    streak: 0,
    lastCheckin: null as null | string,
  });

  const checkIn = () => {
    const today = new Date().toDateString();
    if (stats.lastCheckin === today) {
      return false; // zaten check-in yapılmış
    }

    setStats((prev) => ({
      xp: prev.xp + 10,
      points: prev.points + 10,
      streak: prev.lastCheckin ? prev.streak + 1 : 1,
      lastCheckin: today,
    }));
    return true;
  };

  return { stats, checkIn };
}
