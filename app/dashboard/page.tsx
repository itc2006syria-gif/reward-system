"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/compon
ents/AuthGuard";

export default function DashboardPage() {
  const [notifications, setNotifications] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.email) return;

    // Fetch referrals
    fetch("/api/referrals/list", {
      method: "POST",
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => setReferrals(data.referrals?.length || 0));

    // Fetch notifications
    fetch("/api/notifications/list", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications?.length || 0));

    // Fetch transactions
    fetch("/api/wallet/transactions", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions?.length || 0));
  }, []);

  return (
    <AuthGuard>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Unread Notifications"
            value={notifications}
            color="from-red-500 to-red-300"
          />

          <StatCard
            title="Total Referrals"
            value={referrals}
            color="from-blue-500 to-blue-300"
          />

          <StatCard
            title="Transactions"
            value={transactions}
            color="from-green-500 to-green-300"
          />
        </div>
      </div>
    </AuthGuard>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-3xl font-bold mt-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
      >
        {value}
      </h2>
    </div>
  );
}
