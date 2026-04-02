"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard";
import { Wallet, Flame, Receipt, Gift } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [streak, setStreak] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [balanceHistory, setBalanceHistory] = useState<number[]>([]);

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    const savedStreak = localStorage.getItem("streak");
    const savedTx = localStorage.getItem("transactions");
    const savedLastClaim = localStorage.getItem("lastClaim");
    const savedHistory = localStorage.getItem("balanceHistory");

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedTx) setTransactions(JSON.parse(savedTx));
    if (savedHistory) setBalanceHistory(JSON.parse(savedHistory));

    if (savedLastClaim) {
      const today = new Date().toDateString();
      const last = new Date(savedLastClaim).toDateString();
      if (today === last) setClaimedToday(true);
    }
  }, []);

  const handleQuickClaim = () => {
    if (claimedToday) return;

    const now = new Date().toISOString();
    const today = new Date().toDateString();
    const savedLastClaim = localStorage.getItem("lastClaim");

    if (savedLastClaim) {
      const last = new Date(savedLastClaim).toDateString();
      const diff = Date.now() - new Date(savedLastClaim).getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (today === last) return;

      if (diff < oneDay * 2) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", newStreak.toString());
      } else {
        setStreak(1);
        localStorage.setItem("streak", "1");
      }
    } else {
      setStreak(1);
      localStorage.setItem("streak", "1");
    }

    localStorage.setItem("lastClaim", now);
    setClaimedToday(true);

    const newBalance = balance + 1;
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());

    const tx = {
      type: "Daily Reward (Quick Claim)",
      amount: 1,
      date: new Date().toLocaleString(),
    };

    const updatedTx = [tx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem("transactions", JSON.stringify(updatedTx));

    const newHistory = [...balanceHistory, newBalance];
    setBalanceHistory(newHistory);
    localStorage.setItem("balanceHistory", JSON.stringify(newHistory));
  };

  const chartData = {
    labels: balanceHistory.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Balance Over Time",
        data: balanceHistory,
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.2)",
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#22d3ee",
      },
    ],
  };

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 w-full p-10 text-white">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Quick Claim Button */}
          <button
            onClick={handleQuickClaim}
            disabled={claimedToday}
            className={`mb-8 flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition ${
              claimedToday
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 text-black"
            }`}
          >
            <Gift size={22} />
            {claimedToday ? "Reward Already Claimed Today" : "Quick Claim Reward"}
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="bg-[#111] border border-[#333] p-6 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-gray-400 text-sm">Wallet Balance</h2>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  {balance} USDT
                </p>
              </div>
              <Wallet className="text-cyan-400" size={40} />
            </div>

            <div className="bg-[#111] border border-[#333] p-6 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-gray-400 text-sm">Daily Streak</h2>
                <p className="text-3xl font-bold text-yellow-400 mt-2">
                  {streak} Days
                </p>
              </div>
              <Flame className="text-yellow-400" size={40} />
            </div>

            <div className="bg-[#111] border border-[#333] p-6 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-gray-400 text-sm">Total Transactions</h2>
                <p className="text-3xl font-bold text-green-400 mt-2">
                  {transactions.length}
                </p>
              </div>
              <Receipt className="text-green-400" size={40} />
            </div>

          </div>

          {/* Chart Section */}
          <div className="bg-[#111] border border-[#333] p-6 rounded-lg mb-10 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Balance Chart</h2>
            {balanceHistory.length === 0 ? (
              <p className="text-gray-400">No data yet. Claim rewards to build history.</p>
            ) : (
              <Line data={chartData} />
            )}
          </div>

          {/* Latest Transactions */}
          <div className="bg-[#111] border border-[#333] p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-400">No transactions yet.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-[#333]">
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 3).map((t, index) => (
                    <tr key={index} className="border-b border-[#222]">
                      <td className="py-2">{t.type}</td>
                      <td
                        className={`py-2 ${
                          t.amount > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {t.amount} USDT
                      </td>
                      <td className="py-2 text-gray-400">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </AuthGuard>
  );
}
