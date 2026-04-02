"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard";
import { Gift } from "lucide-react";

export default function RewardsPage() {
  const [claimedToday, setClaimedToday] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [balance, setBalance] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    const savedStreak = localStorage.getItem("streak");
    const savedLastClaim = localStorage.getItem("lastClaim");

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedStreak) setStreak(parseInt(savedStreak));

    if (savedLastClaim) {
      const today = new Date().toDateString();
      const last = new Date(savedLastClaim).toDateString();
      if (today === last) setClaimedToday(true);
    }

    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateTimer = () => {
    const now = new Date();
    const midnight = new Date();

    midnight.setHours(24, 0, 0, 0);

    const diff = midnight.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft("00:00:00");
      setClaimedToday(false);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
  };

  const handleClaim = () => {
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
      type: "Daily Reward",
      amount: 1,
      date: new Date().toLocaleString(),
    };

    const savedTx = localStorage.getItem("transactions");
    const updatedTx = savedTx ? [tx, ...JSON.parse(savedTx)] : [tx];

    localStorage.setItem("transactions", JSON.stringify(updatedTx));
  };

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 w-full p-10 text-white">
          <h1 className="text-3xl font-bold mb-6">Daily Rewards</h1>

          <div className="bg-[#111] border border-[#333] p-8 rounded-lg max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Claim Your Daily Reward</h2>

            <p className="text-gray-400 mb-6">
              Claim once every 24 hours to increase your streak and earn USDT.
            </p>

            <button
              onClick={handleClaim}
              disabled={claimedToday}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition ${
                claimedToday
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black"
              }`}
            >
              <Gift size={22} />
              {claimedToday ? "Already Claimed Today" : "Claim Reward"}
            </button>

            {claimedToday && (
              <p className="text-gray-300 mt-4">
                Next claim available in:{" "}
                <span className="text-cyan-400 font-bold">{timeLeft}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
