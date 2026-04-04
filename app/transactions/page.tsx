"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function TransactionsPage() {
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);

    fetch("/api/wallet/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.transactions) setTransactions(data.transactions);
      });
  }, []);

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Transaction History
          </h1>

          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions found.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold capitalize">{t.type}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(t.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p
                    className={
                      t.type === "withdraw"
                        ? "text-red-400 font-bold"
                        : "text-green-400 font-bold"
                    }
                  >
                    {t.type === "withdraw" ? "-" : "+"}
                    {t.amount} USDT
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
