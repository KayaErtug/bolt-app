import React, { useMemo, useState } from "react";
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

// Yardımcı: ay bilgisi
const monthNames = [
  "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
  "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",
];

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

const today = new Date();

const DailyCheckinPage: React.FC = () => {
  // Varsayılan olarak bugünün ayı
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Demo amaçlı: Bu ay içinde daha önce yapılan check-in günleri (örnek veri)
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2, 3, 5, 8, 12, 13, 15, 16, 19, 20, 21]);

  // Streak ve puan simülasyonu
  const [streak, setStreak] = useState<number>(4); // örnek mevcut seri
  const [totalCheckins, setTotalCheckins] = useState<number>(checkedDays.length);
  const [monthlyPoints, setMonthlyPoints] = useState<number>(checkedDays.length * 10);

  const thisMonthDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0: Pazar
    const days = getDaysInMonth(viewYear, viewMonth);
    // Takvimi pazartesi başlangıçlı göstermek için index düzeltmesi
    const padStart = (firstDay + 6) % 7;
    return { days, padStart };
  }, [viewYear, viewMonth]);

  const isTodayInView =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const isTodayChecked =
    isTodayInView && checkedDays.includes(today.getDate());

  const handleCheckIn = () => {
    if (!isTodayInView) {
      alert("Bugün görünür ayda değil. ‘Bugüne dön’ düğmesini kullanın.");
      return;
    }
    if (isTodayChecked) {
      alert("Bugünün check-in’i zaten yapılmış. ✅");
      return;
    }
    const d = today.getDate();

    setCheckedDays((prev) => [...prev, d].sort((a, b) => a - b));
    setTotalCheckins((c) => c + 1);
    setMonthlyPoints((p) => p + 10);

    // Sade seri hesabı: önceki gün yapıldıysa +1; yoksa 1’e reset
    const yesterday = d - 1;
    setStreak((s) => (checkedDays.includes(yesterday) ? s + 1 : 1));

    alert("Check-in başarılı! +10 Puan 🎉");
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

  // Ödül kademeleri (örnek)
  const tiers = [
    { day: 3,   label: "3 Gün",   bonus: "+20", reached: streak >= 3 },
    { day: 7,   label: "7 Gün",   bonus: "+50", reached: streak >= 7 },
    { day: 14,  label: "14 Gün",  bonus: "+120",reached: streak >= 14 },
    { day: 30,  label: "30 Gün",  bonus: "+300",reached: streak >= 30 },
  ];

  const nextTier = tiers.find((t) => !t.reached);
  const currentProgressPercent = nextTier
    ? Math.min((streak / nextTier.day) * 100, 100)
    : 100;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            Daily Check-In
          </h1>

          {/* Back to Dashboard */}
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
          {/* Üst İstatistik Kartları */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Günlük Seri (Streak)</p>
                  <p className="text-3xl font-semibold">{streak}</p>
                </div>
                <Flame className="w-7 h-7 text-amber-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Bu Ay Check-in</p>
                  <p className="text-3xl font-semibold">{totalCheckins}</p>
                </div>
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Bugünün Durumu</p>
                  <p className={`text-2xl font-semibold ${isTodayChecked ? "text-emerald-300" : "text-white"}`}>
                    {isTodayChecked ? "Yapıldı" : "Bekliyor"}
                  </p>
                </div>
                <Clock className="w-7 h-7 text-sky-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Aylık Puan</p>
                  <p className="text-3xl font-semibold">{monthlyPoints}</p>
                </div>
                <Trophy className="w-7 h-7 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Check-in CTA + Seri İlerleme */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sol: CTA Kartı */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Bugünkü Check-In</h2>
                  <p className="text-white/70 text-sm">
                    Her gün giriş yap, serini koru. Uzayan seriler ek bonuslar kazandırır.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCheckIn}
                    disabled={isTodayChecked}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition ${
                      isTodayChecked
                        ? "border border-white/15 text-white/60 bg-white/5 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isTodayChecked ? "Bugün Yapıldı" : "Check-In Yap"}
                  </button>

                  {!isTodayInView && (
                    <button
                      onClick={goToToday}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      Bugüne Dön
                    </button>
                  )}
                </div>
              </div>

              {/* Seri ilerleme çubuğu */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-white/70 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-300" />
                    Sıradaki ödül:
                    {nextTier ? (
                      <span className="text-white">
                        {nextTier.label} seride <span className="text-emerald-300">{nextTier.bonus} puan</span>
                      </span>
                    ) : (
                      <span className="text-emerald-300">Maks ödüllere ulaşıldı</span>
                    )}
                  </div>
                  <div className="text-sm text-white/70">Seri: {streak} gün</div>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
                    style={{ width: `${currentProgressPercent}%` }}
                  />
                </div>

                {/* Ödül kademeleri */}
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

            {/* Sağ: Bilgi Kartı */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-semibold">İpucu</h3>
              </div>
              <p className="text-white/70 text-sm">
                Check-in’i **her gün aynı saatlerde** yapmak seriyi korumayı kolaylaştırır.
                Uzun seriler dönemsel bonuslar ve özel rozetler kazandırır.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  7 gün seride +50 puan bonus
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  14 gün seride özel rozet
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  30 gün seride **büyük ödül**
                </li>
              </ul>
            </div>
          </div>

          {/* Takvim */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  {monthNames[viewMonth]} {viewYear}
                </h2>
                {!isTodayInView && (
                  <button
                    onClick={goToToday}
                    className="text-xs px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Bugüne Dön
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrevMonth}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                >
                  Önceki
                </button>
                <button
                  onClick={goNextMonth}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                >
                  Sonraki
                </button>
              </div>
            </div>

            {/* Haftalık başlıklar */}
            <div className="grid grid-cols-7 text-center text-xs text-white/60 mb-2">
              <div>Pzt</div>
              <div>Sal</div>
              <div>Çar</div>
              <div>Per</div>
              <div>Cum</div>
              <div>Cmt</div>
              <div>Paz</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Başlangıç boşlukları */}
              {Array.from({ length: thisMonthDays.padStart }).map((_, i) => (
                <div key={`pad-${i}`} className="h-12 rounded-lg bg-white/0 border border-transparent" />
              ))}

              {/* Günler */}
              {Array.from({ length: thisMonthDays.days }).map((_, i) => {
                const day = i + 1;
                const isChecked = checkedDays.includes(day);
                const isToday = isTodayInView && day === today.getDate();

                return (
                  <div
                    key={day}
                    className={`h-12 rounded-lg border grid place-items-center relative
                      ${isChecked ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"}
                      ${isToday ? "ring-2 ring-emerald-400" : ""}`}
                  >
                    <span className="text-sm">{day}</span>
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
