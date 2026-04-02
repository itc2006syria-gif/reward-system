"use client";
import { useEffect, useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    const savedAddress = localStorage.getItem("walletAddress");

    if (savedBalance) setBalance(parseFloat(savedBalance));

    if (savedAddress) {
      setWalletAddress(savedAddress);
    } else {
      const newAddress =
        "TR" + Math.random().toString(36).substring(2, 12).toUpperCase();
      setWalletAddress(newAddress);
      localStorage.setItem("walletAddress", newAddress);
    }
  }, []);

  const saveTransaction = (type: string, amount: number) => {
    const tx = {
      type,
      amount,
      date: new Date().toLocaleString(),
    };

    const savedTx = localStorage.getItem("transactions");
    const txList = savedTx ? JSON.parse(savedTx) : [];
    txList.unshift(tx);
    localStorage.setItem("transactions", JSON.stringify(txList));
  };

  const addFunds = () => {
    const newBalance = balance + 1;
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());

    saveTransaction("Manual Add", 1);
  };

  const withdrawFunds = () => {
    if (balance <= 0) return;

    const newBalance = balance - 1;
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());

    saveTransaction("Withdraw", -1);
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Wallet</h1>

      <div className="bg-[#111] border border-[#333] p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">USDT Balance</h2>

        <p className="text-3xl font-bold text-cyan-400 mb-4">{balance} USDT</p>

        <p className="text-gray-300 mb-6">
          Wallet Address:{" "}
          <span className="text-cyan-500">{walletAddress}</span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={addFunds}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-lg transition"
          >
            + Add 1 USDT
          </button>

          <button
            onClick={withdrawFunds}
            className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-lg transition"
          >
            - Withdraw 1 USDT
          </button>
        </div>
      </div>
    </div>
  );
}
