// Dosya: src/components/dashboard/ReferralsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
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
  Info,
  HelpCircle,
  Award,
  ExternalLink,
} from "lucide-react";

// ▶️ Kendi projenin yoluna göre güncelle:
import { auth, db } from "../../lib/firebase"; // örn: src/lib/firebase.ts
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

/* -------------------------------------------------------------------------- */
/*                                Tür Tanımları                                */
/* -------------------------------------------------------------------------- */
type InviteStatus = "pending" | "active" | "inactive";

interface InviteDoc {
  id: string;
  referrerId: string;
  inviteeId?: string;
  inviteeName?: string;
  inviteeAvatar?: string;
  status: InviteStatus;
  joinedAt?: { seconds: number; nanoseconds: number } | Date;
}

interface UserDoc {
  uid: string;
  displayName?: string;
  avatarUrl?: string;
  referralCode?: string;
  invitedCount?: number; // toplam davet edilen (status bağımsız)
  activeReferrals?: number; // aktifleşmiş davet sayısı
  points?: number; // kazanılan puan
  pendingRewards?: number; // bekleyen ödül
}

/* -------------------------------------------------------------------------- */
/*                              Yardımcı Fonksiyonlar                          */
/* -------------------------------------------------------------------------- */
const makeReferralUrl = (code: string) =>
  `${window.location.origin}/register?ref=${encodeURIComponent(code)}`;

const toDate = (d?: any): Date | null => {
  if (!d) return null;
  if (d instanceof Date) return d;
  if (typeof d?.seconds === "number") return new Date(d.seconds * 1000);
  return null;
};

const formatRelative = (date: Date | null): string => {
  if (!date) return "-";
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (60 * 1000));
  if (minutes < 60) return `${minutes} dk önce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} sa önce`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} gün önce`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} hf önce`;
  const months = Math.floor(days / 30);
  return `${months} ay önce`;
};

