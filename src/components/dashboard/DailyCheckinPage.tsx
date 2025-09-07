import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  CheckCircle2,
  Gift,
  Flame,
  Trophy,
  Clock,
  Info,
} from "lucide-react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

const today = new Date();

const DailyCheckinPage: React.FC = () => {
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const [checkedDays, setCheckedDays] = useState<number[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [totalCheckins, setTotalCheckins] = useState<number>(0);
  const [monthlyPoints, setMonthlyPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCheckins = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const monthString = `${viewYear}-${viewMonth + 1}`; // 0-indexed month
      try {
        const monthRef = collection(db, "checkins", user.uid, monthString);
        const querySnapshot = await getDocs(monthRef);

        const fetchedCheckins: number[] = [];
        let currentPoints = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.day) {
            fetchedCheckins.push(data.day);
            currentPoints += 10;
          }
        });

        const sortedDays = [...fetchedCheckins].sort((a, b) => a - b);
        let tempStreak = 0;
        if (sortedDays.length > 0) {
          tempStreak = 1;
          for (let i = sortedDays.length - 2; i >= 0; i--) {
            if (sortedDays[i] === sortedDays[i + 1] - 1) {
              tempStreak++;
            } else {
              break;
            }
          }
        }

        setCheckedDays(fetchedCheckins);
        setTotalCheckins(fetchedCheckins.length);
        setMonthlyPoints(currentPoints);
        setStreak(tempStreak);
      } catch (error) {
        console.error("Error fetching checkins: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckins();
  }, [user, viewYear, viewMonth]);

  const thisMonthDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const days = getDaysInMonth(viewYear, viewMonth);
    const padStart = (firstDay + 6) % 7;
    return { days, padStart };
  }, [viewYear, viewMonth]);

  const isTodayInView =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const isTodayChecked =
    isTodayInView && checkedDays.includes(today.getDate());

  const handleCheckIn = async () => {
    if (!isTodayInView) {
      alert("You are not in the current month. Use the 'Go to Today' button.");
      return;
    }
    if (isTodayChecked) {
      alert("Today's check-in has already been completed. ✅");
      return;
    }
    if (!user) {
      alert("You must be logged in to check in.");
      return;
    }

    try {
      const monthString = `${viewYear}-${viewMonth + 1}`;
      const dayDocRef = doc(db, "checkins", user.uid, monthString, `${today.getDate()}`);
      await setDoc(dayDocRef, {
        day: today.getDate(),
        createdAt: new Date(),
        source: "web",
      });

      const newCheckedDays = [...checkedDays, today.getDate()].sort((a, b) => a - b);
      setCheckedDays(newCheckedDays);
      setTotalCheckins(totalCheckins + 1);
      setMonthlyPoints(monthlyPoints + 10);

      let newStreak = 1;
      const reversedDays = newCheckedDays.slice().sort((a, b) => b - a);
      for (let i = 1; i < reversedDays.length; i++) {
        if (reversedDays[i - 1] - reversedDays[i] === 1) newStreak++;
        else break;
      }
      setStreak(newStreak);

      alert("Check-in successful! +10 Points 🎉");
    } catch (error) {
      console.error("Error during check-in: ", error);
      alert("Check-in failed. Please try again.");
    }
  };

  const goPrevMonth = () => {
    const date = new Date(viewYear, viewMonth, 1);
    date.setMonth(date.getMonth() - 1);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const goNextMonth = () => {
    const date = new Date(viewYear, viewMonth, 1);
    date.setMonth(date.getMonth() + 1);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const goToToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  };

  const tiers = [
    { day: 3, label: "3 Days", bonus: "+20", reached: streak >= 3 },
    { day: 7, label: "7 Days", bonus: "+50", reached: streak >= 7 },
    { day: 14, label: "14 Days", bonus: "+120", reached: streak >= 14 },
    { day: 30, label: "30 Days", bonus: "+300", reached: streak >= 30 },
  ];

  const nextTier = tiers.find((t) => !t.reached);
  const currentProgressPercent = nextTier
    ? Math.min((streak / nextTier.day) * 100, 100)
    : 100;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>Loading check-in data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            Daily Check-In
          </h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </header>

        <main className="mx-auto w-full max-w-full sm:max-w-7xl flex-1 p-2 sm:p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Daily Streak</p>
                  <p className="text-3xl font-semibold">{streak}</p>
                </div>
                <Flame className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Check-ins This Month</p>
                  <p className="text-3xl font-semibold">{totalCheckins}</p>
                </div>
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Today's Status</p>
                  <p className={`text-2xl font-semibold ${isTodayChecked ? "text-emerald-300" : "text-white"}`}>
                    {isTodayChecked ? "Completed" : "Pending"}
                  </p>
                </div>
                <Clock className="w-7 h-7 text-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Monthly Points</p>
                  <p className="text-3xl font-semibold">{monthlyPoints}</p>
                </div>
                <Trophy className="w-7 h-7 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Check-in CTA + Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Today's Check-In</h2>
                  <p className="text-white/70 text-sm">
                    Log in every day to maintain your streak. Longer streaks earn extra bonuses.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleCheckIn}
                    disabled={isTodayChecked || isLoading}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition ${
                      isTodayChecked
                        ? "border border-white/15 text-white/60 bg-white/5 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isTodayChecked ? "Completed Today" : "Check-In"}
                  </button>
                  {!isTodayInView && (
                    <button
                      onClick={goToToday}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      Go to Today
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="text-sm text-white/70 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-300" />
                    Next reward:
                    {nextTier ? (
                      <span className="text-white">
                        {nextTier.label} streak for <span className="text-emerald-300">{nextTier.bonus} points</span>
                      </span>
                    ) : (
                      <span className="text-emerald-300">Max rewards reached</span>
                    )}
                  </div>
                  <div className="text-sm text-white/70">Streak: {streak} days</div>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
                    style={{ width: `${currentProgressPercent}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {tiers.map((t) => (
                    <div
                      key={t.day}
                      className={`rounded-xl border p-3 text-center ${
                        t.reached
                          ? "border-emerald-500/30 bg-emerald-500/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="text-sm font-semibold">{t.label}</div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <Gift className={`w-4 h-4 ${t.reached ? "text-emerald-300" : "text-white/60"}`} />
                        <span className={`${t.reached ? "text-emerald-300" : "text-white/70"} text-sm`}>
                          {t.bonus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-semibold">Tip</h3>
              </div>
              <p className="text-white/70 text-sm">
                Completing your check-in at the **same time every day** helps maintain your streak.
                Longer streaks reward you with seasonal bonuses and special badges.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  7-day streak for +50 points bonus
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  14-day streak for a special badge
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  30-day streak for the **grand prize**
                </li>
              </ul>
            </div>
          </div>

          {/* Calendar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md overflow-x-auto">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  {monthNames[viewMonth]} {viewYear}
                </h2>
                {!isTodayInView && (
                  <button
                    onClick={goToToday}
                    className="text-xs px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Go to Today
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrevMonth}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={goNextMonth}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center text-xs text-white/60 mb-2">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
              {Array.from({ length: thisMonthDays.padStart }).map((_, i) => (
                <div key={`pad-${i}`} className="h-8 sm:h-12 rounded-lg bg-white/0 border border-transparent" />
              ))}

              {Array.from({ length: thisMonthDays.days }).map((_, i) => {
                const day = i + 1;
                const isChecked = checkedDays.includes(day);
                const isToday = isTodayInView && day === today.getDate();

                return (
                  <div
                    key={day}
                    className={`h-8 sm:h-12 rounded-lg border grid place-items-center relative
                      ${isChecked ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"}
                      ${isToday ? "ring-2 ring-emerald-400" : ""}`}
                  >
                    <span className="text-xs sm:text-sm">{day}</span>
                    {isChecked && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 absolute top-1 right-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DailyCheckinPage;
