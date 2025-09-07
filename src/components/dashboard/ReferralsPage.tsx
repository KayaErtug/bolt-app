// File: src/components/dashboard/ReferralsPage.tsx
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

import { auth, db } from "../../lib/firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

/* -------------------------------------------------------------------------- */
/*                                Type Definitions                            */
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
  invitedCount?: number;
  activeReferrals?: number;
  points?: number;
  pendingRewards?: number;
}

/* -------------------------------------------------------------------------- */
/*                                 Helpers                                     */
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
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} wk ago`;
  const months = Math.floor(days / 30);
  return `${months} mo ago`;
};

const shareTargets = (
  url: string,
  text = "Join Maris — let's earn points together!"
) => ({
  telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    text
  )}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    url
  )}`,
  email: `mailto:?subject=${encodeURIComponent(
    "Join Maris"
  )}&body=${encodeURIComponent(`${text}\n${url}`)}`,
});

/* -------------------------------------------------------------------------- */
/*                                 Reward Tiers                                */
/* -------------------------------------------------------------------------- */
const REWARD_TIERS = [
  { threshold: 2, label: "10,000 points", icon: Trophy },
  { threshold: 50, label: "Exclusive NFT", icon: Award },
  { threshold: 100, label: "Whitelist Access", icon: Gift },
];

