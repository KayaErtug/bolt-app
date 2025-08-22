// Dosya: src/components/dashboard/ReferralsPage.tsx

import React from "react";
import { Users, Share2, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type Referral = {
  id: string;
  name: string;
  joinedAt: string;
  bonus: number;
};

const referrals: Referral[] = [
  { id: "u1", name: "CryptoRider", joinedAt: "2h ago", bonus: 100 },
  { id: "u2", name: "DeFiQueen", joinedAt: "1d ago", bonus: 80 },
  { id: "u3", name: "NFT_Guru", joinedAt: "3d ago", bonus: 50 },
  { id: "u4", name: "Web3Samurai", joinedAt: "1w ago", bonus: 40 },
];

const ReferralsPage: React.FC = () => {
  const { user } = useAuth();

  const totalReferrals = referrals.length;
  const totalBonus = referrals.reduce((sum, r) => sum + r.bonus, 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/30 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold">Referrals</h1>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="text-sm">{user?.displayName ?? "Explorer"}</span>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-4xl flex-1 p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-transparent p-5 backdrop-blur-md">
              <p className="text-sm text-white/70">Total Referrals</p>
              <p className="mt-2 text-3xl font-semibold text-white">{totalReferrals}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-transparent p-5 backdrop-blur-md">
              <p className="text-sm text-white/70">Total Bonus</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-300">+{totalBonus} pts</p>
            </div>
          </div>

          {/* Referral List */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Referrals</h2>
              <TrendingUp className="h-5 w-5 text-white/70" />
            </div>

            <div className="grid gap-3">
              {referrals.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-emerald-500/30 to-indigo-500/30 border border-white/10">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-[11px] text-white/60">Joined {r.joinedAt}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-300">
                    +{r.bonus} pts
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Referral Code */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 p-5">
            <p className="text-sm text-white/80">Your Referral Code</p>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-sm font-mono tracking-wider text-emerald-300">
                MARIS-7X4Q
              </span>
              <button className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300 hover:bg-emerald-400/20">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReferralsPage;
