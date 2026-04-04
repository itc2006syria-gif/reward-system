"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function WalletPage() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);
    setBalance(u.balance || 0);
  }, []);

  async function deposit() {
    if (!amount) return alert("Enter amount");

    setLoading(true);

    const res = await fetch("/api/wallet/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, amount: Number(amount) }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    setBalance(data.balance);

    // Update localStorage
    const updated = { ...user, balance: data.balance };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);

    alert("Deposit successful");
  }

  async function withdraw() {
    if (!amount) return alert("Enter amount");

    setLoading(true);

    const res = await fetch("/api/wallet/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, amount: Number(amount) }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    setBalance(data.balance);

    // Update localStorage
    const updated = { ...user, balance: data.balance };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);

    alert("Withdrawal successful");
  }

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Wallet
          </h1>

          {/* Balance Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md">
            <p className="text-gray-400 text-sm">Current Balance</p>
            <h2 className="text-4xl font-bold mt-2">{balance} USDT</h2>
          </div>

          {/* Deposit / Withdraw */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md space-y-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl outline-none focus:border-cyan-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={deposit}
              disabled={loading}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-400 hover:opacity-90 transition font-semibold"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>

            <button
              onClick={withdraw}
              disabled={loading}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-400 hover:opacity-90 transition font-semibold"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>

          {/* Link to Transactions */}
          <a
            href="/transactions"
            className="text-cyan-400 hover:underline text-sm"
          >
            View Transaction History →
          </a>
        </div>
      </div>
    </AuthGuard>
  );
}
