// src/components/dashboard/DailyCheckinCard.tsx
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useUserStats } from "../../hooks/useUserStats";


export default function DailyCheckinCard() {
  const { stats, checkIn } = useUserStats();

  const handleCheckIn = () => {
    const success = checkIn();
    if (!success) {
      alert("You already checked in today!");
    } else {
      alert("Check-in successful! +10 XP & +10 Points 🎉");
    }
  };

  return (
    <Card className="bg-slate-900/40 border border-white/10 text-white">
      <CardContent className="p-4 flex flex-col items-center gap-3">
        <h2 className="text-lg font-semibold">Daily Check-In</h2>
        <p className="text-sm text-gray-400">
          Current Streak: <span className="font-bold text-emerald-400">{stats.streak}</span> days
        </p>
        <Button onClick={handleCheckIn} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Check-In
        </Button>
      </CardContent>
    </Card>
  );
}
