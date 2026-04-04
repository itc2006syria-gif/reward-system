"use client";

import { useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";
import { Gift } from "lucide-react";

export default function RewardsPage() {
  const [loading, setLoading] = useState(false);

  async function claimDaily() {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch("/api/rewards/daily", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
    } else {
      alert("Daily reward claimed!");
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Rewards
          </h1>

          <p className="text-gray-400">
            Claim your daily reward and check available bonuses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Daily Reward */}
            <RewardCard
              title="Daily Reward"
              amount="5 USDT"
              onClaim={claimDaily}
              loading={loading}
            />

            {/* Weekly Bonus */}
            <RewardCard
              title="Weekly Bonus"
              amount="20 USDT"
              disabled
            />

            {/* Referral Reward */}
            <RewardCard
              title="Referral Reward"
              amount="10 USDT"
              disabled
            />

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function RewardCard({ title, amount, onClaim, loading, disabled }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Gift className="text-purple-400" />
      </div>

      <p className="text-gray-300">Reward Amount: {amount}</p>

      <button
        disabled={disabled || loading}
        onClick={onClaim}
        className={`mt-2 py-2 rounded-xl text-sm font-semibold transition ${
          disabled
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
        }`}
      >
        {loading ? "Processing..." : disabled ? "Unavailable" : "Claim"}
      </button>
    </div>
  );
}
