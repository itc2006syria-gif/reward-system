"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function ReferralPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);

    fetch("/api/referrals/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.referrals) setReferrals(data.referrals);
      });
  }, []);

  if (!user) return null;

  const referralLink = `https://your-domain.com/register?ref=${user.referralCode}`;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Referral Program
          </h1>

          <p className="text-gray-400 max-w-xl">
            Share your referral link and earn rewards when people register using your code.
          </p>

          {/* Referral Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-xl">

            <div>
              <p className="text-gray-400 text-sm mb-1">Your Referral Code</p>
              <input
                readOnly
                value={user.referralCode}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm"
              />
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">Your Referral Link</p>
              <input
                readOnly
                value={referralLink}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm"
              />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                alert("Referral link copied!");
              }}
              className="mt-2 py-2 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition text-sm font-semibold"
            >
              Copy Link
            </button>
          </div>

          {/* Referral List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Referrals</h2>

            {referrals.length === 0 ? (
              <p className="text-gray-400">No referrals yet.</p>
            ) : (
              <div className="space-y-3">
                {referrals.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-black/40 border border-white/10 p-4 rounded-xl"
                  >
                    <p>{r.email}</p>
                    <span className="text-green-400">Joined</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
