"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    labels: ["Referrals", "Daily Rewards", "Bonuses"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#06b6d4", "#a855f7", "#f43f5e"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Earnings Breakdown</h2>
      <Doughnut data={data} />
    </div>
  );
}
