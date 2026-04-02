"use client";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions yet.</p>
      ) : (
        <div className="bg-[#111] border border-[#333] rounded-lg p-6 w-full max-w-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-[#333]">
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index} className="border-b border-[#222]">
                  <td className="py-2">{t.type}</td>
                  <td className="py-2 text-cyan-400">{t.amount} USDT</td>
                  <td className="py-2 text-gray-400">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
