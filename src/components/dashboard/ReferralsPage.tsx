// Dosya: src/components/dashboard/ReferralsPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Share2,
  Users,
  Gift,
  Trophy,
  CheckCircle2,
  Copy,
  TrendingUp,
  UserPlus,
} from "lucide-react";

const ReferralsPage: React.FC = () => {
  const referralCode = "MARIS-3F9K-72A1";
  const referralUrl = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // basit bir toast yerine alert (frameworksüz)
      alert("Kopyalandı ✅");
    } catch {
      alert("Kopyalanamadı, lütfen elle kopyalayın.");
    }
  };

  const stats = [
    { label: "Toplam Davet", value: "128", Icon: Users },
    { label: "Aktif Arkadaş", value: "76", Icon: UserPlus },
    { label: "Kazanılan Puan", value: "12,450", Icon: Trophy },
    { label: "Bekleyen Ödül", value: "1,120", Icon: Gift },
  ];

  const tiers = [
    {
      title: "Seviye 1",
      desc: "Doğrudan davet ettiklerin",
      rate: "10%",
      progress: 76,
    },
    {
      title: "Seviye 2",
      desc: "Davet ettiklerinin davet ettikleri",
      rate: "5%",
      progress: 44,
    },
    {
      title: "Seviye 3",
      desc: "Geniş ağdan gelenler",
      rate: "2%",
      progress: 21,
    },
  ];

  const recent = [
    { name: "Aylin K.", joined: "2 gün önce", status: "Aktif" },
    { name: "Göktuğ A.", joined: "4 gün önce", status: "Aktif" },
    { name: "Yasemin Ş.", joined: "1 hafta önce", status: "Bekliyor" },
    { name: "Deniz R.", joined: "2 hafta önce", status: "Pasif" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5 text-emerald-400" />
            Referrals
          </h1>

          {/* Dashboard’a dön butonu */}
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
          {/* Referans kutusu */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-white/70">Davet Kodun</div>
                <div className="mt-1 text-2xl font-semibold tracking-wide">
                  {referralCode}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  Kodu paylaş ya da direkt linki gönder. Her aktif kullanıcı için
                  ödül kazan.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleCopy(referralUrl)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                >
                  <Copy className="h-4 w-4" />
                  Linki Kopyala
                </button>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    referralUrl
                  )}&text=${encodeURIComponent(
                    "Maris Coin’e katıl, birlikte puan kazanalım!"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  <Share2 className="h-4 w-4" />
                  Telegram’da Paylaş
                </a>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{label}</p>
                    <p className="text-3xl font-semibold">{value}</p>
                  </div>
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Seviyeler */}
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold">{t.title}</h3>
                    <p className="text-sm text-white/70">{t.desc}</p>
                  </div>
                  <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {t.rate}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                    <span>İlerleme</span>
                    <span className="text-emerald-300 font-medium">
                      {t.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      style={{ width: `${t.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Son katılanlar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Son Katılanlar
              </h2>
              <div className="text-sm text-white/70 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Aylık artış: <span className="text-emerald-300">+18%</span>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {recent.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-white/60">{r.joined}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span
                      className={
                        r.status === "Aktif"
                          ? "text-emerald-300"
                          : r.status === "Bekliyor"
                          ? "text-amber-300"
                          : "text-white/60"
                      }
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nasıl çalışır */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-emerald-400" />
              Ödül Sistemi
            </h2>
            <ul className="grid md:grid-cols-3 gap-4 text-sm">
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                1) Davet linkini paylaş. Kullanıcı kayıt olsun.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                2) Kullanıcı belirli görevleri tamamlayıp aktif hale gelsin.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                3) Aşamalar tamamlandıkça puanın **anlık** yazılır, dönemsel
                ödüller otomatik eklenir.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReferralsPage;