const shareTargets = (
  url: string,
  text = "Maris'e katıl, birlikte puan kazanalım!"
) => ({
  telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    text
  )}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    url
  )}`,
  email: `mailto:?subject=${encodeURIComponent(
    "Maris'e Katıl"
  )}&body=${encodeURIComponent(`${text}\n${url}`)}`,
});

/* -------------------------------------------------------------------------- */
/*                               Ödül Milestone'ları                           */
/* -------------------------------------------------------------------------- */
// Aktif referans sayısına göre milestone örnekleri:
const REWARD_TIERS = [
  { threshold: 2, label: "10.000 puan", icon: Trophy },
  { threshold: 50, label: "Özel NFT", icon: Award },
  { threshold: 100, label: "Whitelist Hakkı", icon: Gift },
];

/* -------------------------------------------------------------------------- */
/*                                 Ana Bileşen                                 */
/* -------------------------------------------------------------------------- */
const ReferralsPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  const [invites, setInvites] = useState<InviteDoc[]>([]);
  const [leaderboard, setLeaderboard] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Auth dinleme
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Kullanıcı doc + referralCode oluştur/oku
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const uref = doc(db, "users", currentUser.uid);
    const unsubUser = onSnapshot(uref, async (snap) => {
      let data = snap.exists() ? (snap.data() as UserDoc) : null;

      // yoksa başlangıç dokümanı oluştur
      if (!snap.exists()) {
        data = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Kullanıcı",
          avatarUrl: currentUser.photoURL || undefined,
          invitedCount: 0,
          activeReferrals: 0,
          points: 0,
          pendingRewards: 0,
          referralCode: currentUser.uid, // varsayılan: uid
        };
        await setDoc(uref, data, { merge: true });
      }

      // referralCode yoksa yaz
      if (data && !data.referralCode) {
        const code = currentUser.uid;
        await updateDoc(uref, { referralCode: code });
        data.referralCode = code;
      }

      setUserDoc(data);
      setReferralCode(data?.referralCode || currentUser.uid);
      setLoading(false);
    });

    return () => unsubUser();
  }, [currentUser]);

  // Davetler (bu kullanıcının referansları)
  useEffect(() => {
    if (!currentUser) return;
    const qInv = query(
      collection(db, "invites"),
      where("referrerId", "==", currentUser.uid),
      orderBy("joinedAt", "desc"),
      limit(20)
    );
    const unsubInv = onSnapshot(qInv, (snap) => {
      const arr: InviteDoc[] = [];
      snap.forEach((d) =>
        arr.push({ id: d.id, ...(d.data() as Omit<InviteDoc, "id">) })
      );
      setInvites(arr);
    });
    return () => unsubInv();
  }, [currentUser]);

  // Leaderboard (ilk 10)
  useEffect(() => {
    const qTop = query(
      collection(db, "users"),
      orderBy("activeReferrals", "desc"),
      limit(10)
    );
    const unsubLb = onSnapshot(qTop, (snap) => {
      const arr: UserDoc[] = [];
      snap.forEach((d) => arr.push(d.data() as UserDoc));
      setLeaderboard(arr);
    });
    return () => unsubLb();
  }, []);

  const referralUrl = useMemo(
    () => makeReferralUrl(referralCode || "MARIS"),
    [referralCode]
  );

  const shareLinks = useMemo(() => shareTargets(referralUrl), [referralUrl]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Kopyalandı ✅");
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast("Kopyalanamadı. Lütfen elle kopyalayın.");
      setTimeout(() => setToast(null), 2200);
    }
  };

  // Stats (kullanıcı doc + invites üzerinden)
  const stats = useMemo(() => {
    const total = userDoc?.invitedCount ?? invites.length;
    const active =
      userDoc?.activeReferrals ??
      invites.filter((i) => i.status === "active").length;
    const points = userDoc?.points ?? 0;
    const pending = userDoc?.pendingRewards ?? 0;
    return [
      { label: "Toplam Davet", value: total.toString(), Icon: Users },
      { label: "Aktif Arkadaş", value: active.toString(), Icon: UserPlus },
      { label: "Kazanılan Puan", value: points.toLocaleString(), Icon: Trophy },
      { label: "Bekleyen Ödül", value: pending.toLocaleString(), Icon: Gift },
    ];
  }, [userDoc, invites]);

  // Ödül ilerleme – aktif referans bazlı
  const activeCount =
    userDoc?.activeReferrals ??
    invites.filter((i) => i.status === "active").length;
  const nextTier = REWARD_TIERS.find((t) => activeCount < t.threshold);
  const progressToNext =
    nextTier?.threshold != null
      ? Math.min(100, Math.floor((activeCount / nextTier.threshold) * 100))
      : 100;

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-lg font-semibold mb-2">Giriş gerekli</p>
          <p className="text-white/70 mb-4">
            Davet bağlantını görmek ve istatistiklerini takip etmek için
            hesabına giriş yap.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            Giriş Yap <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5 text-emerald-400" />
            Referrals
          </h1>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </header>

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 top-4 z-20 -translate-x-1/2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            {toast}
          </div>
        )}

        {/* Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 space-y-6">
          {/* Referans Kutusu */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-white/70">Davet Kodun</div>
                <div className="mt-1 text-2xl font-semibold tracking-wide">
                  {loading ? "—" : referralCode}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  Kodu paylaş ya da direkt linki gönder. Sadece{" "}
                  <b>aktifleşen</b> kullanıcılar puan kazandırır.
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

                {/* Web Share API (destek varsa) */}
                {"share" in navigator ? (
                  <button
                    onClick={() =>
                      (navigator as any).share({
                        title: "Maris'e katıl",
                        text: "Maris'e katıl, birlikte puan kazanalım!",
                        url: referralUrl,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium hover:opacity-90"
                  >
                    <Share2 className="h-4 w-4" />
                    Paylaş
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={shareLinks.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium hover:opacity-90"
                    >
                      Telegram
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={shareLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                    >
                      X (Twitter)
                    </a>
                    <a
                      href={shareLinks.email}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                    >
                      E-posta
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Davet Linki Alanı */}
            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm flex items-center justify-between">
              <span className="truncate">{referralUrl}</span>
              <button
                onClick={() => handleCopy(referralUrl)}
                className="ml-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20"
              >
                <Copy className="h-4 w-4" />
                Kopyala
              </button>
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

          {/* Ödül İlerlemesi */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-emerald-400" />
                Ödül İlerlemesi
              </h2>
              <div className="text-sm text-white/70">
                Aktif davet:{" "}
                <span className="text-emerald-300 font-medium">
                  {activeCount}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${progressToNext}%` }}
              />
            </div>

            <div className="mt-3 grid md:grid-cols-3 gap-3">
              {REWARD_TIERS.map((t) => {
                const reached = activeCount >= t.threshold;
                const Icon = t.icon;
                return (
                  <div
                    key={t.threshold}
                    className={`rounded-xl border p-4 text-sm ${
                      reached
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : "border-white/10 bg-black/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          {t.threshold} davet → {t.label}
                        </div>
                        <div className="text-white/70">
                          {reached ? "Kilit açıldı 🎉" : "Devam et"}
                        </div>
                      </div>
                      <Icon
                        className={`h-5 w-5 ${
                          reached ? "text-emerald-400" : "text-white/60"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
              <Info className="h-4 w-4" />
              Puan sadece davet edilen kişi kayıt olduktan sonra{" "}
              <b>aktif</b> hale gelirse kazanılır.
            </div>
          </div>

          {/* Liderlik Tablosu */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                Liderlik Tablosu (Top 10)
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-white/70 border-b border-white/10">
                    <th className="py-2 pr-3">Sıra</th>
                    <th className="py-2 pr-3">Kullanıcı</th>
                    <th className="py-2 pr-3">Aktif Davet</th>
                    <th className="py-2 pr-3">Puan</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((u, idx) => (
                    <tr
                      key={u.uid}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-2 pr-3">{idx + 1}</td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white/10 overflow-hidden grid place-items-center">
                            {u.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={u.avatarUrl}
                                alt={u.displayName || "user"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Users className="h-4 w-4" />
                            )}
                          </div>
                          <div className="font-medium">
                            {u.displayName || "Kullanıcı"}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 pr-3">
                        {u.activeReferrals?.toLocaleString() ?? 0}
                      </td>
                      <td className="py-2 pr-3">
                        {u.points?.toLocaleString() ?? 0}
                      </td>
                    </tr>
                  ))}
                  {leaderboard.length === 0 && (
                    <tr>
                      <td className="py-3 text-white/60" colSpan={4}>
                        Henüz veri yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Son Katılanlar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Son Katılanlar
              </h2>
              <div className="text-sm text-white/70 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Aylık artış:{" "}
                <span className="text-emerald-300">
                  {/* örnek hesaplama: aktif / toplam */}
                  {(() => {
                    const total =
                      (userDoc?.invitedCount ?? invites.length) || 1;
                    const active = activeCount || 0;
                    const rate = Math.min(100, Math.round((active / total) * 100));
                    return `+${rate}%`;
                  })()}
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {invites.slice(0, 8).map((r) => {
                const statusText =
                  r.status === "active"
                    ? "Aktif"
                    : r.status === "pending"
                    ? "Bekliyor"
                    : "Pasif";
                const joined = formatRelative(toDate(r.joinedAt));
                return (
                  <div key={r.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white/10 overflow-hidden grid place-items-center">
                        {r.inviteeAvatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={r.inviteeAvatar}
                            alt={r.inviteeName || "user"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {r.inviteeName || r.inviteeId || "Yeni kullanıcı"}
                        </div>
                        <div className="text-sm text-white/60">{joined}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          r.status === "active"
                            ? "text-emerald-400"
                            : r.status === "pending"
                            ? "text-amber-300"
                            : "text-white/60"
                        }`}
                      />
                      <span
                        className={
                          r.status === "active"
                            ? "text-emerald-300"
                            : r.status === "pending"
                            ? "text-amber-300"
                            : "text-white/60"
                        }
                      >
                        {statusText}
                      </span>
                    </div>
                  </div>
                );
              })}
              {invites.length === 0 && (
                <div className="py-4 text-sm text-white/60">
                  Henüz katılan yok. Davet linkini paylaşarak başlayabilirsin.
                </div>
              )}
            </div>
          </div>

          {/* Nasıl Çalışır + SSS */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-emerald-400" />
              Nasıl Çalışır & SSS
            </h2>

            {/* Nasıl Çalışır */}
            <ul className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                1) Davet linkini paylaş. Kullanıcı kayıt olsun.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                2) Kullanıcı görevleri tamamlayıp <b>aktif</b> hale gelsin.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                3) Puanlar anlık güncellenir, dönemsel ödüller otomatik eklenir.
              </li>
            </ul>

            {/* FAQ */}
            <div className="divide-y divide-white/10">
              {[
                {
                  q: "Davetim ne zaman geçerli sayılır?",
                  a: "Davet ettiğin kişi kayıt olduktan sonra zorunlu başlangıç görevlerini tamamlayıp aktifleştiğinde geçerli sayılır.",
                },
                {
                  q: "Ödüller ne zaman verilir?",
                  a: "Milestone’a ulaştığında puanın anında eklenir; NFT ve whitelist gibi özel ödüller dönemsel dağıtım pencerelerinde cüzdanına atanır.",
                },
                {
                  q: "Pasif kullanıcılar puan kazandırır mı?",
                  a: "Hayır. Sadece aktifleşen kullanıcılar puan kazandırır.",
                },
                {
                  q: "Spam veya sahte hesaplar?",
                  a: "Sistem anormal aktiviteleri tespit ederek ilgili davetleri geçersiz sayar ve gerektiğinde hesabı kısıtlar.",
                },
              ].map((item, idx) => (
                <details key={idx} className="py-3 group">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-emerald-400" />
                      {item.q}
                    </span>
                    <span className="text-white/50 group-open:rotate-180 transition">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-white/70">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReferralsPage;