/* -------------------------------------------------------------------------- */
/*                                 Main Component                              */
/* -------------------------------------------------------------------------- */
const ReferralsPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  const [invites, setInvites] = useState<InviteDoc[]>([]);
  const [leaderboard, setLeaderboard] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  /* --------------------------- Auth Listener --------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  /* --------------------------- User Doc Fetch --------------------------- */
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const uref = doc(db, "users", currentUser.uid);
    const unsubUser = onSnapshot(uref, async (snap) => {
      let data = snap.exists() ? (snap.data() as UserDoc) : null;

      if (!snap.exists()) {
        data = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "User",
          avatarUrl: currentUser.photoURL || undefined,
          invitedCount: 0,
          activeReferrals: 0,
          points: 0,
          pendingRewards: 0,
          referralCode: currentUser.uid,
        };
        await setDoc(uref, data, { merge: true });
      }

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

  /* --------------------------- Invites Fetch --------------------------- */
  useEffect(() => {
    if (!currentUser) return;
    const qInv = query(
      collection(db, "invites"),
      where("referrerId", "==", currentUser.uid)
    );
    const unsubInv = onSnapshot(qInv, (snap) => {
      const arr: InviteDoc[] = [];
      snap.forEach((d) =>
        arr.push({ id: d.id, ...(d.data() as Omit<InviteDoc, "id">) })
      );
      // Client-side sorting by joinedAt descending
      arr.sort((a, b) => {
        const da = toDate(a.joinedAt)?.getTime() || 0;
        const db = toDate(b.joinedAt)?.getTime() || 0;
        return db - da;
      });
      setInvites(arr.slice(0, 20)); // limit 20
    });
    return () => unsubInv();
  }, [currentUser]);

  /* --------------------------- Leaderboard --------------------------- */
  useEffect(() => {
    const qTop = query(collection(db, "users"));
    const unsubLb = onSnapshot(qTop, (snap) => {
      const arr: UserDoc[] = [];
      snap.forEach((d) => arr.push(d.data() as UserDoc));
      // Client-side sorting by activeReferrals descending
      arr.sort((a, b) => (b.activeReferrals || 0) - (a.activeReferrals || 0));
      setLeaderboard(arr.slice(0, 10)); // limit 10
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
      setToast("Copied ✅");
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast("Could not copy. Please copy manually.");
      setTimeout(() => setToast(null), 2200);
    }
  };

  const stats = useMemo(() => {
    const total = userDoc?.invitedCount ?? invites.length;
    const active =
      userDoc?.activeReferrals ??
      invites.filter((i) => i.status === "active").length;
    const points = userDoc?.points ?? 0;
    const pending = userDoc?.pendingRewards ?? 0;
    return [
      { label: "Total Invites", value: total.toString(), Icon: Users },
      { label: "Active Friends", value: active.toString(), Icon: UserPlus },
      { label: "Points Earned", value: points.toLocaleString("en-US"), Icon: Trophy },
      { label: "Pending Rewards", value: pending.toLocaleString("en-US"), Icon: Gift },
    ];
  }, [userDoc, invites]);

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
      <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center w-full max-w-sm">
          <p className="text-lg font-semibold mb-2">Sign-in required</p>
          <p className="text-white/70 mb-4">
            Sign in to see your invite link and track your statistics.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            Sign In <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* --------------------------- Render --------------------------- */
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="flex flex-col flex-1">
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

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 space-y-6">
          {/* Invite Box */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-white/70">Your Invite Code</div>
              <div className="mt-1 text-2xl font-semibold tracking-wide">
                {loading ? "—" : referralCode}
              </div>
              <div className="mt-2 text-sm text-white/60">
                Share the code or send the direct link. Only <b>activated</b> users earn you points.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleCopy(referralUrl)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 w-full sm:w-auto"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </button>

              {"share" in navigator ? (
                <button
                  onClick={() =>
                    (navigator as any).share({
                      title: "Join Maris",
                      text: "Join Maris — let's earn points together!",
                      url: referralUrl,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium hover:opacity-90 w-full sm:w-auto"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <a
                    href={shareLinks.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium hover:opacity-90 w-full sm:w-auto"
                  >
                    Telegram
                  </a>
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20 w-full sm:w-auto"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={shareLinks.x}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20 w-full sm:w-auto"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href={shareLinks.email}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20 w-full sm:w-auto"
                  >
                    Email
                  </a>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm flex items-center justify-between break-words">
              <span className="truncate">{referralUrl}</span>
              <button
                onClick={() => handleCopy(referralUrl)}
                className="ml-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{label}</p>
                    <p className="text-3xl font-semibold break-words">{value}</p>
                  </div>
                  <Icon className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Reward Progress */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-emerald-400" />
                Reward Progress
              </h2>
              <div className="text-sm text-white/70">
                Active invites:{" "}
                <span className="text-emerald-300 font-medium">{activeCount}</span>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${progressToNext}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
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
                        <div className="font-medium break-words">
                          {t.threshold} invites → {t.label}
                        </div>
                        <div className="text-white/70">{reached ? "Unlocked 🎉" : "Keep going"}</div>
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
              Points are awarded only after the invitee becomes <b>active</b> following sign-up.
            </div>
          </div>

          {/* Leaderboard */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md overflow-x-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                Leaderboard (Top 10)
              </h2>
            </div>

            <table className="min-w-full text-sm table-auto md:table-fixed">
              <thead>
                <tr className="text-left text-white/70 border-b border-white/10">
                  <th className="py-2 pr-3">Rank</th>
                  <th className="py-2 pr-3">User</th>
                  <th className="py-2 pr-3">Active Invites</th>
                  <th className="py-2 pr-3">Points</th>
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
                      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <div className="h-8 w-8 rounded-full bg-white/10 overflow-hidden grid place-items-center flex-shrink-0">
                          {u.avatarUrl ? (
                            <img
                              src={u.avatarUrl}
                              alt={u.displayName || "user"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                        </div>
                        <div className="font-medium break-words">{u.displayName || "User"}</div>
                      </div>
                    </td>
                    <td className="py-2 pr-3">{u.activeReferrals?.toLocaleString("en-US") ?? 0}</td>
                    <td className="py-2 pr-3">{u.points?.toLocaleString("en-US") ?? 0}</td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr>
                    <td className="py-3 text-white/60" colSpan={4}>
                      No data yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Recent Joins */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Recent Joins
              </h2>
              <div className="text-sm text-white/70 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Monthly growth:{" "}
                <span className="text-emerald-300">
                  {(() => {
                    const total = (userDoc?.invitedCount ?? invites.length) || 1;
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
                    ? "Active"
                    : r.status === "pending"
                    ? "Pending"
                    : "Inactive";
                const joined = formatRelative(toDate(r.joinedAt));
                return (
                  <div key={r.id} className="flex items-center justify-between py-3 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-white/10 overflow-hidden grid place-items-center flex-shrink-0">
                        {r.inviteeAvatar ? (
                          <img
                            src={r.inviteeAvatar}
                            alt={r.inviteeName || "user"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{r.inviteeName || r.inviteeId || "New user"}</div>
                        <div className="text-sm text-white/60 truncate">{joined}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2 sm:mt-0">
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
                  No one has joined yet. Share your invite link to get started.
                </div>
              )}
            </div>
          </div>

          {/* How it Works + FAQ */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-emerald-400" />
              How it Works & FAQ
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                1) Share your invite link. The user signs up.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                2) The user completes the onboarding tasks and becomes <b>active</b>.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                3) Points update instantly, and periodic rewards are distributed automatically.
              </li>
            </ul>

            <div className="divide-y divide-white/10">
              {[
                {
                  q: "When does my invite count?",
                  a: "After the invited user signs up and completes the required onboarding tasks to become active.",
                },
                {
                  q: "When are rewards granted?",
                  a: "Once you hit a milestone, points are added instantly; special rewards like NFTs and whitelist access are assigned to your wallet during scheduled distribution windows.",
                },
                {
                  q: "Do inactive users earn me points?",
                  a: "No. Only users who become active award points.",
                },
                {
                  q: "Spam or fake accounts?",
                  a: "The system detects abnormal activity, invalidates suspicious invites, and may restrict accounts when necessary.",
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
