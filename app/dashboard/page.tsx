"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "./Sidebar";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);

    setBalance(u.balance || 0);
    setPoints(u.points || 0);

    // Fetch referrals count
    fetch("/api/referrals/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.referrals) setReferrals(data.referrals.length);
      });

    // Fetch transactions count
    fetch("/api/wallet/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.transactions) setTransactions(data.transactions.length);
      });

    // Fetch notifications count
    fetch("/api/notifications/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) {
          const unread = data.notifications.filter((n: any) => !n.read);
          setNotifications(unread.length);
        }
      });
  }, []);

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar notifications={notifications} />

        <div className="flex-1 p-10 space-y-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Welcome, {user.name}
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Balance */}
            <StatCard
              title="Wallet Balance"
              value={`${balance} USDT`}
              color="from-green-500 to-green-300"
            />

            {/* Points */}
            <StatCard
              title="Reward Points"
              value={`${points} pts`}
              color="from-purple-500 to-purple-300"
            />

            {/* Referrals */}
            <StatCard
              title="Total Referrals"
              value={referrals}
              color="from-cyan-500 to-cyan-300"
            />

            {/* Transactions */}
            <StatCard
              title="Transactions"
              value={transactions}
              color="from-yellow-500 to-yellow-300"
            />

            {/* Notifications */}
            <StatCard
              title="Unread Notifications"
              value={notifications}
              color="from-red-500 to-red-300"
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-3xl font-bold mt-2 bg-gradient-to-r ${color} text-transparent bg-clip-text`}
      >
        {value}
      </h2>
    </div>
  );
}
